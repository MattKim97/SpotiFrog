import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { thunkCreatePlaylist } from '../../store/playlists';

export default function PlaylistForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
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
        history.push(`/playlists/${response.id}`);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, ...response.errors }));
      }
    };
    
    
    return (
      <form onSubmit={handleSubmit}>
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
          Playlist Cover:
          <input type="file" name="playlistCover" onChange={handleInputChange} />
          {errors.playlistCover && <div style={{color:"red"}} >{errors.playlistCover}</div>}
        </label>
    
        <br />
    
        <label>
          Description:
          <textarea
          type='text'
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <div style={{color:"red"}} >{errors.description}</div>}
        </label>
    
        <br />
    
        <button type="submit">Submit</button>
      </form>
    );
}
