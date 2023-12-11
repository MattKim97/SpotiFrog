# SpotiFrog
A frog-themed digital music service that gives you access to songs from artists all over the world.

## Technologies Used

<a href="https://github.com"><img src="images/github-mark-white.png" alt="GitHub logo" width="35"></a>
<a href="https://"><img src="images/AWS.png" alt="AWS logo" width="35"></a>
<a href="https://"><img src="images/CSS.png" alt="CSS logo" width="35"></a>
<a href="https://"><img src="images/docker.jpg" alt="Docker logo" width="35"></a>
<a href="https://"><img src="images/flask.png" alt="Flask logo" width="35"></a>
<a href="https://"><img src="images/googleFonts.jpg" alt="Google Fonts logo" width="35"></a>
<a href="https://"><img src="images/HTML5.png" alt="HTML5 logo" width="35"></a>
<a href="https://"><img src="images/JavaScript-logo.png" alt="JavaScript logo" width="35"></a>
<a href="https://"><img src="images/MDN.jpg" alt="Mozilla Developer Network logo" width="35"></a>
<a href="https://"><img src="images/postgresql.jpg" alt="PostGreSQL logo" width="35"></a>
<a href="https://"><img src="images/Python-logo-notext.svg.png" alt="Python logo" width="35"></a>
<a href="https://"><img src="images/React-icon.svg.png" alt="React logo" width="35"></a>
<a href="https://"><img src="images/redux.svg" alt="Redux logo" width="35"></a>
<a href="https://"><img src="images/sql.jpg" alt="SQL logo" width="35"></a>
<a href="https://"><img src="images/SQLAlchemy.svg.png" alt="SQLAlchemy logo" width="35"></a>
<a href="https://"><img src="images/sqlite.jpg" alt="Sqlite logo" width="35"></a>
<a href="https://"><img src="images/Typescript_logo_2020.svg.png" alt="Typescript logo" width="35"></a>
<a href="https://"><img src="images/Visual_Studio_Code_1.35_icon.svg.png" alt="VisualStudio Code logo" width="35"></a>


## Live URL for Spotifrog
https://spotifrog2.onrender.com/

## Screenshot teases

### Landing Page

On the main page, we see the Navigation area in the upper left, the Library area beneath it, the main view showing examples of albums and playlist with cover art in the middle and right.


<img src="images/landingPage.png" alt="Landing Page" style="width:300;"/>

### Interacting with a Song

Here we see a selected Song and a menu allowing you to delete or edit the Song.

<img src="images/songInteraction.png" alt="Landing Page" style="width:300;"/>

### Listening to great Music

Finally, we see a shot of someone enjoying the playback of music that has been uploaded.

<img src="images/playingMp3OnAlbumSongsView.png" alt="Landing Page" style="width:300;"/>

## Wiki

Check out our Wiki for site background, features, stories, DB schema, Redux store layout, APIs, details on tech, and more!

https://github.com/MattKim97/SpotiFrog/wiki


### Front-end

*  React
    - Components:
    - Packages:
*  Redux
*  JavaScript
*  CSS
*  HTML
*  Icons
    - FontAwesome
    - GoogleFonts API (Figtree)

### Back-end

*  Python
*  SQL
*  SQLAlchemy
*  Alembic
*  Sqlite3 (development)
*  PostGreSQL (production)
*  Amazon Web Services (AWS)
*  Flask
*  Packages:
*  Docker

### Tools
* VS Code
* GitHub and Git
* Render for deployment and publishing

## Installation Instructions

### Back-end

* Decide on database / ORM; we used SQLAlchemy/Sqlite-developemtn; flask-sqlalchemy-alembic/PostGreSQL-production and AWS for large files (media/pictures/art)...for these instructions we'll assume you follow in our footsteps!
* Install packages needed, and dependencies on any other packages
    - pipenv -r install requirements.txt
* create a .env file with appropriate environment variable settings (see .env.example for values)
* if you use PostGreSQL, you will need to set a SCHEMA= variable to a snake_cased name for full table qualifying
* set up seed values in app/seeds
* then setup the database, migrate tables, and seed them

### Front-end

* Follow the README in react-app/ !!



## Authors

## Bill Shauck 🐸 <a href="https://github.com/bshauck"><img src="images/github-mark-white.png" alt="GitHub logo" width="20"></a><a href="https://www.linkedin.com/in/william-shauck-153bb0210/"><img src="images/linkedin.webp" alt="LinkedIn logo" width="20"></a>

## Sophia Tsau 🐸 <a href="https://github.com/sophiatsau"><img src="images/github-mark-white.png" alt="GitHub logo" width="20"></a><a href="hhttps://www.linkedin.com/in/sophia-t-5a51637a/"><img src="images/linkedin.webp" alt="LinkedIn logo" width="20"></a>


## Matthew Kim 🐸 <a href="https://github.com/MattKim97"><img src="images/github-mark-white.png" alt="GitHub logo" width="20"></a><a href="https://www.linkedin.com/in/matthew-kim-9ba86a15a/"><img src="images/linkedin.webp" alt="LinkedIn logo" width="20"></a>
