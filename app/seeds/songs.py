from app.models import db, Playlist, Song, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from random import choices, randint


# Adds a demo user, you can add other users here if you want
def seed_songs():
    demo1 = Song(
        userId=5,
        albumId=2,
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Sade+-+Your+Love+Is+King+-+Official+-+1984.mp3",
        name="Your Frog is King",
        playtimeLength=219,
        albumTrackNumber=1,
        )
    demo2 = Song(
        userId=5,
        albumId=2,
        name="Hang On to Your Lily Pad",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Sade+-+Hang+On+To+Your+Love+-+Official+-+1984+(320+kbps).mp3",
        playtimeLength=270,
        albumTrackNumber=2,
        )
    demo3 = Song(
        userId=5,
        albumId=2,
        name="Smooth Frogerator",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Sade+-+Smooth+Operator+-+Official+-+1984+(128+kbps).mp3",
        playtimeLength=258,
        albumTrackNumber=3,
        )
    demo4 = Song(
        userId=5,
        albumId=2,
        name="Jezetoad",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Sade+-+Jezebel+(Audio)+(64+kbps).mp3",
        playtimeLength=329,
        albumTrackNumber=4,
        )
    demo5 = Song(
        userId=5,
        albumId=2,
        name="The Sweetest Tadpole",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Sade+-+The+Sweetest+Taboo+-+Official+-+1985+(128+kbps).mp3",
        playtimeLength=276,
        albumTrackNumber=5,
        )
    demo6= Song(
        userId=1,
        albumId=1,
        name="RedFrog",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Redbone+(128+kbps).mp3",
        playtimeLength=276,
        albumTrackNumber=1,
        )
    demo7 = Song(
        userId=1,
        albumId=1,
        name="Lot of Frogs to learn",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Luke+Christopher+-+Lot+to+Learn+(128+kbps).mp3",
        playtimeLength=276,
        albumTrackNumber=2,
        )
    demo8 = Song(
        userId=6,
        albumId=4,
        name="Glass Frogs",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Glass+Animals+-+Heat+Waves+(Official+Video)+(128+kbps).mp3",
        playtimeLength=276,
        albumTrackNumber=1,
        )
    demo9 = Song(
        userId=6,
        albumId=5,
        name="Froggie Relax",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Headphone+Activist+-+Haiku+(128+kbps).mp3",
        playtimeLength=276,
        albumTrackNumber=1,
        )
    demo10 = Song(
        userId=1,
        albumId=6,
        name="Froggie Lake",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Headphone+Activist+-+Ocean+Floors+(128+kbps).mp3",
        playtimeLength=276,
        albumTrackNumber=1,
        )

    demo11 = Song(
        userId=4,
        albumId=3,
        name="Is It a Cockroach?",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/La+Cucaracha+(The+Dancing+Cockroach+Video)+by+DARIA+(128+kbps).mp3",
        playtimeLength=377,
        albumTrackNumber=1,
        )
    demo12 = Song(
        userId=4,
        albumId=3,
        name="Never as Good as the First Leap",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Five+Little+Speckled+Frogs+featuring+The+Super+Simple+Puppets+_+Kids+Songs+_+Super+Simple+Songs+(128+kbps).mp3",
        playtimeLength=239,
        albumTrackNumber=2,
        )
    demo13 = Song(
        userId=4,
        albumId=3,
        name="Frog Is Stronger Than Pride",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Crazy+Frog+-+Axel+F+(Official+Video)+(128+kbps).mp3",
        playtimeLength=258,
        albumTrackNumber=3,
        )
    demo14 = Song(
        userId=4,
        albumId=3,
        name="Frogadise",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/froggy-walky-125262.mp3",
        playtimeLength=217,
        albumTrackNumber=4,
        )
    demo15 = Song(
        userId=4,
        albumId=3,
        name="No Flies Can Come Between Frogs",
        mp3="https://spotifrogmp3.s3.us-west-1.amazonaws.com/Crazy+Frog+-+Popcorn+(Official+Video)+(128+kbps).mp3",
        playtimeLength=233,
        albumTrackNumber=5,
        )

    users = User.query.all()

    playlists = Playlist.query.all()

    songs = [demo1, demo2, demo3, demo4, demo5, demo6,demo7,demo8,demo9,demo10,demo11, demo12, demo13, demo14, demo15]

    for playlist in playlists:
        songsToAdd = list(set(choices(songs, k=randint(2,8))))
        for song in songsToAdd:
            playlist.songs.append(song)

    for song in songs:
        usersToAdd = list(set(choices(users, k=randint(5,17))))
        for user in usersToAdd:
            song.userLikes.append(user)

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
        db.session.execute(f'TRUNCATE table {SCHEMA}.playlists_songs RESTART IDENTITY CASCADE;')
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists_songs"))
        db.session.execute(text("DELETE FROM likes"))
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
