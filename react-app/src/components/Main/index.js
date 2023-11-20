import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

export default function Main() {
    return (
        <Switch>
            <Route exact path="/">
                Landing
            </Route>
            <Route>
                404 Page Not Found
            </Route>
        </Switch>
    )
}
