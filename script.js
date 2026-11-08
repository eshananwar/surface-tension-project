// Smooth, accessible motion and interactive visual details.
const progress = document.getElementById('progress');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const glow = document.querySelector('.cursor-glow');

function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, {passive:true});
}

// A simplified, illustrative molecule arrangement. It is a teaching visual, not a scale model.
const field = document.getElementById('moleculeField');
if(field){
  const positions = [
    [7,16],[22,8],[38,19],[54,7],[71,18],[88,8],
    [15,43],[32,37],[48,48],[66,39],[82,48],
    [6,70],[23,66],[40,76],[58,66],[76,76],[92,67]
  ];
  positions.forEach(([x,y],i)=>{
    const dot=document.createElement('span');
    dot.className='molecule';
    dot.style.left=x+'%'; dot.style.top=y+'%';
    dot.style.animationDelay=(i*.17)+'s';
    field.appendChild(dot);
  });
}

// Pepper flecks are moved outwards in a repeating visual metaphor for the soap demonstration.
const pepper = document.getElementById('pepperSpecks');
if(pepper){
  for(let i=0;i<44;i++){
    const speck=document.createElement('i');
    speck.className='pepper-speck';
    const angle=Math.random()*Math.PI*2;
    const radius=18+Math.random()*90;
    speck.style.left=(50+Math.cos(angle)*radius/2)+'%';
    speck.style.top=(48+Math.sin(angle)*radius/2)+'%';
    speck.style.animation=`pepperMove ${2.5+Math.random()*2}s ease-in-out ${Math.random()*2}s infinite alternate`;
    pepper.appendChild(speck);
  }
  const style=document.createElement('style');
  style.textContent='@keyframes pepperMove{to{transform:translate(var(--dx,18px),var(--dy,-12px)) scale(.8);opacity:.65}}';
  document.head.appendChild(style);
}
