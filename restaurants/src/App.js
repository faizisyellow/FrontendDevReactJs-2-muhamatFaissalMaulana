import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./utils/constants";
import Restaurants from "./components/Restaurants";
import Header from "./components/Header";
import FilterNavigation from "./components/FilterNavigate";
import { Row } from "react-bootstrap";
import "./app.css";

import DetailView from "./components/detailView";

function App() {
  const [restos, setRestos] = useState([]);
  const [category, setCategory] = useState("");
  const [visibleRestos, setVisibleRestos] = useState(8);

  const getRestaurantsList = async () => {
    try {
      const response = await axios.get(`${API_URL}restaurant?`);

      setRestos(response.data);
    } catch (error) {
      console.error(error);
    }
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
    <Router>
      <div className="App">
        <Header />
        <FilterNavigation changeCategory={changeCategory} category={category} clear={handleClearAll} resto={restos.isOpen} />

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
        <Routes>
          <Route path="/restaurant/:id" element={<DetailView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
