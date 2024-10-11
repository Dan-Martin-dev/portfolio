import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { interiors } from '../data/data';  // Adjust the path to your data
import '/home/vare/project/landings_1/portfolio/portfolio/src/styles/Home.css';

const Home: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLBodyElement>(document.body as HTMLBodyElement);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);  // Track the hovered item

  useLayoutEffect(() => {
    const cursor = cursorRef.current;
    const gallery = galleryRef.current;
    const radius = 1100;
    let centerX = window.innerWidth * 0.25; // Keep the circle on the left side (25% of the screen width)
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / interiors.length;

    // Set initial positions without animation
    const setInitialPositions = () => {
      centerX = window.innerWidth * 0.25;  // Dynamically adjust the X position based on window width
      const items = gallery?.getElementsByClassName("item") || [];
      Array.from(items).forEach((item, index) => {
        const angle = index * angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const rotation = (angle * 180) / Math.PI;

        gsap.set(item, {
          x: `${x}px`,
          y: `${y}px`,
          rotation: rotation,
          transformOrigin: "center center",
        });
      });
    };

    // Handle scroll event to update positions with animation
    const updatePosition = () => {
      const scrollAmount = window.scrollY * 0.001;
      const items = gallery?.getElementsByClassName("item") || [];
      Array.from(items).forEach((item, index) => {
        const angle = index * angleIncrement + scrollAmount;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const rotation = (angle * 180) / Math.PI;

        gsap.to(item, {
          duration: 0.2,
          x: `${x}px`,
          y: `${y}px`,
          rotation: rotation,
          ease: "power1.out",
        });
      });
    };

    // Adjust body height to ensure scrolling works properly
    const adjustBodyHeight = () => {
      const requiredHeight = radius * 2 + window.innerHeight;
      bodyRef.current.style.height = `${requiredHeight}px`;
    };

    // Initialize positions and set body height
    adjustBodyHeight();
    setInitialPositions();

    window.addEventListener("resize", () => {
      centerX = window.innerWidth * 0.25;  // Recalculate centerX on resize
      adjustBodyHeight();
      setInitialPositions();  // Update positions after resizing
    });
    window.addEventListener("scroll", updatePosition);

    // Handle mouse movement for the custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 150,
        y: e.clientY - 200,
        duration: 1,
        ease: "power3.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Clean up event listeners on component unmount
      window.removeEventListener("resize", adjustBodyHeight);
      window.removeEventListener("scroll", updatePosition);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Function to handle hover and show image
  const handleMouseEnter = (itemName: string) => {
    setHoveredItem(itemName);  // Track the hovered item name
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);  // Reset the hovered item
  };
  console.log(hoveredItem); // Check if the item name is being set correctly

  return (
    <div className='w-full max-h-min font-bebas'>
      <div ref={cursorRef} className="cursor">
        {hoveredItem && (
          <img 
            src={`/img/${hoveredItem}.jpg`} // Updated path
            alt={hoveredItem} 
            className="hover-image" 
            style={{ zIndex: 9999 }} // High z-index for testing
          />
        )}
      </div>
      <div className="gallery-container">
        <div ref={galleryRef} className="gallery">
          {interiors.map((interior, index) => {
            const angle = index * (2 * Math.PI) / interiors.length;
            const x = window.innerWidth * 0.25 + 1100 * Math.cos(angle);  // Keep items on the left side
            const y = window.innerHeight / 2 + 1100 * Math.sin(angle);
            const rotation = (angle * 180) / Math.PI;

            return (
              <div
                key={index}
                className="item"
                style={{
                  position: "absolute",
                  transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                }}
                onMouseEnter={() => handleMouseEnter(interior.name)}  // Trigger hover event
                onMouseLeave={handleMouseLeave}  // Reset on leave
              >
                <p className="text-outliner text-6xl text-white" data-text={interior.name}>
                  {interior.name} <span>({Math.floor(Math.random() * 50) + 1})</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
