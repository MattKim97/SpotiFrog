from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    Matt = User(
        username='MattKim', email='MattKim@aa.io', profilePictureUrl="", password='password2')
    Bill = User(
        username='Bill', email='Bill@aa.io',profilePictureUrl="", password='password3')
    Sophia = User(
        username='Sophia', email='Sophia@aa.io', profilePictureUrl="", password='password4')
    TaylorS = User(
        username='Taylor Swift', email='TaylorSwift@aa.io', profilePictureUrl="", password='password5')
    FrogMozart = User(
        username='Froggang A. Mozart', email='FrogMozart@aa.io', profilePictureUrl="", password='password6')
    ToadericHoppin = User(
        username='Toaderic Hoppin', email='ToadericHoppin@aa.io', profilePictureUrl="", password='password7')
    ToadDebussy = User(
        username='Toad Debussy', email='ToadDebussy@aa.io',profilePictureUrl="", password='password8')
    LadyFrogga = User(
        username='Lady Frogga', email='LadyFrogga@aa.io', profilePictureUrl="", password='password9')
    FroggieEllish = User(
        username='Froggie Ellish', email='FroggieEllish@aa.io', profilePictureUrl="", password='password10')
    LilFrog = User(
        username='Lil Frog', email='LilFrog@aa.io', profilePictureUrl="", password='password11')
    SnoopFrogg = User(
        username='Snoop Frogg', email='SnoopFrogg@aa.io', profilePictureUrl="", password='password12')
    JohannesFroghms = User(
        username='Johannes Froghms', email='JohannesFroghms@aa.io', profilePictureUrl="", password='password13')
    RichardWartner = User(
        username='Richard Wartner', email='RichardWartner@aa.io', profilePictureUrl="", password='password14')
    Tschaikroaksy = User(
        username='Tschaikroaksy', email='Tschaikroaksy@aa.io', profilePictureUrl="", password='password15')
    
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
