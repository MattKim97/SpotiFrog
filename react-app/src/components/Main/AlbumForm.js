import React from 'react'
import { thunkCreateAlbum } from '../../store/albums';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { format } from 'date-fns';

export default function AlbumForm() {

const dispatch = useDispatch();
const history = useHistory();
const [errors, setErrors] = useState({});

const [formData, setFormData] = useState({
  name: "",
  albumCover: null,
  releaseDate: null,
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
  formDataToSend.append("albumCover", formData.albumCover);
  if(!formData.releaseDate){
    setErrors((prevErrors) => ({
      ...prevErrors,
      releaseDate: "Please select a release date",
    }));
  }
  const formattedDate = format(new Date(formData.releaseDate), 'yyyy-MM-dd');
  formDataToSend.append("releaseDate", formattedDate);


  const response = await dispatch(thunkCreateAlbum(formDataToSend));


  if (!response.errors) {
    history.push(`/albums/${response.id}`);
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, ...response.errors }));
  }
};


return (
  <div className='formsContainer'>

  <form  className="formsStyle" onSubmit={handleSubmit}>
  <h2>Create a Album!</h2>
    <label>
      Album Name:
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
      Album Cover(optional):
      <input className="inputFileForm" type="file" name="albumCover" onChange={handleInputChange} />
      {errors.albumCover && <div style={{color:"red"}} >{errors.albumCover}</div>}
    </label>

    <br />

    <label>
      Release Date:
      <input
      type='date'
        name="releaseDate"
        value={formData.releaseDate}
        onChange={handleInputChange}
      />
      {errors.releaseDate && <div style={{color:"red"}} >{errors.releaseDate}</div>}
    </label>

    <br />

    <button className="formsSubmit" type="submit">Submit</button>
  </form>
  </div>
);
        }
