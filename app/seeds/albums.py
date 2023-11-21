from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, datetime


# Adds a demo user, you can add other users here if you want
def seed_albums():
    demo1 = Album(
        name="Demo",
        userId=1,
        releaseDate=date.today(),
        )
    demo2 = Album(
        name="The Best Of Sade",
        userId=5,
        releaseDate=date(1994,10,31),
        )
    demo3 = Album(
        name="Tha Froggfather",
        userId=4,
        releaseDate=date(2018,1,26),
        )
    demo4 = Album(
        name="When We Fall Asleep, Where Do Frogs Go?",
        userId=6,
        releaseDate=date(2016,12,31),
        )
    demo5 = Album(
        name="Meditation time for Frogs",
        userId=6,
        releaseDate=date(2016,12,31),
        )
    demo6 = Album(
        name="Frog Pond",
        userId=6,
        releaseDate=date(2016,12,31),
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
