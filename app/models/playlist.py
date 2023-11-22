from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import date
from .song import playlists_songs


class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlistCover = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.Date, default=date.today())

    user = db.relationship(
        "User",
        back_populates="playlists"
    )

    songs = db.relationship(
        "Song",
        secondary=playlists_songs,
        back_populates="playlist",
    )

    def to_dict(self,scope="default"):
        d = {
            "id": self.id,
            "name": self.name,
            "userId": self.userId,
            "playlistCover": self.playlistCover,
            "description": self.description,
            "createdAt": self.createdAt,
            "owner": self.user.username
        }
        if scope == "songs_details":
            d["songs"] = [song.to_dict() for song in self.songs]
        return d
