import { Button, Dropdown } from "react-bootstrap";
import "./filterNavigate.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FilterNavigation({ openNow, changeCategory, clear, handlePrice }) {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="filter">
      <div className="filter-nav ms-5">
        <h5>Filter By:</h5>
      </div>
      <label>
        <input type="checkbox" onChange={() => openNow()} />
        OPEN NOW
      </label>
      <div className="dropdown">
        <Dropdown className="price">
          <Dropdown.Toggle id="dropdown-basic">Price</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handlePrice("$")}>$</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrice("$$")}>$$</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrice("$$$")}>$$$</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrice("$$$$")}>$$$$</Dropdown.Item>
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

      <Button onClick={() => clear()} className="btnClear">
        CLEAR ALL
      </Button>
    </div>
  );
}
