# seeds/playlists.py

from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from random import choices, randint


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    demo1 = Playlist(
        name="DemoPlaylist",
        playlistCover = "https://spotifrogmp3.s3.us-west-1.amazonaws.com/istockphoto-1334993248-612x612.jpg",
        userId=1,
        description="Chill playlist for when I want to eat flies"
        )
    demo2 = Playlist(
        name="Bill's Playlist",
        playlistCover ="https://spotifrogmp3.s3.us-west-1.amazonaws.com/bill.jpg",
        userId=5,
        description="Happy playlist for when I want to ribbit",
        )
    demo3 = Playlist(
        name="Matt's Playlist",
        playlistCover ="https://spotifrogmp3.s3.us-west-1.amazonaws.com/matt.png",
        userId=4,
        description="Energizing playlist for when I want to hop",
        )
    demo4 = Playlist(
        name="Sophia's Playlist",
        playlistCover ="https://spotifrogmp3.s3.us-west-1.amazonaws.com/download.png",
        userId=6,
        description="Cute music for tadpoles",
        )
    demo5 = Playlist(
        name="Sophia's Other Playlist",
        userId=6,
        playlistCover ="https://spotifrogmp3.s3.us-west-1.amazonaws.com/meat.png",
        description="Uplifting playlist for when I want to croak"
        )
    demo6 = Playlist(
        name="Matt's Other Playlist",
        userId=4,
        playlistCover ="https://spotifrogmp3.s3.us-west-1.amazonaws.com/%E6%80%92%E8%9B%99_Angry_Frog_-_panoramio.jpg",
        description="Angery playlist"
        )

    playlists = [demo1, demo2, demo3, demo4, demo5, demo6]


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
