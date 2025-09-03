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


// function circleMouseFollower(){
//     window.addEventListener("mousemove", function(dets){
//         // console.log(dets);
//         document.querySelector("#cursorcircle").style.transform = `translate(${dets.x}px, ${dets.y}px)`;
//     })
// }

function circleMouseFollower(xscale, yscale){
    const circle = document.querySelector("#cursorcircle");
    const rect = circle.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 2;

    window.addEventListener("mousemove", function(dets){
        document.querySelector("#cursorcircle").style.transform = `translate(${dets.x - offsetX}px, ${dets.y - offsetY}px) scale(${xscale}, ${yscale})`;
    });
}



// var timeout;
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

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);
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



document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});


// const buttons = document.querySelectorAll('#iconset .circle');

// buttons.forEach(btn =>
// {
//     btn.addEventListener('click', ()=>{
//         document.getElementById('secondpage').scrollIntoView({behavior: 'smooth'});
//     })
// }
// )

const buttons = document.querySelectorAll('#iconset .circle');
const secondPage = document.querySelector('#secondpage');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    scroll.scrollTo(secondPage); // Locomotive handles the smooth scroll
  });
});

document.querySelector('#connect h3 i').addEventListener('click', () => {
    window.open("https://www.linkedin.com/in/ishant-kamboj-a1268519a/", "_blank"); 
});



/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("menuBtn").style.opacity = 0;
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";

  setTimeout(() => {
    document.getElementById("menuBtn").style.opacity = 1;
  }, 300); // 500 ms = 0.5s
}

document.getElementById("menuBtn").addEventListener("click", openNav);
document.getElementById("closebtn").addEventListener("click", closeNav);



function updateFooterTime() {
    const now = new Date();
    console.log(now);
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

  // Run once immediately
  updateFooterTime();
  // Update every minute
  setInterval(updateFooterTime, 60000);
