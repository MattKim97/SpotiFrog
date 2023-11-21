import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllPlaylists } from "../../store/playlists";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import LikeSong from "../SongCard/LikeSong";

export default function PlayListDetails() {
  const dispatch = useDispatch();
  const allPlaylists = Object.values(useSelector((state) => state.playlists));
  const { playlistId } = useParams();

  useEffect(() => {
    dispatch(thunkGetAllPlaylists());
  }, [dispatch]);

  if (!allPlaylists) return null;

  const playlist = allPlaylists[playlistId - 1];

  if (!playlist) return null;

  return (
    <div>
      <div>
        <div>
          <img
            src={
              playlist.playlistCover
                ? playlist.playlistCover
                : "https://static.thenounproject.com/png/4974686-200.png"
            }
            alt={playlist.name}
          />
        </div>
        <div>{playlist.name}</div>
        <div>{playlist.description}</div>
        <div>{playlist.createdAt}</div>
        <div>Owned by: {playlist.owner} </div>
      </div>
      <div>   {playlist.songs.map((song) => (
            <div>
            <div>{song.name}</div>
            <div>{song.artist}</div>
            <LikeSong songId={song.id} liked={song.liked}/>
            <div>{song.albumName}</div>
            <div>{song.userLikes}</div>
            <div>{Math.floor(song.playtimeLength/60)}:{song.playtimeLength%60}</div>
            </div>

        ))}</div>
    </div>
  );
}
