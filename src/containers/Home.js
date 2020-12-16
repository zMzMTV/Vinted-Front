import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeImg from "../assets/img/vintedHomeHero.jpg";
import Hero from "../assets/img/styleHomeImg.svg";
import Avatar from "../assets/img/defaultavatar.png";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://vinted-back-zmzm.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>en cours de chargement</span>
  ) : (
    <>
      <div className="container">
        <div className="home-hero">
          <Link to="/publish">
            <div>
              <div className="home-hero-ready">
                Prêt à faire du rangement dans vos placard ?
                <button>Commencer à vendre</button>
              </div>
            </div>
          </Link>
          <img src={Hero} alt="" className="home-hero-forme" />
        </div>
        <>
          <div className="home-card-wrapper">
            {data.offers.map((item, id) => {
              return (
                <div key={id}>
                  <div className="card-container">
                    <div className="card-avatar-username">
                      <span>
                        {item.owner.account.avatar ? (
                          <img
                            src={item.owner.account.avatar.secure_url}
                            alt="avatar pic"
                            className="avatar"
                          />
                        ) : (
                          <img src={Avatar} alt="" className="avatar" />
                        )}
                        <span>{item.owner.account.username}</span>
                      </span>
                    </div>
                    <Link to={`/product/${item._id}`}>
                      <div>
                        <img src={item.product_image.secure_url} alt="" />
                        <div className="card-price-brand-size">
                          <span>{item.product_price} €</span>
                          <span>{item.product_details[1].TAILLE}</span>
                          <span>{item.product_details[0].MARQUE}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      </div>
    </>
  );
};

export default Home;
