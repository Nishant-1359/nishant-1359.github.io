const btn=document.createElement('button');
btn.innerHTML='↑';
btn.id='scrollTop';
document.body.appendChild(btn);

window.addEventListener('scroll',()=>{
btn.style.display=window.scrollY>400?'block':'none';
});

btn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

// Reveal animation
const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting)e.target.classList.add('show');
});
},{threshold:.15});

document.querySelectorAll('section,.project-card,.skill-card,.edu-card,.cert-card,.timeline-content,.github-card').forEach(el=>{
el.classList.add('hidden');
observer.observe(el);
});
