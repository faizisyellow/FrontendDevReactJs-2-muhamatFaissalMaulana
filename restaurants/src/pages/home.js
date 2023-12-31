import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import "../app.css";
import { API_URL } from "../utils/constants";
import Header from "../components/Header";
import FilterNavigation from "../components/FilterNavigate";
import Restaurants from "../components/Restaurants";

export default function Home() {
  const [restos, setRestos] = useState([]);
  const [category, setCategory] = useState("");
  const [visibleRestos, setVisibleRestos] = useState(8);
  const [showOpenRestos, setShowOpenRestos] = useState(false);

  const getRestaurantsList = async () => {
    try {
      const response = await axios.get(`${API_URL}restaurant?`);

      setRestos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    const isOpenRestos = restos.filter((resto) => {
      const currentHour = new Date().getHours();
      return currentHour >= resto.isOpen && currentHour < resto.isClose;
    });
    setRestos(isOpenRestos);
  };

  const handleCheckboxOpen = () => {
    setShowOpenRestos(!showOpenRestos);

    if (showOpenRestos) {
      getRestaurantsList();
    } else {
      handleOpen();
    }
  };

  const handlePrice = (selectedPrice) => {
    const filterByPrice = restos.filter((resto) => resto.price === selectedPrice);
    setRestos(filterByPrice);
  };

  const changeCategory = async (values) => {
    setCategory(values);
    try {
      const response = await axios.get(`${API_URL}restaurant?category.name=${values}`);

      setRestos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    const remainingRestos = restos.length - visibleRestos;

    setVisibleRestos((prevVisibleRestos) => prevVisibleRestos + Math.min(remainingRestos, 8));
  };

  const handleClearAll = () => {
    setCategory("");
    getRestaurantsList();
  };
  useEffect(() => {
    getRestaurantsList();
  }, []);

  return (
    <div className="App">
      <Header />
      <FilterNavigation openNow={handleCheckboxOpen} changeCategory={changeCategory} category={category} clear={handleClearAll} resto={restos.isOpen} handlePrice={handlePrice} />

      <Row className="ms-4 ps-2">
        {restos.slice(0, visibleRestos).map((resto) => (
          <Restaurants resto={resto} key={resto.id} />
        ))}
      </Row>
      {visibleRestos < restos.length && (
        <div className="text-center mt-3">
          <button onClick={handleLoadMore} className="button-load">
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
}
