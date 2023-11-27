import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { thunkCreatePlaylist } from '../../store/playlists';
import {addUserPlaylist} from '../../store/session'

export default function PlaylistForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
      name: "",
      playlistCover: null,
      description: "",
    });

    const handleInputChange = (e) => {
      const { name, value, type, files } = e.target;

      setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData };

        if (type === "file") {
          updatedFormData[name] = files[0];
        } else {
          updatedFormData[name] = value;
        }


        return updatedFormData;
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("playlistCover", formData.playlistCover);
      formDataToSend.append("description", formData.description);


      const response = await dispatch(thunkCreatePlaylist(formDataToSend));

      if (!response.errors) {
        await dispatch(addUserPlaylist(response.id))
        history.push(`/playlists/${response.id}`);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, ...response.errors }));
      }
    };


    return (
      <div className='formsContainer'>
    
      <form  className="formsStyle" onSubmit={handleSubmit}>
      <h2>Create a Playlist!</h2>
        <label>
          Playlist Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div style={{color:"red"}}>{errors.name}</div>}
        </label>

        <br />

        <label>
          Playlist Cover(optional):
          <input type="file" name="playlistCover" onChange={handleInputChange} />
          {errors.playlistCover && <div style={{color:"red"}} >{errors.playlistCover}</div>}
        </label>

        <br />

        <label>
          Description:
          <textarea
          type='text'
            name="description"
            className='playlistDescription'
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <div style={{color:"red"}} >{errors.description}</div>}
        </label>

        <br />

        <button className='formsSubmit' type="submit">Submit</button>
      </form>
      </div>
    );
}
