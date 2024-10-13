import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className=" flex flex-col max-h-full w-full ">
        <Header /> {/* Header is displayed on all routes */}
        <Routes>
          <Route path="/portfolio/" element={<Home />} />
          <Route path="/portfolio/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
