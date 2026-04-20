import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AboutMe from './components/AboutMe';
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Projects from './components/Projects';
import Graphics from './components/Graphics';
import Others from './components/Others';
import SinglePost from "./components/SinglePost";
import SingleProject from "./components/SingleProject";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Projects" element={<Projects/>}/>
          <Route path="/Graphics" element={<Graphics/>}/>
          <Route path="/Others" element={<Others/>}/>
          <Route path="/AboutMe" element={<AboutMe/>}/>
          <Route path="/Post/:slug" element={<SinglePost/>}/>
          <Route path="/Projects/:slug" element={<SingleProject/>} />
        </Routes>
        <Footer/>
        <BackToTop/>
      </Router>
    </div>
  );
}

export default App;
