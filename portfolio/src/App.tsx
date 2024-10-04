import './App.css'
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './pages/Projects';

function App() {

  return (
    <div className="bg-black flex flex-col min-h-screen">
      <Header/>
      <Home/>
      <About/>
      <Projects/>
    </div>
  )
}

export default App
