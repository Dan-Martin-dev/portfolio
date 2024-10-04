import './App.css'
import Header from './components/Header';
import About from './pages/About';

function App() {

  return (
    <div className="bg-black flex flex-col min-h-screen">
      <Header />
      <About/>
    </div>
  )
}

export default App
