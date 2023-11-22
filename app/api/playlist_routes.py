from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Playlist, db, Song
from app.forms import PlayListForm, upload_file_to_s3,get_unique_filename, remove_file_from_s3, error_message, error_messages

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
def get_all_playlist():
    playlists = Playlist.query.all()
    return {"playlists": [playlist.to_dict(scope="songs_details") for playlist in playlists]}

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

        new_playlist = {
            "userId": current_user.id,
            "name": form.name.data,
            "description": form.description.data,
        }

        if form.playlistCover.data:

            image = form.playlistCover.data
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 401

            new_playlist["playlistCover"] = upload["url"]

        playlist = Playlist(**new_playlist)
        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict(), 201
    elif form.errors:
        return error_messages(form.errors), 401
    else:
        return error_message("unknown","Unknown error occurred"),500


"""NOT FULLY IMPLEMENTED ROUTE"""
@playlist_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_playlist(id):
    """
    Updates a playlist and returns the updated playlist in a dictionary
    """
    playlist = Playlist.query.get(id) # TODO just get from current_user

    form = PlayListForm()

    if playlist.userId != current_user.id:
        return error_message("user", "Authorization Error"), 403

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        if form.playlistCover.data:
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
        return error_messages(form.errors), 401
    else:
        return error_message("unknown","Unknown error occurred"),500

@playlist_routes.route('/<int:playlistId>/songs/<int:songId>', methods=["PUT", "PATCH"]) # change PATCH to DELETE?
@login_required
def add_song(playlistId, songId):
    """
    Adds or removes a song to an playlist and returns the updated playlist in a dictionary
    """

    song = Song.query.get(songId) # these two db hits can also just be gotten from current_user
    playlist = Playlist.query.get(playlistId)

    if song:
        if request.method =="PUT":
            if playlist in song.playlist:
                return error_message("song","Cannot add song to playlist again"), 401
            song.playlist.append(playlist)
        else:
            if playlist in song.playlist:
                song.playlist.remove(playlist)
            else:
                return error_message("song", "Song does not exist in playlist"), 403
        db.session.add(song)
        db.session.commit()
        return playlist.to_dict(scope="songs_details"), 200
    else:
        return error_message("song", "Invalid songId"), 403


@playlist_routes.route('/<int:playlistId>/', methods=["DELETE"])
@login_required
def delete_playlist(playlistId):
    """
    Deletes a playlist and returns the deleted playlist in a dictionary
    """
    playlist = Playlist.query.get(playlistId) # TODO just get from current_user

    if playlist.userId != current_user.id:
        return error_message("user", "Authorization Error"), 403


    if playlist.playlistCover is not None:
        file_to_delete = remove_file_from_s3(playlist.playlistCover)

        if file_to_delete is True:
            db.session.delete(playlist)
            db.session.commit()
            return {"message": "Playlist successfully deleted"}

        else:
            return error_message("file","File deletion error"), 401
    else:
        db.session.delete(playlist)
        db.session.commit()
        return {"message": "Playlist successfully deleted"}
