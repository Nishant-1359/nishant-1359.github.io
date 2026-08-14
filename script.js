const btn=document.createElement('button');
btn.innerHTML='↑';
btn.id='scrollTop';
document.body.appendChild(btn);

window.addEventListener('scroll',()=>{
btn.style.display=window.scrollY>400?'block':'none';
});

btn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}

/* ========================================
   ACTIVE NAVIGATION
======================================== */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a[href^='#']");

if (sections.length && navigationLinks.length) {

    const navObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach(section => {
        navObserver.observe(section);
    });

}

// Reveal animation
const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting)e.target.classList.add('show');
});
},{threshold:.15});

document.querySelectorAll(
'.project-card,.skill-card,.edu-card,.cert-card,.timeline-content,.github-card').forEach(el=>{
el.classList.add('hidden');
observer.observe(el);
});
