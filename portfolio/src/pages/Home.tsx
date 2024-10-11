import '/home/vare/project/landings_1/portfolio/portfolio/src/styles/Home.css';
import { interiors } from '../data/data';  // Relative path to the data file
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Home: React.FC = () => {

  /* use ref */
  const cursorRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLBodyElement>(document.body as HTMLBodyElement);

  /* use effect */
  useLayoutEffect(() => {
    const cursor = cursorRef.current;
    const gallery = galleryRef.current;
    const numberOfTimes = interiors.length;
    const radius = 1100;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / numberOfTimes;

    // Create a reusable image element
    const img = document.createElement("img");
    img.className = "image-element";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    cursor?.appendChild(img);

    // Position the gallery items in a circular layout
    interiors.forEach((interior, i) => {
      const item = document.createElement("div");
      item.className = "item";

      const p = document.createElement("p");
      const count = document.createElement("span");
      p.textContent = interior.name;
      p.classList.add("text-outliner");  // Apply text-outline class
      p.classList.add("text-6xl", "text-white");  // Add Tailwind classes

      p.setAttribute("data-text", interior.name);  // Add data-text attribute
      count.textContent = `(${Math.floor(Math.random() * 50) + 1})`;

      item.appendChild(p);
      p.appendChild(count);
      gallery?.appendChild(item);

      const angle = i * angleIncrement;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI;

      gsap.set(item, {
        x: `${x}px`,
        y: `${y}px`,
        rotation: rotation, 
        transformOrigin: "center center",
        margin: "0 20px",
      });

      // Hover interaction: Show image on mouseover
      item.addEventListener("mouseover", () => {
        const imgSrc = `/img/${i + 1}.jpg`;
        const img = document.createElement("img");
        img.src = imgSrc;
        img.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        cursor?.appendChild(img);
        gsap.to(img, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power3.out",
        });
      });

      // Hover interaction: Hide image on mouseout
      item.addEventListener("mouseout", () => {
        const imgs = cursor?.getElementsByTagName("img") || [];
        if (imgs.length) {
          const lastImg = imgs[imgs.length - 1];
          Array.from(imgs).forEach((img) => {
            if (img !== lastImg) {
              gsap.to(img, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                  setTimeout(() => img.remove(), 1000);
                },
              });
            }
          });
          gsap.to(lastImg, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power3.out",
            delay: 0.25,
          });
        }
      });
    });

    // Scroll and resize events
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

    /* Mantain a perfect circle */
    const adjustBodyHeight = () => {
      const requiredHeight = radius * 2 + window.innerHeight;
      bodyRef.current.style.height = `${requiredHeight}px`;
    };

    adjustBodyHeight();
    window.addEventListener("resize", adjustBodyHeight);
    window.addEventListener("scroll", updatePosition);

    // Mousemove for cursor
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
      // Clean up events when the component unmounts
      window.removeEventListener("resize", adjustBodyHeight);
      window.removeEventListener("scroll", updatePosition);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className='w-full max-h-min font-bebas'>
      <div ref={cursorRef} className="cursor"></div>
      <div className="">
        <div ref={galleryRef} className="gallery"></div>
      </div>
    </div>
  );
};

export default Home;
