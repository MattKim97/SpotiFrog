# SpotiFrog
A frog-themed music-sharing platform

Welcome to "Spotifrog," where every hop is a musical leap!

This isn't just another tadpole in the pond of music streaming sites; it's a fully-grown, ribbet-rocking platform.

Imagine a world where bullfrogs belt out the blues, and tree frogs trill the top charts.

Our users don't just play music; they leap onto a lily pad of lyrical landscapes.

Uploading songs is as easy as a frog catching flies – simply hop onto the platform, croak out your tunes, and watch as your music ripples across the pond.

With Spotifrog, every artist can have their moment in the swamp-light, whether they're a croaking classicist or a poison dart performer.

So, tune in, turn up the volume, and let the amphibious anthems amphibi-rock your world! 🐸

## Live Url for Spotifrog
https://spotifrog2.onrender.com/

## Database Schema Design

![Alt text](image.png)


## Feature List

### 1. Login/Logout/Demo

* People can sign-up as a user
* People can use a demo log in to try the site.
* People may play and listen to songs without logging in to a user
* People may not create or upload songs without logging in to a user
* People may not create or upload songs to a playlist without logging in to a user
* People may not create or upload songs to an album without logging in to a user
* People many not like songs without logging in to a user
* Users may log-in and log-out
* Users when logging in, redirects to the last visited page if not new, if new redirect to landing page


### 2. Songs

* Users should be able to view all Songs
* Users should be able to upload their Songs
* Users should be able to update their Song's details only
* Users should be able to delete their Songs only

### 3. Likes

* Users are able to like a song
* Users are not able to like a song more than once
* Users are able to unlike a song
* Users are not able to unlike a song that they have not liked
* People and Users are able to see how many likes each song has

### 4. Albums
*  Users are able to create an album
*  Users are only allowed to add songs that they uploaded to their albums
*  Users are not able to add songs to albums that they do not own
*  Users are not able to delete songs from albums that they do not own
*  People and Users should be able to see all albums
*  Users should be able to delete their own albums
*  Users are not able to delete albums that they do not own

### 5. Playlists
* Users are able to create an playlist
* Users are able to update a playlist's details
* Users are not able to add songs to playlist that they do not own
* Users are not able to delete songs from playlist that they do not own
* People should be able to see all playlists
* Users should be able to delete their own playlists
* Users are not able to delete playlists that they do not own

## User Stories

### Sign-up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
* When I'm on the `/signup` page:
* I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
* I would like the website to log me in upon successful completion of the sign-up form.
* So that I can seamlessly access the site's functionality
* When I enter invalid data on the sign-up form:
* I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid e
ntries (except my password).
* So that I can try again without needing to refill forms I entered valid data into.


### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
* When I'm on the `/login` page:
* I would like to be able to enter my email and password on a clearly laid out form.
* I would like the website to log me in upon successful completion of the log-in form.
* So that I can seamlessly access the site's functionality
* When I enter invalid data on the log-in form:
* I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid e
ntries (except my password).
* So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
* When I'm on either the `/signup` or `/login` pages:
* I can click on a Demo User button to log me in and allow me access as a normal user.
* So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
* While on any page of the site:
* I can log out of my account and be redirected to the Spotifrog landing page
* So that I can easily log out to keep my information secure.

### Songs

* As a un-logged in user, I should also be able to view a list of all Songs available on the platform, so I can discover new music
* As a logged in user I want to upload Songs that I created, to share my music with the community
* As a logged in user I want to be able to update the details of the Songs I have created and uploaded (name, lyrics)
* As a logged in user I want the ability to delete the songs that I own, if I no longer wish to have them on the platform

### Likes
* As a logged in user I want to be able to like a song, to show appreciation
* As a logged in user I want to be able to like a song only once in order to maintain fairness
* As a logged in user I want to be able to unlike a song, if I don't like the song anymore, of if I accidently liked the song
* As a logged in user I want to be restricted from unliking a song that I have not previously liked before
* As a logged in user I want to see the total number of likes each song has, inorder to see it's popularity among the users of the site

### Albums
* As a logged in user I want to be able to create an album to organize and showcase a collection of my uploaded songs
* As a logged in user I want to add only the songs I have uploaded to my albums
* As a logged in user I want to be restricted from adding songs to albums that I do not own
* As a logged in user I want to be restricted from deleting songs from albums that I do not own
* As a logged in user I want people to see a list of all albums, including mine , in-order to promote discoverability
* As a logged in user I want to be able to delete my own albums
* As a logged in user I want to be restricted from deleting albums that I do not own

### Playlist
* As a logged in user I want to create a playlist of my favorite songs
* As a logged in user I want to update the details of my playlists when I feel like
* As a logged in user I want to be restricted from adding songs to playlists I do not own
* As a logged in user I want to be restricted from deleting songs from playlists that I do not own
* As a logged in user I want people to see a list of all playlists including mine, in order to share my musical taste
* As a logged in user I want to be able to delete my own playlists
* As a logged in user I want to be restricted from deleting playlists that I do not own
