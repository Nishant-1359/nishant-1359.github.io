
// Portfolio Update 2
document.addEventListener("DOMContentLoaded",()=>{

// Active navigation highlighting
const sections=document.querySelectorAll("section");
const links=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{
 let current="";
 sections.forEach(sec=>{
   const top=sec.offsetTop-120;
   if(scrollY>=top){current=sec.id;}
 });
 links.forEach(link=>{
   link.classList.remove("active");
   if(link.getAttribute("href")==="#"+current){
      link.classList.add("active");
   }
 });
});

// Reveal animation
const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(entry.isIntersecting){
      entry.target.classList.add("visible");
   }
 });
},{threshold:0.15});

document.querySelectorAll("section,.card").forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});

});
