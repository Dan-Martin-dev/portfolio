import '/home/vare/project/landings_1/portfolio/portfolio/src/styles/About.css'

export default function About() {

  return (
    /* frame */
    <div id="about" className="bg-strongRed mx-5 md:mx-28 lg:mx-48 p-6 rounded-lg shadow-lg mt-10 md:mt-0">
      
      {/* container */}
      <div className="flex flex-col xl:flex-row xl:align-middle xl:justify-center xl:items-center text-white text-center xl:text-left p-6">

        {/* Image and Name */}
        <div className="flex flex-col items-center">
        
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
            <h2 data-text='Dan Martin' className="text-5xl text-outliner font-bebas font-bold">Dan Martin</h2>
            <h2  data-text='Web Developer' className="text-3xl text-outliner font-bebas font-bold">Web developer</h2>
          </div>

        </div>

        {/* Description */}
        <div className="">

          {/* LG Name */}
          <div className='hidden md:block p-4'>
            <h1 data-text='Dan Martin'  className="text-6xl font-bebas text-outliner font-semibold">Dan Martin</h1>
            <h1 data-text='Web Developer'  className="text-4xl font-bebas text-outliner font-bold text-white">Web developer</h1>
          </div>

          {/* SM Description */}
          <h2 className='md:p-4 font-bebas  font-thin text-xl'>
            I&apos;m Dan, a full-stack web developer. I specialize in building web applications in JavaScript and Python environments. My projects range from simple automation tasks to fully-fledged e-commerce websites. 
          </h2>
          <h2 className='md:pl-4  font-bebas  font-thin text-xl'>
            My goal is to be a &apos;jack of all trades&apos; continuously learning new technologies without becoming attached to any one way of writing code.    
          </h2>
        </div>

      </div>

    </div>
  );
}