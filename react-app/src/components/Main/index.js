import { Route, Switch } from "react-router-dom";
import About from "./About";
import Albums from "./Albums";
import Playlists from "./Playlists";
import Songs from "./Songs";
import Landing from "./Landing";
import Search from "./Search";
import PlayListDetails from "./PlayListDetails";
import AlbumDetails from "./AlbumDetails";
import SongDetails from "./SongDetails";
import AddRemoveSongForm from "../AddRemoveSongForm";
import SongForm from "./SongForm";
import SongUpdateForm from "./SongUpdateForm";
import AlbumForm from "./AlbumForm";
import PlaylistForm from "./PlaylistForm";
import PlaylistUpdateForm from "./PlaylistUpdateForm";
import LikedSongs from "./LikedSongs";


export default function Main() {
    return (
        <Switch>
            <Route exact path="/">
                <Landing/>
            </Route>
            <Route exact path="/about">
                <About/>
            </Route>
            <Route exact path="/playlists">
                <Playlists/>
            </Route>
            <Route exact path="/songs">
            <Songs/>
            </Route>
            <Route exact path="/albums">
                <Albums/>
            </Route>
            <Route exact path="/songs/new">
                <SongForm/>
            </Route>
            <Route exact path="/albums/new">
                <AlbumForm/>
            </Route>
            <Route exact path="/playlists/new">
                <PlaylistForm/>
            </Route>
            <Route exact path="/search">
                <Search/>
            </Route>
            <Route exact path="/playlists/:playlistId/edit">
                <PlaylistUpdateForm/>
            </Route>
            <Route exact path="/playlists/:playlistId">
                <PlayListDetails/>
            </Route>
            <Route exact path="/albums/:albumId">
                <AlbumDetails/>
            </Route>
            <Route exact path="/songs/liked">
                <LikedSongs />
            </Route>
            <Route exact path="/songs/:songId/edit">
                <SongUpdateForm/>
            </Route>
            <Route exact path="/songs/:songId">
                <SongDetails />
            </Route>
            <Route exact path="/albums/:albumId/change-songs">
                <AddRemoveSongForm />
            </Route>
            <Route>
                404 Page Not Found
            </Route>
        </Switch>
    )
}
