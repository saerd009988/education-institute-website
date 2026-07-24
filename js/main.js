/* Shivalik Institute of Technology & Management — main.js */

(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Header shadow on scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll (respects reduced motion) */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* Enquiry form */
  var form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var success = document.getElementById("formSuccess");
      if (success) {
        var name = form.querySelector("#fieldName");
        success.textContent =
          "Thank you" + (name && name.value ? ", " + name.value.trim() : "") +
          ". Your enquiry has been received — the admissions office will contact you within two working days.";
        success.classList.add("is-visible");
      }
      form.reset();
    });
  }

  /* Footer year */
  var yearEl = document.getElementById("footerYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
