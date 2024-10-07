import { interiors } from "/home/vare/project/landings_1/portfolio/portfolio/src/data/data.tsx";
    
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");
  const gallery = document.querySelector(".gallery");
  const numberOfTimes = 60;
  const radius = 1100;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angleIncrement = (2 * Math.PI) / numberOfTimes;

  for (let i = 0; i < numberOfTimes; i++) {
    const item =- document.createElement("div");
    item.className = "item";
    const p = document.createElement("p");
    const count = document.createElement("span");
    p.textContent = interiors[i].name;
    count.textContet = `(${Math.floor(Math.random() * 50) + 1})`;
    item.appendChild(p);
    p.appendChild(count);
    gallery.appendChild(item);
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const rotation =(angle * 180) / Math.PI;
    gsap.set(item, {
      x: x + "px",
      y: y + "px",
      rotation: rotation,
    });
    item.addEventListener('mouseover', function(){
      const imgSrc =`./assets/img${i+1}.jpg`;
    })
  }
});
