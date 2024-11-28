// Redirect to login or signup page
function redirectToLogin() {
    window.location.href = "login.html"; // Change to your login/signup page URL
}

// Slideshow Logic
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    let currentSlide = 0;

    // Create dots for navigation
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    };

    const showSlide = (index) => {
        // Hide the current slide
        slides[currentSlide].classList.remove("visible");
        
        // Update the current slide
        currentSlide = index;

        // Show the new slide
        slides[currentSlide].classList.add("visible");
        
        // Update dots
        updateDots();
    };

    const showNextSlide = () => {
        // Hide the current slide
        slides[currentSlide].classList.remove("visible");

        // Move to the next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Show the next slide
        slides[currentSlide].classList.add("visible");

        // Update dots
        updateDots();

                // Check if we reached the last slide
                if (currentSlide < slides.length - 1) {
                    setTimeout(showNextSlide, 3000); // 3 seconds for regular slides
                } else {
                    // Do not proceed to the next slide after the last one
                    // Wait indefinitely on the last slide
                }
            };
        
            // Start the slideshow after the first slide
            setTimeout(showNextSlide, 3000); // Initial delay before showing the next slide
        
            // Initialize particles.js
            particlesJS("particles-js", {
                particles: {
                    number: {
                        value: 100,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        },
                        image: {
                            src: "img/github.svg",
                            width: 100,
                            height: 100
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "repulse"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        });
        