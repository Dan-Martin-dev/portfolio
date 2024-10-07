import { interiors } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");
  const gallery = document.querySelector(".gallery");

  const numberOfTimes = 60;
  const radius = 1100;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angleIncrement = (2 * Math.PI) / numberOfTimes;

  // Create the image once and reuse it
  const img = document.createElement("img");
  img.className = "image-element";
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  cursor.appendChild(img);

  for (let i = 0; i < numberOfTimes; i++) {
    const item = document.createElement("div");
    item.className = "item";
    
    const p = document.createElement("p");
    const count = document.createElement("span");
    p.textContent = interiors[i].name;
    count.textContent = `(${Math.floor(Math.random() * 50) + 1})`;
    
    item.appendChild(p);
    p.appendChild(count);
    gallery.appendChild(item);

    // Positioning the Items in a Circle
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const rotation = (angle * 180) / Math.PI;

    gsap.set(item, {
      x: x + "px",
      y: y + "px",
      rotation: rotation,
    });

    // Hover mouseover Interaction
    item.addEventListener('mouseover', function() {
      const imgSrc = `./assets/img/${i + 1}.jpg`;  // Correct path
      img.src = imgSrc;
      img.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";  // Initial clip-path
      cursor.appendChild(img);

      gsap.to(img, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",  // Reveal the image
        duration: 1,
        ease: "power3.out"
      });
    }); 

    // Hover mouseout Interaction
    item.addEventListener('mouseout', function() {  
      const imgs = cursor.getElementsByTagName('img');
      if(imgs.length) {
        const lastImg = imgs[imgs.length - 1];
        Array.from(imgs).forEach((img, index) => {
          if(img !== lastImg) {
            gsap.to(img, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",  // Hide the image
              duration: 1,
              ease: "power3.out",
              onComplete: () => {
                setTimeout(() => {
                  img.remove()
                }, 1000);
              }
            });
          }
        })
      }
      
      gsap.to(lastImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",  // Hide the image
        duration: 1,
        ease: "power3.out",
        delay: 0.25
      });
    });
  }
});

