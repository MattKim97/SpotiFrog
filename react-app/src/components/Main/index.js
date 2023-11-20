import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import Albums from "./Albums";
import Playlists from "./Playlists";
import Songs from "./Songs";
import Landing from "./Landing";

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
            <Route>
                404 Page Not Found
            </Route>
        </Switch>
    )
}
