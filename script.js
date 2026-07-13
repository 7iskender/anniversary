/* CUSTOMIZE THIS OBJECT: replace names, dates, photo paths, captions, messages, and music. */
const anniversaryData = {
  coupleNames: "[YOUR NAME] + [HER NAME]",
  anniversaryDate: "[YOUR ANNIVERSARY DATE]",
  openingMessage: "",
  heroPhoto: "assets/photos/hero-placeholder.svg",
  heroMessage: "Somehow, all the ordinary days with you became the memories I never want to lose.",
  memories: [
    ["How we met", "[DATE/LABEL]", "CUSTOMIZE: Write the moment your story began.", ["assets/photos/memory-1.svg"], "01"],
    ["Our first date", "[DATE/LABEL]", "CUSTOMIZE: Add the tiny details you still remember.", ["assets/photos/memory-2.svg"], "02"],
    ["The laugh we still remember", "[DATE/LABEL]", "CUSTOMIZE: The joke that still makes you both laugh.", ["assets/photos/memory-3.svg"], "03"],
    ["A meal we loved", "[DATE/LABEL]", "CUSTOMIZE: Tell the story of a food date.", ["assets/photos/memory-4.svg"], "04"],
    ["A place we went", "[DATE/LABEL]", "CUSTOMIZE: Describe the place that felt like an adventure.", ["assets/photos/memory-5.svg"], "05"],
    ["An ordinary day", "[DATE/LABEL]", "CUSTOMIZE: Celebrate the quiet comfort.", ["assets/photos/memory-6.svg"], "06"],
    ["Something we got through", "[DATE/LABEL]", "CUSTOMIZE: Honor how you chose each other.", ["assets/photos/memory-7.svg"], "07"],
    ["What I notice about you", "Always", "CUSTOMIZE: Be specific, soft, and honest.", ["assets/photos/memory-8.svg"], "08"],
    ["What I hope for", "Tomorrow + after", "CUSTOMIZE: Dream out loud here.", ["assets/photos/memory-9.svg"], "09"]
  ],
  photoStrips: [
    { caption: "Four frames from one day.", photos: ["assets/photos/strip-1a.svg","assets/photos/strip-1b.svg","assets/photos/strip-1c.svg","assets/photos/strip-1d.svg"] },
    { caption: "A strip for the small stuff.", photos: ["assets/photos/strip-2a.svg","assets/photos/strip-2b.svg","assets/photos/strip-2c.svg","assets/photos/strip-2d.svg"] },
    { caption: "The version I keep replaying.", photos: ["assets/photos/strip-3a.svg","assets/photos/strip-3b.svg","assets/photos/strip-3c.svg","assets/photos/strip-3d.svg"] }
  ],
  reasonsILoveYou: ["The way you make ordinary days feel exciting.","How safe and understood I feel with you.","Your laugh.","Your kindness.","The way you care about the people you love.","Every weird little joke we share.","Your patience with me.","Your curiosity.","The way you light up around things you love.","Your soft heart.","How adventures feel better with you.","Because home feels like wherever you are."],
  loveLetter: "My love,\n\nLooking through these memories reminded me that my favorite part of every adventure has always been sharing it with you. Thank you for the laughter, the comfort, the food dates, the quiet moments, and all the strange little things that have become ours.\n\nI hope this is only the beginning of the collection.\n\nHappy anniversary.\n\nLove,\n[YOUR NAME]",
  finalMessage: "I would choose every version of this adventure, as long as it has you in it.",
  musicPath: "assets/audio/our-song.mp3",
  firstDateStops: {
    princeton: {
      title: "Where we sat",
      text: "CUSTOMIZE: I picked you up, we went to Princeton, sat together, and I somehow tried to poke the matcha lid with the straw so confidently that it spilled on both of our shirts.",
      photo: "assets/photos/princeton-bench-placeholder.svg",
      art: "princeton"
    },
    turkish: {
      title: "The chocolate stop",
      text: "CUSTOMIZE: We stopped for chocolate for you to try. Add the candy wrapper photo or storefront here.",
      photo: "assets/photos/turkish-store-placeholder.svg",
      art: "store"
    },
    asian: {
      title: "The next little stop",
      text: "CUSTOMIZE: Add what you bought, what aisle you remember, or the tiny thing that made this stop ours.",
      photo: "assets/photos/asian-store-placeholder.svg",
      art: "asian"
    },
    mercer: {
      title: "The sunset",
      text: "CUSTOMIZE: We went north to Mercer Park and the sun was setting. It was calm and lovely.",
      photo: "assets/photos/mercer-sunset-placeholder.svg",
      art: "sunset"
    }
  }
};

const $ = (s, root=document) => root.querySelector(s); const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasAnime = () => window.anime && !reduced;

function sceneMarkup(stop){
  const art = {
    princeton: `<div class="scene-art princeton-art"><div class="stone-building"></div><div class="bench"></div><div class="matcha-spill"></div></div>`,
    store: `<div class="scene-art store-art"><div class="store-awning"></div><div class="shelves"></div><div class="chocolate-bar"></div></div>`,
    asian: `<div class="scene-art asian-art"><div class="store-awning green"></div><div class="shelves tall"></div><div class="basket"></div></div>`,
    sunset: `<div class="scene-art sunset-art"><div class="sun"></div><div class="lake"></div><div class="park-bench"></div></div>`
  }[stop.art];
  return `<div class="route-scene-grid">${art}<div class="scene-copy"><p class="eyebrow">First date stop</p><h3>${stop.title}</h3><p>${stop.text}</p><img src="${stop.photo}" loading="lazy" alt="CUSTOMIZE: ${stop.title} photo placeholder" width="520" height="360"></div></div>`;
}
function updateRouteProgress(key){
  const path = $('#firstDateTrailProgress');
  if(!path) return;
  const stopIndex = ['princeton', 'turkish', 'asian', 'mercer'].indexOf(key);
  const visibleRatio = [0.12, 0.43, 0.68, 1][Math.max(0, stopIndex)];
  const totalLength = path.getTotalLength();
  path.style.strokeDasharray = totalLength;
  const offset = totalLength * (1 - visibleRatio);
  if(hasAnime()) {
    anime({ targets: path, strokeDashoffset: offset, duration: 850, easing: 'easeInOutCubic' });
  } else {
    path.style.strokeDashoffset = offset;
  }
}
function showRouteStop(key){
  const stop = anniversaryData.firstDateStops[key] || anniversaryData.firstDateStops.princeton;
  $('#routeScene').innerHTML = sceneMarkup(stop);
  $$('.route-dot').forEach(dot => dot.classList.toggle('active', dot.dataset.stop === key));
  updateRouteProgress(key);
  if(hasAnime()) anime({targets:'#routeScene', opacity:[0,1], translateY:[16,0], duration:420, easing:'easeOutCubic'});
}
function bindTabs(){
  $$('.tab-button').forEach(button => button.addEventListener('click', () => {
    $$('.tab-button').forEach(b => b.classList.toggle('active', b === button));
    $$('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === button.dataset.tabTarget));
    document.querySelector(`#${button.dataset.tabTarget}`).scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block: 'start'});
  }));
}

function setContent(){
  document.title = `${anniversaryData.coupleNames}’s Little Memory Booth`;
  $('[data-content="coupleNames"]').textContent = anniversaryData.coupleNames;
  $('[data-content="anniversaryDate"]').textContent = anniversaryData.anniversaryDate;
  $('[data-content="heroMessage"]').textContent = anniversaryData.heroMessage;
  $('[data-content="finalMessage"]').textContent = anniversaryData.finalMessage;
  $('#heroPhoto').src = anniversaryData.heroPhoto; $('#bgMusic').src = anniversaryData.musicPath;
  $('#loveLetter').textContent = anniversaryData.loveLetter;
}
function buildTimeline(){ $('#timeline').innerHTML = anniversaryData.memories.map((m,i)=>`<article class="memory-card reveal" tabindex="0"><span class="tape"></span><p class="eyebrow">${m[1]}</p><h3>${m[4]} ${m[0]}</h3><div class="memory-photos">${m[3].map((p,n)=>`<img loading="lazy" src="${p}" alt="CUSTOMIZE: ${m[0]} photo ${n+1}" width="360" height="360">`).join('')}</div><p>${m[2]}</p><svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true"><path class="heart-path" d="M40 52 C 10 32, 8 10, 28 10 C 35 10, 39 17, 40 19 C 41 17, 45 10, 52 10 C 72 10, 70 32, 40 52" fill="none" stroke="#e65d7c" stroke-width="4"/></svg></article>`).join(''); }
function buildGallery(){ $('#photoStrips').innerHTML = anniversaryData.photoStrips.map((strip,i)=>`<button class="photo-strip" type="button" aria-label="Open photo strip ${i+1}">${strip.photos.map((p,n)=>`<img loading="lazy" src="${p}" alt="CUSTOMIZE: photo strip ${i+1}, photo ${n+1}" width="360" height="270">`).join('')}<span class="strip-caption">${strip.caption}</span></button>`).join(''); }
function buildReasons(){ const sky = $('#reasonSky'); if(!sky) return; sky.innerHTML = anniversaryData.reasonsILoveYou.map((r,i)=>`<button class="reason" type="button"><span class="reason-dot">${String(i + 1).padStart(2, '0')}</span><span>${r}</span></button>`).join(''); }
function splitIntro(){ const h=$('[data-split]'); if(!h) return; h.innerHTML=[...anniversaryData.openingMessage].map(ch=>`<span>${ch===' '?'&nbsp;':ch}</span>`).join(''); }

function introAnimations(){ if(!hasAnime()){document.body.classList.add('ready');return} anime({targets:'.cloud-one',translateX:['-10vw','80vw'],duration:38000,loop:true,easing:'linear'}); anime({targets:'.cloud-two',translateX:['20vw','-80vw'],duration:46000,loop:true,easing:'linear'}); anime({targets:'.monkey-face',rotate:[-8,8],duration:1800,direction:'alternate',loop:true,easing:'easeInOutSine'}); anime({targets:'.intro-heading span',opacity:[0,1],translateY:[12,0],delay:anime.stagger(26),easing:'easeOutQuad'}); anime({targets:'.duck-left',translateX:[-220,0],translateY:[0,-8,0],duration:1800,easing:'easeOutElastic(1,.7)'}); anime({targets:'.duck-right',translateX:[220,0],translateY:[0,-8,0],duration:1800,easing:'easeOutElastic(1,.7)',complete:()=>anime({targets:'.heart-between',opacity:[0,1],translateY:[10,-8],duration:700})}); anime({targets:'#openBooth',scale:[1,1.045],duration:1100,direction:'alternate',loop:true,easing:'easeInOutSine'}); }
function openBooth(){
  document.body.classList.add('ready');
  if(hasAnime()){
    anime.timeline({easing:'easeInOutCubic'}).add({targets:'.curtain-left',translateX:'-105%',duration:900}).add({targets:'.curtain-right',translateX:'105%',duration:900},0).add({targets:'#intro',opacity:0,duration:700,complete:()=>$('#intro').classList.add('is-open')},350).add({targets:'main',opacity:[0,1],duration:600},500).add({targets:'.developing img',filter:['blur(18px) saturate(.2)','blur(0px) saturate(1)'],translateY:[-40,0],opacity:[.55,1],duration:1200},700).add({targets:'.flash',opacity:[0,.55,0],duration:700},900);
  } else {
    const left = $('.curtain-left');
    const right = $('.curtain-right');
    const intro = $('#intro');
    if(!reduced && left?.animate && right?.animate){
      left.animate([{transform:'translateX(0)'},{transform:'translateX(-105%)'}],{duration:850,easing:'ease-in-out',fill:'forwards'});
      right.animate([{transform:'translateX(0)'},{transform:'translateX(105%)'}],{duration:850,easing:'ease-in-out',fill:'forwards'});
      setTimeout(()=>intro.classList.add('is-open'), 760);
    } else {
      intro.classList.add('is-open');
    }
    const heroImage = $('.developing img');
    if(heroImage?.animate && !reduced){
      heroImage.animate([{filter:'blur(18px) saturate(.2)',transform:'translateY(-40px)',opacity:.55},{filter:'blur(0) saturate(1)',transform:'translateY(0)',opacity:1}],{duration:1000,easing:'ease-out',fill:'forwards'});
    }
  }
  $('#hero').scrollIntoView({behavior:reduced?'auto':'smooth'});
}
function observe(){ const io=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); if(hasAnime()) anime({targets:e.target,opacity:[0,1],translateY:[40,0],duration:750,easing:'easeOutCubic'}); animateSpecial(e.target); }}),{threshold:.18}); $$('.reveal,.memory-card').forEach(el=>io.observe(el)); }
function animateSpecial(el){ if(!hasAnime())return; if(el.classList.contains('letter-section')) anime({targets:'#envelope',translateY:[20,-8,0],duration:1200,easing:'easeOutElastic(1,.8)'}); if(el.classList.contains('food-section')) anime({targets:'.banh-mi > div',translateY:[-40,0],opacity:[0,1],delay:anime.stagger(130),easing:'easeOutBack'}); }
function modal(title, html){ $('#modalTitle').textContent=title; $('#modalContent').innerHTML=html; $('#modal').hidden=false; $('#closeModal').focus(); }
function bind(){ bindTabs(); $$('.route-dot').forEach(dot=>dot.addEventListener('click',()=>{ showRouteStop(dot.dataset.stop); burstFromButton(dot); })); $('#openBooth').addEventListener('click',openBooth); $('#replay').addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduced?'auto':'smooth'}); $('#intro').classList.remove('is-open'); document.body.classList.remove('ready'); introAnimations();}); $('#closeModal').onclick=()=>$('#modal').hidden=true; $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').hidden=true}); addEventListener('keydown',e=>{ if(e.key==='Escape')$('#modal').hidden=true; loveCode(e.key); });
  $$('.egg-duck').forEach(d=>d.addEventListener('click',e=>{ const q=document.createElement('span'); q.className='quack'; q.textContent='quack!'; q.style.left=e.clientX+'px'; q.style.top=e.clientY+'px'; document.body.append(q); setTimeout(()=>q.remove(),900); if(hasAnime()) anime({targets:d, translateY:[0,-10,0], rotate:[0,-5,5,0], duration:520, easing:'easeOutBack'}); }));
  $('.monkey').addEventListener('click',()=>hasAnime()&&anime({targets:'.monkey-face',rotate:[0,-10,10,0],translateY:[0,-8,0],duration:650,easing:'easeOutBack'})); $('.monkey').addEventListener('mouseenter',()=>hasAnime()&&anime({targets:'.monkey-face',translateX:[0,10,0],duration:500}));
  $('#envelope').onclick=()=>{ $('#loveLetter').classList.toggle('open'); $('#envelope').setAttribute('aria-expanded',$('#loveLetter').classList.contains('open')); $('#loveLetter').focus(); };
  $('.peel-corner').onclick=()=>$('.private-caption').style.display='block'; $('#shuffleStrips').onclick=()=>{ $('#flash').animate([{opacity:0},{opacity:.7},{opacity:0}],{duration:450}); const g=$('#photoStrips'); [...g.children].sort(()=>Math.random()-.5).forEach(n=>g.append(n)); };
  $('#photoStrips').addEventListener('click',e=>{ const strip=e.target.closest('.photo-strip'); if(strip) modal('Photo strip', strip.innerHTML); });
  const reasonSky = $('#reasonSky'); if(reasonSky) reasonSky.addEventListener('click',e=>{ const r=e.target.closest('.reason'); if(r) r.classList.toggle('open'); }); musicControls(); dragChocolate(); }
let seq=''; function loveCode(k){ seq=(seq+k.toUpperCase()).slice(-4); if(seq==='LOVE') burstHearts(); }

function burstFromButton(button){
  if(reduced) return;
  button.classList.remove('bursting');
  void button.offsetWidth;
  button.classList.add('bursting');
  setTimeout(()=>button.classList.remove('bursting'), 700);
  const container = button.querySelector('.particles-container');
  const bubble = button.querySelector('.bubble');
  if(!container || container.dataset.busy === 'true') return;
  container.dataset.busy = 'true';
  const colors = ['#e07d7d','#ffbb8e','#ffeda3','#7c7ce2','#e5b0ff','#97e797'];
  for(let i=0;i<28;i++){
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.background = colors[i % colors.length];
    container.append(particle);
    const angle = (i / 28) * Math.PI * 2 + Math.random() * .35;
    const distance = 55 + Math.random() * 80;
    particle.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle)*distance}px), calc(-50% + ${Math.sin(angle)*distance}px)) scale(0)`, opacity: 0 }
    ], { duration: 850 + Math.random()*360, easing: 'cubic-bezier(0, .7, 0, 1)' }).onfinish = () => particle.remove();
  }
  bubble?.animate([
    { transform:'translate(-50%, -50%) scale(.35)', opacity:.55, borderWidth:'0px' },
    { transform:'translate(-50%, -50%) scale(1.35)', opacity:0, borderWidth:'4px' }
  ], { duration: 760, easing:'ease-out' });
  setTimeout(()=>{ container.dataset.busy = 'false'; }, 950);
}
function burstHearts(){ for(let i=0;i<24;i++){ const h=document.createElement('span'); h.textContent='♥'; h.style.cssText=`position:fixed;left:50%;top:50%;color:#e65d7c;z-index:70;pointer-events:none`; document.body.append(h); h.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${(Math.random()-.5)*500}px,${(Math.random()-.5)*400}px)`,opacity:0}],{duration:1100,easing:'ease-out'}).onfinish=()=>h.remove(); }}
function musicControls(){ const audio=$('#bgMusic'), vol=$('#musicVolume'), toggle=$('#musicToggle'), mute=$('#muteToggle'); vol.value=sessionStorage.memoryBoothVolume||.55; audio.volume=vol.value; toggle.onclick=()=> audio.paused ? audio.play().then(()=>toggle.textContent='Pause our song').catch(()=>modal('Music note','Add your audio file at assets/audio/our-song.mp3, then try again.')) : (audio.pause(),toggle.textContent='Play our song'); vol.oninput=()=>{audio.volume=vol.value;sessionStorage.memoryBoothVolume=vol.value}; mute.onclick=()=>{audio.muted=!audio.muted;mute.textContent=audio.muted?'Unmute':'Mute';mute.setAttribute('aria-pressed',audio.muted)}; }
function dragChocolate(){ const ch=$('#chocolate'), cup=$('.cup'); ch.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain','chocolate')); cup.addEventListener('dragover',e=>e.preventDefault()); cup.addEventListener('drop',()=>modal('Cozy secret','Chocolate + matcha unlocked. Better together, obviously.')); }
function finalStars(){ const box=$('#finalStars'); for(let i=0;i<38;i++){ const s=document.createElement('span'); s.textContent='✦'; s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*70+'%'; s.style.animationDelay=Math.random()*4+'s'; box.append(s); }}
function init(){ setContent(); splitIntro(); buildTimeline(); buildGallery(); buildReasons(); finalStars(); bind(); showRouteStop("princeton"); observe(); introAnimations(); }
document.addEventListener('DOMContentLoaded', init);
