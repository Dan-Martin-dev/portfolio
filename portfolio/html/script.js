import { interiors } from "./data.js"; // Importing an array of data from 'data.js' file.

document.addEventListener("DOMContentLoaded", function () {

  // section 1
  const cursor = document.querySelector(".cursor");
  const gallery = document.querySelector(".gallery");
  const numberOfTimes = interiors.length;
  const radius = 1100;
  const body = document.body;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const angleIncrement = (2 * Math.PI) / numberOfTimes;
  
  // Calculating the angle between each item, dividing the full circle (2π radians) by the number of items.

  // Create a single image element to be reused during hover events.
  const img = document.createElement("img");
  img.className = "image-element";
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  cursor.appendChild(img); // Adding the image element to the cursor container.

  // section 2
  // Loop through the interiors array to create and position each item.
  interiors.forEach((interior, i) => {
    const item = document.createElement("div");
    item.className = "item";
    // Creating a new div for each item with the class 'item'.

    const p = document.createElement("p");
    const count = document.createElement("span");
    // Creating a paragraph and a span element for each item.

    p.textContent = interior.name;
    count.textContent = `(${Math.floor(Math.random() * 50) + 1})`;
    // Setting the text content of the paragraph (interior name) and the span (a random count).

    item.appendChild(p);
    p.appendChild(count);
    gallery.appendChild(item);
    // Appending the paragraph to the item and the item to the gallery.

    // Positioning the items in a circular layout based on their index.
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    // Calculating the x and y positions using trigonometry to place the items in a circle.

    const rotation = (angle * 180) / Math.PI;
    // Converting the angle from radians to degrees to rotate each item.

    gsap.set(item, {
      x: x + "px",
      y: y + "px",
      rotation: rotation,
      transformOrigin: "center center",
      margin: "0 20px",
      // Using GSAP to set the item's position, rotation, and add some margin for spacing.
    });

    // Hover interaction: Show image on mouseover.
    item.addEventListener("mouseover", function () {
      const imgSrc = `./assets/img/${i + 1}.jpg`;
      const img = document.createElement("img");
      // Setting the image source dynamically based on the item's index.

      img.src = imgSrc;
      img.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
      // Initially setting the clip-path to hide the image.

      cursor.appendChild(img);
      // Adding the image to the cursor when hovering over an item.

      gsap.to(img, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        // Animate the clip-path to reveal the image.
        duration: 1,
        ease: "power3.out",
        // Smooth easing for the animation.
      });
    });

    // Hover interaction: Hide image on mouseout.
    item.addEventListener("mouseout", function () {
      const imgs = cursor.getElementsByTagName("img");
      // Get all images inside the cursor.

      if (imgs.length) {
        const lastImg = imgs[imgs.length - 1];
        // Reference the last image element.

        Array.from(imgs).forEach((img, index) => {
          if (img !== lastImg) {
            gsap.to(img, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              // Hide all previous images.
              duration: 1,
              ease: "power3.out",
              onComplete: () => {
                setTimeout(() => {
                  img.remove();
                }, 1000);
                // Remove previous images after a delay.
              },
            });
          }
        });
      }

      gsap.to(lastImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        // Hide the last image after a delay.
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
      });
    });
  });

  /* Scroll event: Update position of items in the circle when scrolling */
  function updatePosition() {
    const scrollAmount = window.scrollY * 0.001; // Smaller factor for smoother scroll effect
  
    document.querySelectorAll(".item").forEach(function (item, index) {
      // Adjusting the angle of each item based on the scroll amount.
      const angle = index * angleIncrement + scrollAmount;
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI; // Use a stable conversion for rotation
  
      gsap.to(item, {
        duration: 0.2, // Increase duration slightly for smoother transition
        x: x + "px",
        y: y + "px",
        rotation: rotation,
        ease: "power1.out", // Smoother easing to prevent glitches
      });
    });
  }
  
  // Calculate the required height based on the circle's size
  function adjustBodyHeight() {
    const requiredHeight = radius * 2 + window.innerHeight; // Add window height to account for extra space
    body.style.height = `${requiredHeight}px`;
  }

  // Set the initial height and readjust on window resize
  adjustBodyHeight();
  window.addEventListener("resize", adjustBodyHeight);
  document.addEventListener("scroll", updatePosition);
  // Add event listener to update item positions when the user scrolls.

  document.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.clientX - 150,
      y: e.clientY - 200,
      // Move the custom cursor based on the mouse position, offset by 150px and 200px to center the cursor.
      duration: 1,
      ease: "power3.out",
      // Smooth easing for the cursor movement.
    });
  });
});
