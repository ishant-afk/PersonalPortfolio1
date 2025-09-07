const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from(
        "#nav",{
            y: -10,
            opacity: 0,
            duration:1.5,
            ease: Expo.easeInOut
        }
    ).to(
        ".boundingelem",{
            y: 0,
            duration:1.5,
            ease: Expo.easeInOut,
            stagger: 0.2,
            delay: -1
        }
    ).from(
        "#homefooter",{
            y: -10,
            duration:1.5,
            opacity: 0,
            ease: Expo.easeInOut,
            delay: -1
        }
    )

}



// making the mouse follower circle follow mouse and scale based on speed
function circleMouseFollower(xscale, yscale){
    const circle = document.querySelector("#cursorcircle");
    const rect = circle.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 2;

    window.addEventListener("mousemove", function(dets){
        document.querySelector("#cursorcircle").style.transform = `translate(${dets.x - offsetX}px, ${dets.y - offsetY}px) scale(${xscale}, ${yscale})`;
    });
}


// making the mouse follower circle squish on fast mouse move
function circleMouseSquiser(){
    // clearTimeout(timeout);
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.9, 1.1, xdiff);
        yscale = gsap.utils.clamp(0.9, 1.1, ydiff);
        // console.log(xscale, yscale);

        circleMouseFollower(xscale, yscale);


        const circle = document.querySelector("#cursorcircle");
        const rect = circle.getBoundingClientRect();
        const offsetX = rect.width / 2;
        const offsetY = rect.height / 2;

        // timeout = setTimeout(() => {
        //     document.querySelector("#cursorcircle").style.transform = `translate(${dets.x - offsetX}px, ${dets.y - offsetY}px) scale(1, 1)`;
        // }, 100);
    });
}

circleMouseSquiser();
circleMouseFollower();
firstPageAnim();


// making images follow mouse on hover and rotate and follow link
let curr_elem = null;

document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;


  const img = elem.querySelector("img");
  const cursor = document.getElementById('cursorcircle');
  const btn = document.querySelector("#cursorcircle .cursor-btn");

  elem.addEventListener("mouseenter", () => {
    curr_elem = elem;
    // isInsideElem = true;
  });

  elem.addEventListener("mouseleave", function () {
    // isInsideElem = false;
    curr_elem = null;
    // cursor.style.pointerEvents = "none";
    gsap.to([img, btn], {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    gsap.to(cursor, {
      opacity: 1,
      width:12,
      height:12
    });
  });


  elem.addEventListener("mousemove", function (dets) {
    const rect = elem.getBoundingClientRect();

    // Mouse position relative to elem
    const mouseX = dets.clientX - rect.left;
    const mouseY = dets.clientY - rect.top;

    // Rotation calculation
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    // btn.style.pointerEvents = "auto";

    gsap.to(img, {
      opacity: 1,
      ease: Power3,
      top: mouseY,
      left: mouseX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });

    gsap.to(cursor, {
      opacity: 0.8,
      width:90,
        height:90,
      ease: Power3
    });

    gsap.to(btn, {
      opacity: 1,
    });
    

    // cursor.style.pointerEvents = "auto";

  });
  
});

document.addEventListener("click", () => {
    const link = curr_elem.getAttribute("data-link");
    if(link ) {
        window.open(link, "_blank");
    }
});



// using arrow buttons to scroll to next section
const arrow_buttons = document.querySelectorAll('#iconset .circle');
const secondPage = document.querySelector('#secondpage');

arrow_buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    scroll.scrollTo(secondPage); // Locomotive handles the smooth scroll
  });
  btn.addEventListener('mouseover', () => {
    gsap.to(btn, { opacity: 0.5});
  });
    btn.addEventListener('mouseout', () => {
    gsap.to(btn, { opacity: 1});
    });

});



// using nav buttons to scroll to sections
project_nav = document.getElementById('project_nav');
project_nav.addEventListener('click', () => {
    scroll.scrollTo(secondPage); // Locomotive handles the smooth scroll
});

about_nav = document.getElementById('about_nav');
about_nav.addEventListener('click', () => {
    scroll.scrollTo('#about'); // Locomotive handles the smooth scroll
});

// connect_nav = document.getElementById('connect_nav');
// about_nav.addEventListener('click', () => {
//     scroll.scrollTo('#footer'); // Locomotive handles the smooth scroll
// });

// using linkdin arrow icon
linkdin_icon = document.querySelector('#connect h3 i');
linkdin = document.querySelector('#connect h3');
linkdin.addEventListener('mouseover', () => {
    gsap.to(linkdin, { opacity: 0.5});
    gsap.to(linkdin_icon, { className: 'ri-arrow-up-line'});
});
linkdin.addEventListener('mouseout', () => {
    gsap.to(linkdin, { opacity: 1});
    gsap.to(linkdin_icon, { className: 'ri-arrow-right-up-line'});
});
linkdin.addEventListener('click', () => {
    window.open("https://www.linkedin.com/in/ishant-kamboj-a1268519a/", "_blank"); 
});


// setting up Menu button to open side nav

menuBtn = document.getElementById("menuBtn");
let menuClicked = false;

function openNav() {
    menuClicked = true;
  document.getElementById("mySidenav").style.width = "300px";
  gsap.to("#menuBtn", { opacity: 0});
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
    menuClicked = false;
  setTimeout(() => {
    menuBtn.style.opacity = 1;
  }, 300); // 500 ms = 0.5s
}

menuBtn.addEventListener("click", openNav);
menuBtn.addEventListener("mouseover", () => {
    gsap.to("#menuBtn", { opacity: 0.5});
});
menuBtn.addEventListener("mouseout", () => {
    if(!menuClicked){
    gsap.to("#menuBtn", { opacity: 1});}
});

document.getElementById("closebtn").addEventListener("click", closeNav);



function updateFooterTime() {
    const now = new Date();
    // console.log(now);
    // Year
    
    document.getElementById("year").textContent = now.getFullYear();

    // Time in hh:mm AM/PM
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 24h → 12h

    const timeString = `${hours}:${minutes} ${ampm} IST`;
    document.getElementById("time").textContent = timeString;
  }

updateFooterTime();
setInterval(updateFooterTime, 60000);

// contact links


const githubLink = document.querySelector('#footerConnect #githubLink');
githubLink.addEventListener('click', () => {
    window.open("https://github.com/ishant-afk", "_blank"); 
  });

  githubLink.addEventListener('mouseover', () => {
    gsap.to(githubLink, { opacity: 0.5});
  });

  githubLink.addEventListener('mouseout', () => {
    gsap.to(githubLink, { opacity: 1});
  });




