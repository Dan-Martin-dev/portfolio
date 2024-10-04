
const Projects = () => {
  return (
    <div className="mt-20 text-center">
      {/* Title */}
      <h1 className=" font-bold text-6xl text-white pb-10">
        WHAT I&apos;VE BEEN WORKING ON
      </h1>

      {/*  projects wrap */}
      <div
        id="about"
        className="mx-5 md:mx-28 lg:mx-48 p-6 border-white shadow-lg"
      >
        {/* container */}
        <div className="flex flex-col text-center justify-center items-center xl:flex-row align-middle bg-black text-white  md:text-left pb-10">
          {/* Image */}
          <div className="flex flex-col items-center pb-6">
            {/* Image */}
            <div className=" overflow-hidden  w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] mx-10">
              <img
                src="/portfolio/src/assets/img/profile.jpg"
                alt="Dan Martin"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-start align-top">
            {/* Name */}
            <h2 className="text-6xl  font-bold text-customRed pb-6">
              Nest.js ecommerce website
            </h2>

            {/* Description */}
            <h2 className=" font-thin text-2xl">
              I&apos;m Dan, a full-stack web developer. I specialize in building web
              applications in JavaScript and Python environments. My projects
              range from simple automation tasks to fully-fledged e-commerce
              websites. I&apos;m Dan, a full-stack web developer. I specialize in
              building web applications in JavaScript and Python environments.
              My projects range from simple automation tasks to fully-fledged
              e-commerce websites.
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
