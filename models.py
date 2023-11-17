
likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('userId', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('songId', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
)


class Album(db.Model):
    __tablename__ = 'albums'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    albumCover = db.Column(db.String(255))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    releaseDate = db.Column(db.Date, nullable=False)

    user = db.relationship(
        'User',
        back_populates='albums'
        )
    
    songs = db.relationship(
        "Song",
        back_populates="album",
    )

playlistsSongs = db.Table(
    'playlistsSongs',
    db.Model.metadata,
    db.Column('playlistId', db.Integer, db.ForeignKey('playlists.id'), primary_key=True),
    db.Column('songId', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
)


class Song(db.Model):
    __tablename__ = 'songs'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    albumId = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=True)
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

class Playlist(db.model):
    __tablename__ = 'playlists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    playlistCover = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship(
        "User",
        back_populates="playlists"
    )
