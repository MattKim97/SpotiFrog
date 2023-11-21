from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('userId', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('songId', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

if environment == "production":
    likes.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(255), nullable=False)
    profilePictureUrl = db.Column(db.String(255), nullable=True)
    lastPageUrl = db.Column(db.String(255), nullable=True, default="/")

    albums = db.relationship(
        "Album",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    playlists = db.relationship(
        "Playlist",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    songs = db.relationship(
        "Song",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    songsLiked = db.relationship(
        "Song",
        secondary=likes,
        back_populates="userLikes",
    )

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profilePictureUrl": self.profilePictureUrl,
            "lastPageUrl": self.lastPageUrl,
            "playlists": [playlist.to_dict() for playlist in self.playlists],
            "albums": [album.to_dict() for album in self.albums],
            "songs": [song.to_dict() for song in self.songs],
            "songsLiked": [song.id for song in self.songsLiked]
        }
