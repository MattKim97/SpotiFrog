from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import SongForm, UpdateSongForm, validation_errors_to_error_messages, upload_file_to_s3, analyzePlayTime, get_unique_filename, remove_file_from_s3
from app.models import db, Song, Album

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def get_all_songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return {"songs": [song.to_dict() for song in songs]}

@song_routes.route('/<int:id>')
def get_song(id):
    """
    Query for a song by id and returns that song in a dictionary
    """
    song = Song.query.get(id)
    return song.to_dict(scope="detailed")


@song_routes.route('/new', methods=['POST'])
@login_required
def create_song():
    """
    Creates a new song and returns the new song in a dictionary
    """

    form = SongForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    mp3_data = request.files['mp3'].read()


    if form.validate_on_submit():
        mp3 = form.mp3.data
        mp3.filename = get_unique_filename(mp3.filename)
        upload = upload_file_to_s3(mp3)

        if "url" not in upload:
            return upload, 401

        new_song = {
            "userId": current_user.id,
            "albumId": form.albumId.data,
            "name": form.name.data,
            "mp3": upload["url"],
            "lyrics": form.lyrics.data,
        }
        new_song["playtimeLength"] = analyzePlayTime(mp3_data)
        if new_song["albumId"]:
            album = Album.query.get(new_song["albumId"])
            new_song["albumTrackNumber"] = len(album.songs) + 1

        song = Song(**new_song)
        db.session.add(song)
        db.session.commit()
        return song.to_dict(), 201
    elif form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401
    else:
        return {"errors": "Unknown error occurred"}, 500

@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_song(id):

    """
    Updates a song and returns the updated song in a dictionary
    """

    song = Song.query.get(id)

    if song.userId != current_user.id:
        return {"errors": "Authorization Error"}, 403

    form = UpdateSongForm()
    album_ids = [album.id for album in current_user.albums]

    if form.albumId.data is not None and form.albumId.data not in album_ids:
        return {"errors": ["Invalid Album"]}, 401

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        song.name = form.name.data
        song.albumId = form.albumId.data
        song.lyrics = form.lyrics.data
        db.session.commit()
        return song.to_dict(), 201
    elif form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401
    else:
        return {"errors": "Unknown error occurred"}, 500

@song_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    """
    Deletes a song and returns the id of the deleted song
    """
    song = Song.query.get(id)

    if song.userId != current_user.id:
        return {"errors": "Authorization Error"}, 403

    file_to_delete = remove_file_from_s3(song.mp3)

    if file_to_delete is True:
        db.session.delete(song)
        db.session.commit()
        return {"message": "Song successfully deleted"}
    else:
        return "<h1> File deletion error!<h1>", 401


@song_routes.route('/<int:songId>/likes', methods=["POST"])
@login_required
def like_song(songId):
    """
    Likes a song, creating relationship between user and song
    """
    song = Song.query.get(songId)

    if song is None:
        return {"errors": "Song not found"}, 404
    elif song in current_user.songLikes:
        return {"errors": "Cannot like a song that is already liked"}, 401
    else:
        current_user.songLikes.append(song)
        db.session.commit()
        return {"message": "Song successfully liked"}, 201


@song_routes.route('/<int:songId>/likes', methods=["DELETE"])
@login_required
def unlike_song(songId):
    """
    Unlikes a song, removing relationship between user and song
    """
    song = Song.query.get(songId)
    print("******************SONG*************", song)

    if song is None:
        return {"errors": "Song not found"}, 404
    elif song in current_user.songLikes:
        current_user.songLikes.remove(song)
        db.session.commit()
        return {"message": "Song successfully unliked"}, 200
    else:
        return {"errors": "Cannot unlike this song"}, 401
