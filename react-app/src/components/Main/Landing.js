import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllAlbums } from "../../store/albums";
import { thunkGetAllPlaylists } from "../../store/playlists";
import AlbumCard from "../AlbumCard";
import PlaylistCard from "../PlaylistCard";
export default function Landing() {
  const dispatch = useDispatch();
  const albums = Object.values(useSelector((state) => state.albums));
  const playlists = Object.values(useSelector((state) => state.playlists));

  useEffect(() => {
    dispatch(thunkGetAllAlbums());
    dispatch(thunkGetAllPlaylists());
  }, [dispatch]);

  if (!albums || albums.length === 0 || !playlists || playlists.length < 4)
    return null;

  function randominator(arr) {
    const result = [];
    const copy = arr.slice();

    while (result.length < 4) {
      let index = Math.floor(Math.random() * copy.length);
      result.push(copy[index]);
      copy.splice(index, 1);
    }
    return result;
  }

  const randomAlbums = randominator(albums);
  const randomPlaylists = randominator(playlists);

  return (
    <div>
      <div>
        <h2>Discover a New Froggy Albums today!</h2>
        {randomAlbums.map((album) => (
          <div key={album.id}>
            <AlbumCard format="main" album={album} />
          </div>
        ))}
        <a href="/albums">See all albums</a>
      </div>
      <div>
        <h2>Discover our carefully curated croaktastic playlists!</h2>
        {randomPlaylists.map((playlist) => (
          <div key={playlist.id}>
            <PlaylistCard format="main" playlist={playlist} />
          </div>
        ))}
        <a href="/playlists">See all playlists</a>
      </div>
    </div>
  );
}
