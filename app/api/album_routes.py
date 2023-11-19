from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Album, db
from app.forms import AlbumForm, validation_errors_to_error_messages, upload_file_to_s3, get_unique_filename


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

        image = form.albumCover.data
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 401
        
        new_album = {
            "userId": current_user.id,
            "name": form.name.data,
            "albumCover": upload["url"],
            "releaseDate": form.releaseDate.data,
        }

        album = Album(**new_album)
        db.session.add(album)
        db.session.commit()
        return album.to_dict(), 201
    elif form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401 
    else:
        return {"errors": "Unknown error occurred"}, 500

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
                return {"errors": "Cannot add song to album again"}, 401
            song.albumId = albumId
        else:
            song.albumId = None 
        db.session.add(song)
        db.session.commit()
        return song.to_dict(), 200
    else:
        return {"errors": "Invalid songId"}, 403
