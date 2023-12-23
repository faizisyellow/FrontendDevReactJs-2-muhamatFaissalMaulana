import { Dropdown } from "react-bootstrap";
import "./filterNavigate.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FilterNavigation({ changeCategory, choose, clear, resto }) {
  const [categories, setCategories] = useState([]);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const isOpen = resto;
  console.log(isOpen);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  const handleOnOpen = () => {
    setIsOpenNow(!isOpenNow);
  };

  return (
    <div className="filter">
      <div className="filter-nav ms-5">
        <h5>Filter By:</h5>
      </div>
      <label>
        <input type="checkbox" checked={isOpenNow} onChange={() => handleOnOpen()} />
        OPEN NOW
      </label>
      <div className="dropdown">
        <Dropdown className="price">
          <Dropdown.Toggle id="dropdown-basic">Price</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">$</Dropdown.Item>
            <Dropdown.Item href="#/action-2">$$</Dropdown.Item>
            <Dropdown.Item href="#/action-3">$$$</Dropdown.Item>
            <Dropdown.Item href="#/action-4">$$$$</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="category">
          <Dropdown.Toggle id="dropdown-basic">Category</Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item key={category.id} onClick={() => changeCategory(category.name)}>
                {category.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <button onClick={() => clear()}>CLEAR ALL</button>
    </div>
  );
}
