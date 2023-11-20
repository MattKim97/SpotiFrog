from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Album, db
from app.forms import AlbumForm, error_message, upload_file_to_s3, get_unique_filename, remove_file_from_s3, error_messages


album_routes = Blueprint('albums', __name__)


@album_routes.route('/')
def get_all_album():
    """
    Query for all albums and returns them in a list of album dictionaries
    """
    albums = Album.query.all()
    return {"albums": [album.to_dict() for album in albums]}


@album_routes.route('/<int:id>')
def get_album(id):
    """
    Query for a album by id and returns that album in a dictionary
    """
    album = Album.query.get(id)
    return album.to_dict(scope="songs_details")


@album_routes.route('/new', methods=["POST"])
@login_required
def create_album():
    """
    Creates a new album and returns the new album in a dictionary
    """
    
    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():

        new_album = {
            "userId": current_user.id,
            "name": form.name.data,
            "releaseDate": form.releaseDate.data,
        }
        if form.albumCover.data:
            image = form.albumCover.data
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 401
            
            new_album["albumCover"] = upload["url"]

        album = Album(**new_album)
        db.session.add(album)
        db.session.commit()
        return album.to_dict(), 201
    elif form.errors:
        return error_messages(form.errors), 401 
    else:
        return error_message("unknown", "An unknown Error has occurred"), 500

@album_routes.route('/<int:albumId>/songs/<int:songId>', methods=["PUT", "PATCH"])
@login_required
def add_song(albumId, songId):
    """
    Adds or removes a song to an album and returns the updated album in a dictionary
    """

    song = [song for song in current_user.songs if song.id == songId]
    if song:
        song = song[0]

        if request.method =="PUT":
            if song.albumId == albumId:
                return error_message("album", "Cannot add song to album again"), 401
            song.albumId = albumId
        else:
            song.albumId = None 
        db.session.add(song)
        db.session.commit()
        return song.to_dict(), 200
    else:
        return error_message("song", "Invalid songId"), 403
        
@album_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_album(id):
    """
    Deletes an album and returns a message if successfully deleted
    """

    album = Album.query.get(id)

    if album.userId != current_user.id:
        return error_message("user", "Authorization Error"), 403
    
    if album.albumCover is not None:
        file_to_delete = remove_file_from_s3(album.albumCover)

        if file_to_delete is True:
            db.session.delete(album)
            db.session.commit()
            return {"message": "Album successfully deleted"}
        else:
            return error_message("file", "File deletion error"), 401
    else:
        db.session.delete(album)
        db.session.commit()
        return {"message": "Album successfully deleted"}
