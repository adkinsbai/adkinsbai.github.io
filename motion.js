(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.querySelector('.motion-toggle');
  const hero = document.querySelector('.hero');
  const lab = document.querySelector('.hero-lab');
  const featured = document.querySelector('.featured');
  const journey = document.querySelector('.journey');
  const track = document.querySelector('.journey-track');
  const canvas = document.querySelector('.signal-core');
  const ctx = canvas.getContext('2d');
  let paused = reduce.matches, visible = true, raf = 0, last = 0, phase = 0, px = 0, py = 0, dirty = true;
  let width = 0, height = 0, color = [150,244,225];
  const clamp = (x,a=0,b=1) => Math.max(a, Math.min(b,x));
  function syncToggle() {
    document.body.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.querySelector('span').textContent = paused ? '开启动效' : '暂停动效';
  }
  toggle.addEventListener('click',()=>{paused=!paused;syncToggle();dirty=true;wake()});
  reduce.addEventListener('change',()=>{paused=reduce.matches;syncToggle();dirty=true;wake()});
  syncToggle();
  function resize() {
    const r=canvas.getBoundingClientRect();width=r.width;height=r.height;
    const dpr=Math.min(devicePixelRatio||1,1.7);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);dirty=true;wake();
  }
  function project(x,y,z,t) {
    const cy=Math.cos(t),sy=Math.sin(t),cx=Math.cos(.5+py*.18),sx=Math.sin(.5+py*.18);
    const a=x*cy-z*sy,b=x*sy+z*cy,c=y*cx-b*sx,d=y*sx+b*cx;
    const depth=440/(440+d);const scale=Math.min(width,height)*.32;
    return [width*.5+a*scale*depth,height*.5+c*scale*depth,clamp((d+1.8)/3.6),depth];
  }
  function draw() {
    ctx.clearRect(0,0,width,height);if(!width||!height)return;
    const t=phase*.16+px*.2;const rings=innerWidth<760?16:23,steps=64;
    const [r,g,b]=color;
    const halo=ctx.createRadialGradient(width*.5,height*.48,3,width*.5,height*.5,height*.48);
    halo.addColorStop(0,`rgba(${r},${g},${b},.07)`);halo.addColorStop(1,`rgba(${r},${g},${b},0)`);ctx.fillStyle=halo;ctx.fillRect(0,0,width,height);
    for(let j=0;j<rings;j++){
      const v=j/rings*Math.PI*2;ctx.beginPath();let depth=0;
      for(let i=0;i<=steps;i++){
        const u=i/steps*Math.PI*2;
        const radius=.83+.26*Math.cos(v);const p=project(radius*Math.cos(u),.26*Math.sin(v),radius*Math.sin(u),t);
        depth+=p[2];if(i===0)ctx.moveTo(p[0],p[1]);else ctx.lineTo(p[0],p[1]);
      }
      ctx.strokeStyle=`rgba(${r},${g},${b},${.08+.21*(1-depth/(steps+1))})`;ctx.lineWidth=j%5===0?1:.6;ctx.stroke();
    }
    for(let j=0;j<32;j++){
      const u=j/32*Math.PI*2+phase*.24,v=phase*.4+j*1.73;
      const p=project((.83+.26*Math.cos(v))*Math.cos(u),.26*Math.sin(v),(.83+.26*Math.cos(v))*Math.sin(u),t);
      ctx.beginPath();ctx.arc(p[0],p[1],j%6===0?1.9:1,0,Math.PI*2);ctx.fillStyle=`rgba(${r},${g},${b},${.28+.45*(1-p[2])})`;ctx.fill();
    }
  }
  function updateScroll() {
    journey.querySelector('.journey-heading p').textContent = innerWidth <= 760 || paused ? '左右滑动，探索三种产品场景。' : '向下滚动，走进三种产品场景。';
    const scroll=scrollY,max=document.documentElement.scrollHeight-innerHeight;
    document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?scroll/max:0})`;
    document.querySelector('.nav').classList.toggle('scrolled',scroll>35);
    hero.style.setProperty('--hero-exit',clamp(scroll/Math.max(1,hero.offsetHeight)));
    const r=featured.getBoundingClientRect();featured.style.setProperty('--product-reveal',clamp((innerHeight-r.top)/(innerHeight*.9)));
    if(journey && innerWidth>760 && !paused){
      const j=journey.getBoundingClientRect();const progress=clamp((110-j.top)/(journey.offsetHeight-innerHeight*.65));
      const travel=Math.max(0,track.scrollWidth-journey.clientWidth);
      journey.style.setProperty('--journey-x',`${-travel*progress}px`);journey.style.setProperty('--journey-progress',progress);
    }
  }
  function tick(now) {
    raf=0;if(document.hidden)return;
    if(dirty){updateScroll();dirty=false;}
    if(visible && !paused && now-last>32){phase+=Math.min((now-last)/1000,.05);last=now;draw();}
    if(visible&&!paused)raf=requestAnimationFrame(tick);
  }
  function wake(){if(!raf&&!document.hidden)raf=requestAnimationFrame(tick);if(paused)draw();}
  addEventListener('scroll',()=>{dirty=true;wake()},{passive:true});
  addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else{last=performance.now();dirty=true;wake()}});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){last=performance.now();wake()}else{cancelAnimationFrame(raf);raf=0}},{rootMargin:'80px'}).observe(lab);
  const reveal = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('entered');reveal.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.section-heading,.featured,.project,.method-title,.method-lines article,.about').forEach(el=>{el.classList.add('scroll-reveal');reveal.observe(el)});
  const nav=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.nav a[href^="#"]').forEach(a=>{if(a.getAttribute('href')==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}),{rootMargin:'-20% 0px -55% 0px'});
  document.querySelectorAll('main>section[id]').forEach(el=>nav.observe(el));
  [lab,featured].forEach(el=>{el.addEventListener('pointermove',e=>{if(!fine.matches||paused)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.setProperty('--light-x',x*100+'%');el.style.setProperty('--light-y',y*100+'%');if(el===lab){px=x-.5;py=y-.5;el.style.setProperty('--tilt-x',px);el.style.setProperty('--tilt-y',py)}},{passive:true});el.addEventListener('pointerleave',()=>{el.style.setProperty('--tilt-x',0);el.style.setProperty('--tilt-y',0);px=py=0})});
  document.querySelectorAll('[role=tab]').forEach(tab=>tab.addEventListener('click',()=>{color=tab.dataset.product==='type'?[158,191,255]:tab.dataset.product==='trace'?[214,233,185]:[150,244,225];draw()}));
  new ResizeObserver(resize).observe(canvas);resize();draw();wake();
})();
