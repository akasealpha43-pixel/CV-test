document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. LOADER
    ========================================== */

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.visibility = "hidden";
            }, 500);
        });
    }

    /* ==========================================
       2. CURSEUR PERSONNALISÉ
    ========================================== */

    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");

    if (cursor && cursorDot && window.innerWidth > 768) {

        document.addEventListener("mousemove", (e) => {

            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;

        });

    }

    /* ==========================================
       3. MENU MOBILE
    ========================================== */

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                hamburger.classList.remove("active");
                navMenu.classList.remove("active");

            });

        });

    }

    /* ==========================================
       4. HEADER DYNAMIQUE
    ========================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

    /* ==========================================
       5. TEXTE DYNAMIQUE HERO
    ========================================== */

    const dynamicElement = document.getElementById("dynamic-element");

    if (dynamicElement) {

        const phrases = [
            "Étudiant en Génie Informatique",
            "Développeur Front-End",
            "UI/UX Designer",
            "Développeur Python",
            "Architecte de Bases de Données"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEngine() {

            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {

                dynamicElement.textContent =
                    currentPhrase.substring(0, charIndex - 1);

                charIndex--;

            } else {

                dynamicElement.textContent =
                    currentPhrase.substring(0, charIndex + 1);

                charIndex++;

            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {

                speed = 2000;
                isDeleting = true;

            } else if (isDeleting && charIndex === 0) {

                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 500;

            }

            setTimeout(typeEngine, speed);

        }

        typeEngine();

    }

    /* ==========================================
       6. BARRES DE COMPÉTENCES
    ========================================== */

    function triggerSkillAnimations() {

        const progressLines =
            document.querySelectorAll(".progress-line span");

        progressLines.forEach(line => {

            const targetWidth =
                line.parentElement.getAttribute("data-progress");

            line.style.width = targetWidth;

        });

    }

    const skillsSection = document.querySelector("#skills");

    if (skillsSection) {

        const observer = new IntersectionObserver((entries) => {

            if (entries[0].isIntersecting) {

                triggerSkillAnimations();

            }

        });

        observer.observe(skillsSection);

    }

    /* ==========================================
       7. GITHUB API
    ========================================== */

    async function fetchGitHubStats() {

        const targetContainer =
            document.getElementById("github-profile");

        if (!targetContainer) return;

        try {

            const response = await fetch(
                "https://api.github.com/users/akasealpha43-pixel"
            );

            if (!response.ok)
                throw new Error("GitHub indisponible");

            const data = await response.json();

            targetContainer.innerHTML = `
                <img src="${data.avatar_url}" 
                     alt="GitHub Profile" 
                     class="gh-avatar">

                <h3>@${data.login}</h3>

                <p>
                    ${data.bio || "Développeur Full Stack & UI Designer"}
                </p>

                <div class="gh-meta-grid">

                    <div>
                        <strong>${data.public_repos}</strong>
                        <p>Repositories</p>
                    </div>

                    <div>
                        <strong>${data.followers}</strong>
                        <p>Followers</p>
                    </div>

                </div>

                <a href="${data.html_url}"
                   target="_blank"
                   class="btn btn-secondary"
                   style="margin-top:20px;width:100%;justify-content:center;">
                   Voir mon GitHub
                </a>
            `;

        } catch (error) {

            targetContainer.innerHTML = `
                <i class="fab fa-github fa-3x"
                   style="color:var(--accent-blue);margin-bottom:20px;">
                </i>

                <h3>GitHub Indisponible</h3>

                <p>
                    Impossible de charger les statistiques GitHub.
                </p>

                <a href="https://github.com/akasealpha43-pixel"
                   target="_blank"
                   class="btn btn-primary"
                   style="margin-top:20px;">
                   Visiter GitHub
                </a>
            `;

        }

    }

    fetchGitHubStats();

    /* ==========================================
       8. FORMULAIRE
    ========================================== */

    const form = document.getElementById("portfolio-form");
    const successBanner = document.getElementById("form-success");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            let isValid = true;

            const fields =
                form.querySelectorAll("input, textarea");

            fields.forEach(field => {

                const group = field.parentElement;

                if (!field.value.trim()) {

                    group.classList.add("invalid");
                    isValid = false;

                } else if (
                    field.type === "email" &&
                    !validateEmail(field.value)
                ) {

                    group.classList.add("invalid");
                    isValid = false;

                } else {

                    group.classList.remove("invalid");

                }

            });

            if (isValid) {

                form.reset();

                successBanner.style.display = "block";

                setTimeout(() => {

                    successBanner.style.display = "none";

                }, 5000);

            }

        });

        form.querySelectorAll("input, textarea")
            .forEach(field => {

                field.addEventListener("input", () => {

                    field.parentElement
                        .classList.remove("invalid");

                });

            });

    }

    function validateEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }

    /* ==========================================
       9. ANNÉE AUTOMATIQUE
    ========================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

    /* ==========================================
       10. AOS
    ========================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            mirror: false
        });

    }

});