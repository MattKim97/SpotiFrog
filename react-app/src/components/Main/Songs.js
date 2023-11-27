import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllSongs } from "../../store/songs";
import SongCard from "../SongCard";

export default function Songs() {
  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));

  useEffect(() => {
    dispatch(thunkGetAllSongs());
  }, [dispatch]);

  if (!songs || songs.length === 0) return null;

  return (
    <div className="ContainerMainStyle">
      <div className="SongsContainerMain">
        <div className="songContainerTitles">
          <h2>Song Name</h2>
          <h2>Uploaded At</h2>
          <h2>Album Name</h2>
        </div>
        {songs.map((song) => (
          <div  className="SongCardMainContainer" key={song.id}>
            <SongCard format="main" song={song} />
          </div>
        ))}
      </div>
    </div>
  );
}
