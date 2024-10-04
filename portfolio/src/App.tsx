import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './pages/Projects';

function App() {

  return (
    <div className="bg-customRed flex flex-col min-h-screen">
      <Header/>
      <Home/>
      <About/>
      <Projects/>
    </div>
  )
}

export default App
