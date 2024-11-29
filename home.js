document.getElementById("theme-toggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");
});


document.addEventListener("DOMContentLoaded", () => {
    const linesContainer = document.querySelector(".animated-lines");

    // Create multiple lines dynamically
    for (let i = 0; i < 20; i++) {
        const line = document.createElement("div");
        line.classList.add("line");

        // Randomize initial position and delay
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;

        // Apply styles dynamically
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.animationDelay = `${delay}s`;

        linesContainer.appendChild(line);
    }
});
