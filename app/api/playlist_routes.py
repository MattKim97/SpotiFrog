from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Playlist, db
from app.forms import PlayListForm, validation_errors_to_error_messages, upload_file_to_s3,get_unique_filename, remove_file_from_s3

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
def get_all_playlist():
    playlists = Playlist.query.all()
    return {"playlists": [playlist.to_dict() for playlist in playlists]}

@playlist_routes.route('/<int:id>')
def get_playlist(id):
    playlist = Playlist.query.get(id)
    return playlist.to_dict(scope="songs_details")

@playlist_routes.route('/new', methods=["POST"])
@login_required
def create_playlist():
    
    """
    Creates a new playlist and returns the new playlist in a dictionary
    """

    form = PlayListForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.playlistCover.data
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 401
    
        new_playlist = {
            "userId": current_user.id,
            "name": form.name.data,
            "playlistCover": upload["url"],
            "description": form.description.data,
        }
        playlist = Playlist(**new_playlist)
        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict(), 201
    elif form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401 
    else:
        return {"errors": "Unknown error occurred"}, 500
    

"""NOT FULLY IMPLEMENTED ROUTE"""
@playlist_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_playlist(id):
    """
    Updates a playlist and returns the updated playlist in a dictionary
    """
    playlist = Playlist.query.get(id)
    
    form = PlayListForm()

    if playlist.userId != current_user.id:
        return {"errors": "Authorization Error"}, 403

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        if form.playlistCover.data=="delete.jpg":
            if playlist.playlistCover:
                remove_file_from_s3(playlist.playlistCover)
            playlist.playlistCover = None

        elif form.playlistCover.data:
            image = form.playlistCover.data
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 401

            remove_file_from_s3(playlist.playlistCover)
            playlist.playlistCover = upload["url"]

        playlist.name = form.name.data
        playlist.description = form.description.data
        db.session.commit()
        return playlist.to_dict(), 201
    elif form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401 
    else:
        return {"errors": "Unknown error occurred"}, 500
