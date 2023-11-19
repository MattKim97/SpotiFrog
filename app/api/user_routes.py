from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    print("OUR CURRENT USER",current_user)
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/albums')
@login_required
def user_albums(id):
    """
    Query for a user's albums by id and returns that user's albums in a dictionary
    """
    if current_user.id != id:
        return {"errors": ["Unauthorized"]}, 401
    user = User.query.get(id)
    albums = [album.to_dict() for album in user.albums]
    return {
        "albums": albums,
    }

@user_routes.route('/<int:id>/playlists')
@login_required
def user_playlists(id):
    """
    Query for a user's playlists by id and returns that user's playlists in a dictionary
    """
    if current_user.id != id:
        return {"errors": ["Unauthorized"]}, 401
    user = User.query.get(id)
    playlists = [playlist.to_dict() for playlist in user.playlists]
    return {
        "playlists": playlists,
    }

@user_routes.route("/<int:id>/songs")
@login_required
def user_songs(id):
    """
    Query for a user's songs by id and returns that user's songs in a dictionary
    """
    if current_user.id != id:
        return {"errors": ["Unauthorized"]}, 401
    user = User.query.get(id)
    songs = [song.to_dict() for song in user.songs]
    return {
        "songs": songs,
    }
