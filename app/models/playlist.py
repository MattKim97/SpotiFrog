from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .song import playlistsSongs 


class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlistCover = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship(
        "User",
        back_populates="playlists"
    )

    songs = db.relationship(
        "Song",
        secondary=playlistsSongs,
        back_populates="playlist"
    )
