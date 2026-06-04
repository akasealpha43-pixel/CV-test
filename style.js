document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SUPPRESSION DU LOADER ( PERFORMANCE METRIC )
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.visibility = "hidden", 500);
        // Activation de la ligne de progression des compétences après le chargement
        triggerSkillAnimations();
    });

    // 2. INITIALISATION ET CONFIGURATION DU CURSEUR LOGICIEL
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");
    
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
    });

    // 3. GESTION DU MENU MOBILE (HAMBURGER ACTION)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // 4. ANIMATION DE TEXTE DYNAMIQUE (HERO SECTION)
    const dynamicElement = document.getElementById("dynamic-element");
    const phrases = [
        "Étudiant en Génie Informatique",
        "Développeur Front-End",
        "UI/UX Designer"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEngine() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            dynamicElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause à la fin du mot
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause avant de retaper
        }

        setTimeout(typeEngine, typeSpeed);
    }
    typeEngine();

    // 5. ANIMATION DES COMPÉTENCES ET BARRES DE PROGRESSION
    function triggerSkillAnimations() {
        const progressLines = document.querySelectorAll(".progress-line span");
        progressLines.forEach(line => {
            const parent = line.parentElement;
            const targetWidth = parent.getAttribute("data-progress");
            line.style.width = targetWidth;
        });
    }

    // 6. SYNCHRONISATION ASYNCHRONE AVEC L'API GITHUB
    // Note : Utilisation d'un profil générique de simulation pour ALPHA HARUN
    async function fetchGitHubStats() {
        const targetContainer = document.getElementById("github-profile");
        try {
            // Remplacer 'octocat' par ton identifiant GitHub réel pour l'intégration finale
            const response = await fetch("https://api.github.com/users/octocat");
            if (!response.ok) throw new Error("Ressource indisponible");
            const data = await response.json();
            
            targetContainer.innerHTML = `
                <img src="${data.avatar_url}" alt="Alpha Harun Profile" class="gh-avatar">
                <h3>@${data.login} on GitHub</h3>
                <p>${data.bio || "Développeur & Concepteur logiciel en Génie Informatique"}</p>
                <div class="gh-meta-grid">
                    <div><strong>${data.public_repos}</strong><p>Dépôts Publics</p></div>
                    <div><strong>${data.followers}</strong><p>Abonnés</p></div>
                </div>
                <a href="${data.html_url}" target="_blank" class="btn btn-secondary" style="margin-top:20px; width:100%; justify-content:center;">Visiter le Profil Absolu</a>
            `;
        } catch (error) {
            targetContainer.innerHTML = `
                <i class="fab fa-github fa-3x" style="color:var(--accent-blue); margin-bottom:15px;"></i>
                <h3>Écosystème Git Localisé</h3>
                <p>Données GitHub hors-ligne. Consultez mon espace de code partagé en direct.</p>
                <a href="https://github.com" target="_blank" class="btn btn-primary" style="margin-top:20px;">Accéder à GitHub</a>
            `;
        }
    }
    fetchGitHubStats();

    // 7. MOTEUR DE VALIDATION DU FORMULAIRE DE CONTACT
    const form = document.getElementById("portfolio-form");
    const successBanner = document.getElementById("form-success");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isFormValid = true;

        const inputs = form.querySelectorAll("input, textarea");
        
        inputs.forEach(input => {
            const group = input.parentElement;
            if (!input.value.trim()) {
                group.classList.add("invalid");
                isFormValid = false;
            } else if (input.type === "email" && !validateEmail(input.value)) {
                group.classList.add("invalid");
                isFormValid = false;
            } else {
                group.classList.remove("invalid");
            }
        });

        if (isFormValid) {
            form.style.display = "none";
            successBanner.style.display = "block";
            // L'intégration du service d'envoi (ex: FormSpree ou Supabase edge functions) s'insère ici.
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Suppression des classes d'erreur lors de la saisie utilisateur
    form.querySelectorAll("input, textarea").forEach(element => {
        element.addEventListener("input", () => {
            if (element.value.trim()) {
                element.parentElement.classList.remove("invalid");
            }
        });
    });

    // 8. INITIALISATION DU MODULE AOS (ANIMATION ON SCROLL)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
    });
});