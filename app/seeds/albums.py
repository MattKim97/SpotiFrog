from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, datetime


# Adds a demo user, you can add other users here if you want
def seed_albums():
    demo1 = Album(
        name="Froggy Demo",
        userId=1,
        albumCover="https://spotifrogmp3.s3.us-west-1.amazonaws.com/chill.jpg",
        releaseDate=date.today(),
        )
    demo2 = Album(
        name="The Best Of Sade",
        userId=5,
        albumCover="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Sade.jpg",
        releaseDate=date(1994,10,31),
        )
    demo3 = Album(
        name="Tha Froggfather",
        userId=4,
        albumCover="https://spotifrogmp3.s3.us-west-1.amazonaws.com/the+FROG+father.jpg",
        releaseDate=date(2018,1,26),
        )
    demo4 = Album(
        name="When We Fall Asleep, Where Do Frogs Go?",
        userId=6,
        albumCover="https://spotifrogmp3.s3.us-west-1.amazonaws.com/sleeping+frog.jpg",
        releaseDate=date(2015,12,31),
        )
    demo5 = Album(
        name="Meditation time for Frogs",
        userId=6,
        albumCover="https://spotifrogmp3.s3.us-west-1.amazonaws.com/meditating+frog.jpg",
        releaseDate=date(2014,1,13),
        )
    demo6 = Album(
        name="Frog Pond",
        userId=6,
        albumCover="https://spotifrogmp3.s3.us-west-1.amazonaws.com/frog+pond.jpg",
        releaseDate=date(2013,2,22),
        )

    albums = [demo1, demo2, demo3, demo4, demo5, demo6]
    db.session.add_all(albums)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the albums table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
