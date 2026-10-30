
 // MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navigationItems = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigationItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// HIGHLIGHT ACTIVE NAVIGATION SECTION

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navigationItems.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        { threshold: 0.45 }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// CONTACT FORM — EMAILJS
emailjs.init({
    publicKey: "8tu9Wrc3-49WvrBCK"
});

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm && formNote) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const button = contactForm.querySelector(".submit-btn");

        if (!button) return;

        button.disabled = true;
        button.textContent = "Sending...";

        try {
            await emailjs.sendForm(
                "service_968z9m6",
                "template_vgrdhdf",
                contactForm
            );

            formNote.textContent = "Message sent successfully!";
            contactForm.reset();
        } catch (error) {
            console.error("EmailJS error:", error);
            formNote.textContent =
                "Message could not be sent. Please try again.";
        } finally {
            button.disabled = false;
            button.textContent = "➤ Send Message";
        }
    });
}
