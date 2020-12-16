import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

const Publish = ({ token }) => {
  let history = useHistory();
  const [preview, setPreview] = useState();
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("picture", picture);
  formData.append("description", description);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("color", color);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("price", Number(price));

  const picPreview = (event) => {
    URL.createObjectURL(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (
        title &&
        price &&
        picture &&
        description &&
        brand &&
        size &&
        color &&
        condition &&
        city
      ) {
        const response = await axios.post(
          "https://vinted-back-zmzm.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        history.push("/");
      } else {
        alert("missig informations!!");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return token ? (
    <div className="publish-main">
      <div className="publish-container">
        <form onSubmit={handleSubmit} className="form-pub">
          <h2>Vend ton article</h2>
          <div className="file-select">
            <p>Ajoute une photos</p>
            {preview ? (
              <div className="preview-image">
                <img src={preview} alt="pré-visualisation" />
                <div
                  className="remove-img-button"
                  onClick={(event) => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="dashed-preview-without">
                <div className="input-design-default">
                  <label htmlFor="file" className="label-file">
                    <span className="input-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="input-file"
                    onChange={(event) => {
                      setPicture(event.target.files[0]);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="ex: Chemise verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                type="description"
                cols="30"
                rows="10"
                value={description}
                placeholder="ex: Porté quelque fois, taille correct"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div className="text-input-section">
              <div className="text-input">
                <h4>Marque</h4>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  placeholder="ex: Raf Simmons"
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Taille</h4>
                <input
                  type="text"
                  name="size"
                  value={size}
                  placeholder="ex: S / 43 / M"
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Couleur</h4>
                <input
                  type="text"
                  name="couleur"
                  value={color}
                  placeholder="ex: green"
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>État</h4>
                <input
                  type="text"
                  name="condition"
                  value={condition}
                  placeholder="ex: Neuf"
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
              <div className="text-input">
                <h4>Lieu</h4>
                <input
                  type="text"
                  name="city"
                  value={city}
                  placeholder="ex: Paris"
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Price</h4>
              <div className="checkbox-section">
                <input
                  type="text"
                  name="price"
                  value={price}
                  placeholder="ex: 20,00"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox-input">
                  <label htmlFor="exchange">
                    <input
                      name="exchange"
                      id="exchange"
                      value="exchange"
                      type="checkbox"
                      className="checkbox-design"
                    />
                    <span>Je suis intéressé(e) par les échanges</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-button-div">
            <button type="submit" className="form-validation">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { fromPublish: true },
      }}
    />
  );
};

export default Publish;
