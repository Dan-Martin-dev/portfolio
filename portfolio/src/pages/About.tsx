import '/home/vare/project/landings_1/dan_martin_portfolio/styles/SmHome.css'

export default function About() {

  return (
    /* frame */
    <div id="about" className="mx-5 md:mx-28 lg:mx-48 p-6 border-4 border-white rounded-lg shadow-lg">
      
      {/* container */}
      <div className="flex flex-col xl:flex-row align-middle justify-center items-center bg-black text-white text-center md:text-left p-6">

        {/* Image and Name */}
        <div className="flex flex-col items-center md:items-start">
        
          {/* Image */}
          <div className="rounded-full overflow-hidden  w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] mx-10">
            <img 
              src="/portfolio/img/profile.jpg" 
              alt="Dan Martin" 
              className="object-cover"
            />
          </div>

          {/* SM Name */}
          <div className='md:hidden p-4'>
            <h2 className="text-5xl  font-bold">Dan</h2>
            <h2 className="text-3xl text-customRed  font-semibold">Web developer</h2>
          </div>

        </div>

        {/* Description */}
        <div className="text-start justify-start align-middle ">

          {/* LG Name */}
          <div className='hidden md:block p-4'>
            <h2 className="text-6xl  font-semibold">Dan Martin</h2>
            <h2 className="text-4xl  font-bold text-customRed">Web developer</h2>
          </div>

          {/* SM Description */}
          <h2 className='md:p-4  font-thin text-2xl'>
            I&apos;m Dan, a full-stack web developer. I specialize in building web applications in JavaScript and Python environments. My projects range from simple automation tasks to fully-fledged e-commerce websites. 
          </h2>
          <h2 className='md:pl-4  font-thin text-2xl'>
            My goal is to be a &apos;jack of all trades&apos; continuously learning new technologies without becoming attached to any one way of writing code.    
          </h2>
        </div>

      </div>

    </div>
  );
}