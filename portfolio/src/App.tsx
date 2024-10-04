import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

function App() {

  return (
    <div className="bg-black flex flex-col min-h-screen">
      <Header />

    <Router>
{/*       <Routes>
         <Route path="/" element={} />
        <Route path="/about" element={} />
        <Route path="/contact" element={} /> 
      </Routes> */}
    </Router>
    </div>
  )
}

export default App
