from app.models import db, Song, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_songs():
    demo1 = Song(
        userId=5,
        albumId=2,
        name="Your Frog is King",
        mp3="",
        playtimeLength=219,
        albumTrackNumber=1,
        )
    demo2 = Song(
        userId=5,
        albumId=2,
        name="Hang On to Your Lily Pad",
        mp3="",
        playtimeLength=270,
        albumTrackNumber=2,
        )
    demo3 = Song(
        userId=5,
        albumId=2,
        name="Smooth Frogerator",
        mp3="",
        playtimeLength=258,
        albumTrackNumber=3,
        )
    demo4 = Song(
        userId=5,
        albumId=2,
        name="Jezetoad",
        mp3="",
        playtimeLength=329,
        albumTrackNumber=4,
        )
    demo5 = Song(
        userId=5,
        albumId=2,
        name="The Sweetest Tadpole",
        mp3="",
        playtimeLength=276,
        albumTrackNumber=5,
        )

    demo11 = Song(
        userId=1,
        albumId=1,
        name="Is It a Cockroach?",
        mp3="",
        playtimeLength=377,
        albumTrackNumber=1,
        )
    demo12 = Song(
        userId=1,
        albumId=1,
        name="Never as Good as the First Leap",
        mp3="",
        playtimeLength=239,
        albumTrackNumber=2,
        )
    demo13 = Song(
        userId=1,
        albumId=1,
        name="Frog Is Stronger Than Pride",
        mp3="",
        playtimeLength=258,
        albumTrackNumber=3,
        )
    demo14 = Song(
        userId=1,
        albumId=1,
        name="Frogadise",
        mp3="",
        playtimeLength=217,
        albumTrackNumber=4,
        )
    demo15 = Song(
        userId=1,
        albumId=1,
        name="No Flies Can Come Between Frogs",
        mp3="",
        playtimeLength=233,
        albumTrackNumber=5,
        )

    users = User.query.all()

    _ = [demo1.userLikes.append(user) for user in users]

    songs = [demo1, demo2, demo3, demo4, demo5, demo11, demo12, demo13, demo14, demo15]

    _ = [demo2.userLikes.append(user) for user in users if user.id%2==0]

    db.session.add_all(songs)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
