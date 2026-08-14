/* =========================================================
   NISHANT KHANDELWAL — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       MOBILE NAVIGATION
    --------------------------------------------------------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    const closeMenu = () => {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    };

    const openMenu = () => {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");
    };

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        document.addEventListener("click", event => {

            const isMenuOpen =
                navLinks.classList.contains("active");

            if (!isMenuOpen) return;

            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }

        });


        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    /* ---------------------------------------------------------
       ACTIVE SECTION NAVIGATION
    --------------------------------------------------------- */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    if (sections.length && navigationLinks.length) {

        const linkMap = new Map();

        navigationLinks.forEach(link => {

            const target =
                link.getAttribute("href");

            if (target && target !== "#") {
                linkMap.set(target.substring(1), link);
            }

        });


        const setActiveLink = sectionId => {

            navigationLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink =
                linkMap.get(sectionId);

            if (activeLink) {
                activeLink.classList.add("active");
            }

        };


        const navObserver =
            new IntersectionObserver(
                entries => {

                    const visibleSections =
                        entries
                            .filter(entry => entry.isIntersecting)
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio
                            );

                    if (visibleSections.length) {
                        setActiveLink(
                            visibleSections[0].target.id
                        );
                    }

                },
                {
                    root: null,
                    rootMargin: "-25% 0px -60% 0px",
                    threshold: [0, 0.1, 0.25, 0.5]
                }
            );


        sections.forEach(section => {
            navObserver.observe(section);
        });

    }


    /* ---------------------------------------------------------
       SCROLL REVEAL
    --------------------------------------------------------- */

    const revealElements =
        document.querySelectorAll(
            [
                ".about-layout",
                ".experience-card",
                ".skill-card",
                ".focus-card",
                ".education-card",
                ".cert-card",
                ".case-study",
                ".project-cta",
                ".contact-wrapper"
            ].join(", ")
        );


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        revealElements.length &&
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        revealElements.forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(18px)";
            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

        });


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    rootMargin: "0px 0px -70px 0px",
                    threshold: 0.08
                }
            );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    /* ---------------------------------------------------------
       CURRENT YEAR
    --------------------------------------------------------- */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });


    /* ---------------------------------------------------------
       EXTERNAL LINK SAFETY
       Keeps dynamically added external links safe.
    --------------------------------------------------------- */

    document
        .querySelectorAll('a[target="_blank"]')
        .forEach(link => {

            const existingRel =
                link.getAttribute("rel") || "";

            const relValues =
                new Set(
                    existingRel
                        .split(/\s+/)
                        .filter(Boolean)
                );

            relValues.add("noopener");
            relValues.add("noreferrer");

            link.setAttribute(
                "rel",
                Array.from(relValues).join(" ")
            );

        });

});
