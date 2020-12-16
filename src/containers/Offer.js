import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "../assets/img/defaultavatar.png";

const Offer = ({ token }) => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-back-zmzm.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <span>en cours de chargement</span>
  ) : (
    <>
      <div className="body-offer">
        <div className="offer-container">
          <div>
            <img
              className="offer-img"
              src={data.product_image.secure_url}
              alt="offer img"
            />
          </div>
          <div className="info-offer">
            <div>
              <span className="price-offer">{data.product_price} €</span>
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <>
                    <ul className="offer-desc">
                      <li>
                        <span key={index}>{keys[0]}</span>
                        <span> {elem[keys[0]]} </span>
                      </li>
                    </ul>
                  </>
                );
              })}
              <div className="separator"></div>
              <div className="offer-info2">
                <p className="name">{data.product_name}</p>
                <p className="descc">{data.product_description}</p>
                <span>
                  {data.owner.account.avatar ? (
                    <img
                      className="avat"
                      src={data.owner.account.avatar.secure_url}
                      alt=""
                    />
                  ) : (
                    <img src={Avatar} alt="" className="avatar" />
                  )}
                  <span>{data.owner.account.username}</span>
                </span>
              </div>
            </div>
            <Link
              to={{
                pathname: "/payment",
                state: {
                  token: token,
                  title: data.product_name,
                  amount: data.product_price,
                },
              }}
            >
              <button>Acheter</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
