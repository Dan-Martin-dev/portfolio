import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { interiors } from "../data/data"; // Adjust the path to your data
import "/home/vare/project/landings_1/portfolio/portfolio/src/styles/Home.css";

const Home: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLBodyElement>(document.body as HTMLBodyElement);

  useLayoutEffect(() => {
    const cursor = cursorRef.current;
    const gallery = galleryRef.current;
    const radius = 1100;
    let centerX = window.innerWidth * 0.25; // Default for large screens
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / interiors.length;

    const setInitialPositions = () => {
      // Dynamically adjust the X position based on window width
      if (window.innerWidth <= 375) {
        centerX = window.innerWidth * -1.5;
      } else if (window.innerWidth <= 390) {
        centerX = window.innerWidth * -1.4;
      } else if (window.innerWidth <= 428) {
        centerX = window.innerWidth * -1.1;
      } else if (window.innerWidth <= 480) {
        centerX = window.innerWidth * -0.9;
      } else if (window.innerWidth <= 600) {
        centerX = window.innerWidth * -0.5;
      } else if (window.innerWidth <= 768) {
        centerX = window.innerWidth * -0.2;
      } else if (window.innerWidth <= 840) {
        centerX = window.innerWidth * 0.1;
      } else if (window.innerWidth <= 1280) {
        centerX = window.innerWidth * 0.20;
      } else if (window.innerWidth <= 1366) {
        centerX = window.innerWidth * 0.25;
      } else if (window.innerWidth <= 1440) {
        centerX = window.innerWidth * 0.30;
      }else if (window.innerWidth <= 1920) {
        centerX = window.innerWidth * 0.50;
      }

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

    const adjustBodyHeight = () => {
      const requiredHeight = radius * 2 + window.innerHeight;
      bodyRef.current.style.height = `${requiredHeight}px`;
    };

    adjustBodyHeight();
    setInitialPositions();

    window.addEventListener("resize", () => {
      setInitialPositions(); // Update positions after resizing
      adjustBodyHeight();
    });

    window.addEventListener("scroll", updatePosition);

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
      window.removeEventListener("resize", adjustBodyHeight);
      window.removeEventListener("scroll", updatePosition);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (itemName: string) => {
    const imgSrc = `/portfolio/img/${itemName}.jpg`; // Updated path
    console.log("Image source:", imgSrc); // Debug: Check if the path is correct

    console.log(imgSrc);

    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"; // Initially hide the image
    cursorRef.current?.appendChild(img); // Add the image to the cursor

    gsap.to(img, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Animate reveal
      duration: 1,
      ease: "power3.out",
    });
  };
  // Function to handle hover and leave image
  const handleMouseLeave = () => {
    const imgs = cursorRef.current?.getElementsByTagName("img"); // Get all images inside the cursor

    if (imgs && imgs.length) {
      const lastImg = imgs[imgs.length - 1]; // Reference the last image element

      Array.from(imgs).forEach((img) => {
        if (img !== lastImg) {
          gsap.to(img, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Hide previous images
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
              setTimeout(() => {
                img.remove(); // Remove previous images after a delay
              }, 1000);
            },
          });
        }
      });

      gsap.to(lastImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // Hide the last image
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
      });
    }
  };

  return (
    <div className="w-full max-h-min font-bebas">
      <div ref={cursorRef} className="cursor"></div> {/* Custom cursor area */}
      <div className="gallery-container">
        <div ref={galleryRef} className="gallery">
          {interiors.map((interior, index) => {
            const angle = (index * (2 * Math.PI)) / interiors.length;
            const x = window.innerWidth * 0.25 + 1100 * Math.cos(angle); // Keep items on the left side
            const y = window.innerHeight / 2 + 1100 * Math.sin(angle);
            const rotation = (angle * 100) / Math.PI;

            return (
              <div
                key={index}
                className="item"
                style={{
                  position: "absolute",
                  transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                }}
                onMouseEnter={() => handleMouseEnter(interior.id.toString())} // Convert id to string
                onMouseLeave={handleMouseLeave} // Reset on leave
              >
                <p
                  className="text-outliner text-5xl text-white"
                  data-text={interior.name}
                >
                  {interior.name}{" "}
                  <span>({Math.floor(Math.random() * 50) + 1})</span>
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
