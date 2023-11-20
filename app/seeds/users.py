from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', profilePictureUrl="", password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', profilePictureUrl="", password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', profilePictureUrl="", password='password')
    Matt = User(
        username='MattKim', email='MattKim@aa.io', profilePictureUrl="", password='password')
    Bill = User(
        username='Bill Shauck', email='bill@aa.io',profilePictureUrl="", password='password')
    Sophia = User(
        username='Sophia', email='Sophia@aa.io', profilePictureUrl="", password='password')
    TaylorS = User(
        username='Taylor Swift', email='TaylorSwift@aa.io', profilePictureUrl="", password='password')
    FrogMozart = User(
        username='Froggang A. Mozart', email='FrogMozart@aa.io', profilePictureUrl="", password='password')
    ToadericHoppin = User(
        username='Toaderic Hoppin', email='ToadericHoppin@aa.io', profilePictureUrl="", password='password')
    ToadDebussy = User(
        username='Toad Debussy', email='ToadDebussy@aa.io',profilePictureUrl="", password='password')
    LadyFrogga = User(
        username='Lady Frogga', email='LadyFrogga@aa.io', profilePictureUrl="", password='password')
    FroggieEllish = User(
        username='Froggie Ellish', email='FroggieEllish@aa.io', profilePictureUrl="", password='password')
    LilFrog = User(
        username='Lil Frog', email='LilFrog@aa.io', profilePictureUrl="", password='password')
    SnoopFrogg = User(
        username='Snoop Frogg', email='SnoopFrogg@aa.io', profilePictureUrl="", password='password')
    JohannesFroghms = User(
        username='Johannes Froghms', email='JohannesFroghms@aa.io', profilePictureUrl="", password='password')
    RichardWartner = User(
        username='Richard Wartner', email='RichardWartner@aa.io', profilePictureUrl="", password='passwords')
    Tschaikroaksy = User(
        username='Tschaikroaksky', email='tschaikroaksky@aa.io', profilePictureUrl="", password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    users = [Matt, Bill, Sophia, TaylorS, FrogMozart, ToadericHoppin, ToadDebussy, LadyFrogga, FroggieEllish, LilFrog, SnoopFrogg, JohannesFroghms, RichardWartner, Tschaikroaksy]
    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
