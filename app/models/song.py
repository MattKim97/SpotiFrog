# models/song.py

from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, current_user
from datetime import date
from .user import likes

playlists_songs = db.Table(
    'playlists_songs',
    db.Model.metadata,
    db.Column('playlistId', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column('songId', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

if environment == "production":
    playlists_songs.schema = SCHEMA

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    mp3 = db.Column(db.String(255), nullable=False)
    uploadedAt = db.Column(db.Date, default=date.today(), nullable=False)
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

    userLikes = db.relationship(
        "User",
        secondary=likes,
        back_populates="songsLiked",
        )

    playlist = db.relationship(
        "Playlist",
        secondary=playlists_songs,
        back_populates="songs",
    )

    def playlist_ids(self):
        return [list.id for list in self.playlist]

    def to_dict(self,scope="default"):
        d = {
            "id": self.id,
            "userId": self.userId,
            "albumId": self.albumId,
            "albumName": self.album.name if self.album else "Solo Single",
            "name": self.name,
            "mp3": self.mp3,
            "uploadedAt": self.uploadedAt,
            "playtimeLength": self.playtimeLength,
            "albumTrackNumber": self.albumTrackNumber,
            "lyrics": self.lyrics,
            "userLikes" : len(self.userLikes),
            "artist": self.user.username,
        }

        if hasattr(current_user, "id"):
            d.update({"liked": self in current_user.songsLiked})
            d.update({"playlistIds": [playlist.id for playlist in self.playlist]})

        if scope == "detailed":
            # d["user"] = self.user.to_dict()
            if self.album:
                d["album"] = self.album.to_dict()
        return d
