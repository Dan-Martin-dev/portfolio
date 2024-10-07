import '/home/vare/project/landings_1/portfolio/portfolio/src/styles/Home.css';
import { interiors } from '../data/data';  // Relative path to the data file

export default function Home() {  

  return (
    <div className="w-full h-[calc(100vh-10px)] ">
      <ul>
        {interiors.map((interior, index) => (
          <li key={index}>
          <p data-text={interior.name} className='text-outline text-white font-bebas text-5xl font-bold'>{interior.name} </p>
          </li>
        ))}
      </ul>
    </div>
  );
} 