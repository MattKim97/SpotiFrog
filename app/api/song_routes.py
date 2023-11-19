from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import SongForm, validation_errors_to_error_messages, upload_file_to_s3, analyzePlayTime, get_unique_filename
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
