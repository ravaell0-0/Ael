// DOM Elements
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const navLinksItems = document.querySelectorAll(".nav-links a")
const header = document.querySelector("header")
const progressBars = document.querySelectorAll(".progress-bar")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const contactForm = document.getElementById("contactForm")

// Theme Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark")

  // Update icon
  const icon = themeToggle.querySelector("i")
  if (body.classList.contains("dark")) {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
    localStorage.setItem("theme", "dark")
  } else {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
    localStorage.setItem("theme", "light")
  }
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark")
  const icon = themeToggle.querySelector("i")
  icon.classList.remove("fa-moon")
  icon.classList.add("fa-sun")
}

// Mobile Navigation
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close mobile nav when clicking on a nav item
navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Sticky Header
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Animate skill bars when in viewport
  animateSkillBars()

  // Active nav link based on scroll position
  updateActiveNavLink()
})

// Animate skill bars when in viewport
function animateSkillBars() {
  progressBars.forEach((bar) => {
    const barPosition = bar.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3

    if (barPosition < screenPosition) {
      const width = bar.getAttribute("data-width")
      bar.style.width = width
    }
  })
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    const sectionId = section.getAttribute("id")

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinksItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${sectionId}`) {
          item.classList.add("active")
        }
      })
    }
  })
}

// Project Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((filterBtn) => {
      filterBtn.classList.remove("active")
    })

    // Add active class to clicked button
    btn.classList.add("active")

    const filterValue = btn.getAttribute("data-filter")

    projectCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Form Submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Simple form validation
  if (name && email && subject && message) {
    // In a real application, you would send this data to a server
    alert("Thank you for your message! I will get back to you soon.")
    contactForm.reset()
  } else {
    alert("Please fill in all fields.")
  }
})

// Initialize animations on page load
window.addEventListener("load", () => {
  // Initial check for skill bars in viewport
  animateSkillBars()

  // Initial active nav link
  updateActiveNavLink()
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      })
    }
  })
})

