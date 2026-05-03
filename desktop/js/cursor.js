(() => {
  const LERP        = 0.18;
  const SPRING_K    = 0.20;
  const SPRING_DAMP = 0.60;
  const JIG_K       = 0.26;
  const JIG_DAMP    = 0.56;
  const R           = 12;

  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }
    #_cv {
      position: fixed; top: 0; left: 0;
      width: 1px; height: 1px;
      overflow: visible;
      pointer-events: none;
      z-index: 2147483647;
    }
    #_cp {
      fill: rgba(255,255,255,0.15);
      stroke: rgba(255,255,255,0.72);
      stroke-width: 1.5;
    }
    #_ca {
      position: fixed; width: 13px; height: 13px;
      pointer-events: none; z-index: 2147483647;
      opacity: 0; transition: opacity 0.2s ease;
    }
    #_ca.on { opacity: 1; }
    ._cp {
      position: fixed; border-radius: 50%;
      pointer-events: none; z-index: 2147483646;
      border: 1px solid rgba(255,255,255,0.5);
      transform: translate(-50%,-50%);
      animation: _pp 0.5s cubic-bezier(0.2,0.6,0.4,1) forwards;
    }
    @keyframes _pp {
      0%   { width: 24px; height: 24px; opacity: 0.8; }
      100% { width: 60px; height: 60px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.id = '_cv';
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  const path = document.createElementNS(NS, 'path');
  path.id = '_cp';
  svg.appendChild(path);
  document.body.appendChild(svg);

  const arrow = document.createElement('div');
  arrow.id = '_ca';
  arrow.innerHTML = `<svg viewBox="0 0 24 24" xmlns="${NS}" style="width:100%;height:100%;display:block">
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6a6 6 0 0 1-6 6 6 6 0 0 1-6-6H4a8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8z" fill="rgba(255,255,255,0.85)"/>
  </svg>`;
  document.body.appendChild(arrow);

  function circlePath(cx, cy, r) {
    const r2 = Math.max(r, 0.5);
    return `M ${cx} ${cy-r2} A ${r2} ${r2} 0 1 1 ${cx} ${cy+r2} A ${r2} ${r2} 0 1 1 ${cx} ${cy-r2} Z`;
  }

  function capsulePath(ax, ay, bx, by, r) {
    const r2  = Math.max(r, 0.5);
    const dx  = bx - ax, dy = by - ay;
    const len = Math.sqrt(dx*dx + dy*dy);
    if (len < 0.01) return circlePath(ax, ay, r2);
    const ux = dx/len, uy = dy/len;
    const px = -uy * r2, py = ux * r2;
    const tlx = ax+px, tly = ay+py;
    const trx = bx+px, try_= by+py;
    const brx = bx-px, bry = by-py;
    const blx = ax-px, bly = ay-py;
    return [
      `M ${tlx} ${tly}`,
      `L ${trx} ${try_}`,
      `A ${r2} ${r2} 0 0 0 ${brx} ${bry}`,
      `L ${blx} ${bly}`,
      `A ${r2} ${r2} 0 0 0 ${tlx} ${tly}`,
      'Z'
    ].join(' ');
  }

  function pillPath(cx, cy, w, h) {
    const r  = h / 2;
    const hw = w / 2;
    return `M ${cx-hw+r} ${cy-r} L ${cx+hw-r} ${cy-r} A ${r} ${r} 0 0 1 ${cx+hw-r} ${cy+r} L ${cx-hw+r} ${cy+r} A ${r} ${r} 0 0 1 ${cx-hw+r} ${cy-r} Z`;
  }

  let mX=-300, mY=-300, sX=-300, sY=-300, started=false;
  let rVal=R, rVel=0;
  let dragging=false, aX=0, aY=0;
  let springing=false;
  let s1x=0, s1y=0, sv1x=0, sv1y=0;
  let s2x=0, s2y=0, sv2x=0, sv2y=0;
  let sR=R, sRv=0;
  let scrollRot=0, scrollTimer=null, arrowOn=false;

  let pillTarget=null, pillW=0, pillH=0, pillCX=0, pillCY=0;
  let curW=0, curWv=0, curH=0, curHv=0, curCX=0, curCXv=0, curCY=0, curCYv=0;
  let pillMode=false, pillBlend=0, pillBlendV=0;

  function step(v, vel, t, k, d) {
    const nv = (vel + (t - v) * k) * d;
    return [v + nv, nv];
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  document.addEventListener('mousemove', e => {
    mX = e.clientX; mY = e.clientY;
    if (!started) { sX = mX; sY = mY; started = true; }
  });

  document.addEventListener('mousedown', () => {
    dragging = true; springing = false;
    aX = sX; aY = sY;
    rVel = -3.5;
    const p = document.createElement('div');
    p.className = '_cp'; p.style.left = sX+'px'; p.style.top = sY+'px';
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    rVel = 3.8;
    const dx = sX - aX, dy = sY - aY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 2) {
      springing = true;
      s1x = aX; s1y = aY; sv1x = sv1y = 0;
      s2x = sX; s2y = sY; sv2x = sv2y = 0;
      sR = Math.max(R*0.4, R*Math.pow((R*2)/dist, 0.45)); sRv = 0;
    }
  });

  document.addEventListener('wheel', e => {
    scrollRot += e.deltaY * 0.45;
    if (!arrowOn) { arrowOn = true; arrow.classList.add('on'); }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { arrowOn = false; arrow.classList.remove('on'); }, 900);
  }, { passive: true });

  document.addEventListener('mouseleave', () => { svg.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { svg.style.opacity = '1'; });

  function onEnter(e) {
    const el   = e.currentTarget;
    const rect = el.getBoundingClientRect();
    pillTarget = el;
    pillW  = rect.width  + 16;
    pillH  = rect.height + 12;
    pillCX = rect.left + rect.width  / 2;
    pillCY = rect.top  + rect.height / 2;
    pillMode = true;
  }

  function onLeave() {
    pillMode   = false;
    pillTarget = null;
  }

  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
  });

  // Call this after dynamically adding inputs to the DOM
  window.cursorObserveInputs = () => {
    document.querySelectorAll('input, textarea, select').forEach(el => {
      if (!el._cursorBound) {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        el._cursorBound = true;
      }
    });
  };

  function tick() {
    sX += (mX - sX) * LERP;
    sY += (mY - sY) * LERP;
    [rVal, rVel] = step(rVal, rVel, R, JIG_K, JIG_DAMP);
    const r = Math.max(rVal, 2);

    if (pillTarget) {
      const rect = pillTarget.getBoundingClientRect();
      pillW  = rect.width  + 16;
      pillH  = rect.height + 12;
      pillCX = rect.left + rect.width  / 2;
      pillCY = rect.top  + rect.height / 2;
    }

    [pillBlend, pillBlendV] = step(pillBlend, pillBlendV, pillMode ? 1 : 0, 0.22, 0.58);
    [curW,  curWv]  = step(curW,  curWv,  pillW,  0.22, 0.58);
    [curH,  curHv]  = step(curH,  curHv,  pillH,  0.22, 0.58);
    [curCX, curCXv] = step(curCX, curCXv, pillCX, 0.22, 0.58);
    [curCY, curCYv] = step(curCY, curCYv, pillCY, 0.22, 0.58);

    const blend = Math.max(0, Math.min(1, pillBlend));
    let d, cx, cy;

    if (blend > 0.01) {
      const blendedCX = lerp(sX,    curCX, blend);
      const blendedCY = lerp(sY,    curCY, blend);
      const blendedW  = lerp(r * 2, curW,  blend);
      const blendedH  = lerp(r * 2, curH,  blend);
      d  = pillPath(blendedCX, blendedCY, blendedW, blendedH);
      cx = blendedCX; cy = blendedCY;

    } else if (dragging) {
      const dist = Math.sqrt((sX-aX)**2 + (sY-aY)**2);
      const cr   = Math.max(3, R * Math.pow((R*2) / Math.max(dist, R*2), 0.5));
      d  = capsulePath(aX, aY, sX, sY, cr);
      cx = (aX + sX) / 2; cy = (aY + sY) / 2;

    } else if (springing) {
      [s1x, sv1x] = step(s1x, sv1x, sX, SPRING_K, SPRING_DAMP);
      [s1y, sv1y] = step(s1y, sv1y, sY, SPRING_K, SPRING_DAMP);
      [s2x, sv2x] = step(s2x, sv2x, sX, SPRING_K, SPRING_DAMP);
      [s2y, sv2y] = step(s2y, sv2y, sY, SPRING_K, SPRING_DAMP);
      [sR,  sRv]  = step(sR,  sRv,  R,  SPRING_K, SPRING_DAMP);
      d  = capsulePath(s1x, s1y, s2x, s2y, Math.max(3, sR));
      cx = (s1x + s2x) / 2; cy = (s1y + s2y) / 2;
      if (Math.abs(s1x-sX) < 0.4 && Math.abs(s1y-sY) < 0.4 &&
          Math.abs(s2x-sX) < 0.4 && Math.abs(s2y-sY) < 0.4 &&
          Math.abs(sR-R) < 0.2) springing = false;

    } else {
      d  = circlePath(sX, sY, r);
      cx = sX; cy = sY;
    }

    path.setAttribute('d', d);
    arrow.style.left      = (cx - 6.5) + 'px';
    arrow.style.top       = (cy - 6.5) + 'px';
    arrow.style.transform = `rotate(${scrollRot}deg)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();