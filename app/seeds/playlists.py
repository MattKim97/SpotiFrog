# seeds/playlists.py

from app.models import db, Playlist, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    demo1 = Playlist(
        name="DemoPlaylist",
        userId=1,
        playlistCover="",
        description="Chill playlist for when I want to eat flies"
        )
    demo2 = Playlist(
        name="Bill's Playlist",
        userId=5,
        playlistCover="",
        description="Happy playlist for when I want to ribbit",
        )
    demo3 = Playlist(
        name="Matt's Playlist",
        userId=4,
        playlistCover="",
        description="Energizing playlist for when I want to hop",
        )
    demo4 = Playlist(
        name="Sophia's Playlist",
        userId=6,
        playlistCover="",
        description="Cute music for tadpoles",
        )
    demo5 = Playlist(
        name="Sophia's Other Playlist",
        userId=6,
        playlistCover="",
        description="Uplifting playlist for when I want to croak"
        )

    songs = Song.query.all()

    # _ = [demo1.]

    playlists = [demo1, demo2, demo3, demo4, demo5]
    db.session.add_all(playlists)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the playlists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
