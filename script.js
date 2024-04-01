gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();






const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});





function cursorEffect() {
    const page1Content = document.querySelector("#page1-content")
    const cursor = document.querySelector("#cursor")

    page1Content.addEventListener("mousemove", (dets) => {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y
        })
    })

    page1Content.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })

    page1Content.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        })
    })
}

cursorEffect()


const timeline = gsap.timeline()

timeline.from("#loader h3", {
    x:40,
    opacity:0,
    duration:1,
    stagger:0.1,

})

timeline.to("#loader h3", {
    opacity:0,
    x:-20,
    duration:1,
    stagger:0.1
})

timeline.to("#loader", {
    opacity:0,
    display: "none"
})

timeline.from("#page1-content h1 span", {
    y:20,
    opacity:0,
    stagger:0.09,
    duration:0.5,
    delay:-0.5
})