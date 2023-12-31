from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    albumCover = db.Column(db.String(255))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    releaseDate = db.Column(db.Date, nullable=False)

    user = db.relationship(
        'User',
        back_populates='albums'
        )

    songs = db.relationship(
        "Song",
        back_populates="album",
    )

    def to_dict(self,scope="default"):
        d =  {
                    "id": self.id,
                    "name": self.name,
                    "albumCover": self.albumCover,
                    "userId": self.userId,
                    "artist": self.user.username,
                    "releaseDate": self.releaseDate,
                    "songs": [song.id for song in self.songs]
                }

        return d
