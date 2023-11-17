from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user import likes

playlistsSongs = db.Table(
    'playlistsSongs',
    db.Model.metadata,
    db.Column('playlistId', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column('songId', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

if environment == "production":
    playlistsSongs.schema = SCHEMA

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    mp3 = db.Column(db.String(255), nullable=False)
    uploadedAt = db.Column(db.DateTime, default=datetime.utcnow)
    playtimeLength = db.Column(db.Integer, nullable=False)
    albumTrackNumber = db.Column(db.Integer, nullable=True)
    lyrics = db.Column(db.Text, nullable=True)

    user = db.relationship(
        'User',
        back_populates='songs'
    )

    album = db.relationship(
        'Album',
        back_populates='songs'
    )

    userLike = db.relationship(
        "User",
        secondary=likes,
        back_populates="songLikes"
    )

    playlist = db.relationship(
        "Playlist",
        secondary=playlistsSongs,
        back_populates="songs"
    )
