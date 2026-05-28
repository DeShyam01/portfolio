// Custom cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
const isTouchDevice =
  window.matchMedia("(hover: none), (pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

function disableCustomCursor() {
  cursor.style.display = "none";
  ring.style.display = "none";
  document.body.classList.add("touch-device");
  document.body.style.cursor = "auto";
}

function updateCursorPosition(x, y) {
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
  ring.style.left = x + "px";
  ring.style.top = y + "px";
}

if (!isTouchDevice) {
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    updateCursorPosition(mx, my);
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
} else {
  disableCustomCursor();
}

window.addEventListener("touchstart", disableCustomCursor, { once: true });

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Active nav highlight
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--accent)" : "";
  });
});
