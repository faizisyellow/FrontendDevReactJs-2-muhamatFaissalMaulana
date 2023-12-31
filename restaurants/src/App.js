import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import DetailView from "./components/detailView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resto/:id" element={<DetailView />} />
      </Routes>
    </Router>
  );
}

export default App;
