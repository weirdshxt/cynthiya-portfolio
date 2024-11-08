const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

let timeout;

function loader(){
  let load = document.querySelector("#loader")

  gsap.to("#loader",{
    top:"-100%",
    duration: 1.3,
    delay:0.5
  })

  setTimeout(()=>{
    load.style.display="none";
  },1700)
}

function mouseFollower() {
  let xsc = 1;
  let ysc = 1;

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xsc = gsap.utils.clamp(0.6, 1.2, dets.clientX - mouseX);
    ysc = gsap.utils.clamp(0.6, 1.2, dets.clientY - mouseY);

    mouseX = dets.clientX;
    mouseY = dets.clientY;

    cursorMove(xsc, ysc);

    timeout = setTimeout(() => {
      document.querySelector(
        "#cursor"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function cursorMove(xsc, ysc) {
 
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#cursor"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xsc}, ${ysc})`;
  });
}

function boundTextAnimation() {
  loader();

  let tl = gsap.timeline();

  tl.from("#hero",{
    opacity: 0,
    duration: 1,
    delay: 0.1,
    ease: "power2.inOut",
  })

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: "expo.inOut",
  });
  tl.to(".bound-text", {
    y: "0",
    duration: 1,
    delay: -0.5,
    stagger: 0.1,
    ease: "expo.inOut",
  });
  tl.from("#hero-footer ", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: "expo.inOut",
  });
}

function handleCursorVisibility() {
  let cursorTimeout;
  const cursor = document.querySelector("#cursor");

  // Cursor movement handler
  window.addEventListener("mousemove", function () {
    clearTimeout(cursorTimeout);
    cursor.style.display = "block";

    cursorTimeout = setTimeout(() => {
      cursor.style.display = "none";
    }, 100); // 3 seconds of inactivity
  });

  // Window blur handler
  window.addEventListener("blur", function () {
    cursor.style.display = "none";
  });

  // Window focus handler
  window.addEventListener("focus", function () {
    cursor.style.display = "block";
  });
}

cursorMove();
mouseFollower();
boundTextAnimation();
handleCursorVisibility(); 


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
