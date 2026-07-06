const games = [
  {id:'10-minutes-till-dawn',name:'10 Minutes Till Dawn'},
  {id:'2048-cupcakes',name:'2048 Cupcakes'},
  {id:'9007199254740992',name:'9007199254740992'},
  {id:'99-balls',name:'99 Balls'},
  {id:'a-small-world-cup',name:'A Small World Cup'},
  {id:'achievement-unlocked',name:'Achievement Unlocked'},
  {id:'animal-crossing-wild-world',name:'Animal Crossing: Wild World'},
  {id:'aqua-park-io',name:'Aqua Park.io'},
  {id:'backrooms-2d',name:'Backrooms 2D'},
  {id:'backrooms-3d',name:'Backrooms 3D'},
  {id:'bacon-may-die',name:'Bacon May Die'},
  {id:'bad-icecream-2',name:'Bad Ice Cream 2'},
  {id:'bad-icecream-3',name:'Bad Ice Cream 3'},
  {id:'bad-icecream',name:'Bad Ice Cream'},
  {id:'bad-parenting',name:'Bad Parenting'},
  {id:'bad-piggies',name:'Bad Piggies'},
  {id:'baldis-basics',name:"Baldi's Basics"},
  {id:'ball-maze',name:'Ball Maze'},
  {id:'basket-random',name:'Basket Random'},
  {id:'basketball-legends',name:'Basketball Legends'},
  {id:'basketball-stars',name:'Basketball Stars'},
  {id:'battle-karts',name:'Battle Karts'},
  {id:'big-flappy-tower-tiny-square',name:'Big Flappy Tower Tiny Square'},
  {id:'big-ice-tower-tiny-square',name:'Big Ice Tower Tiny Square'},
  {id:'big-neon-tower-tiny-square',name:'Big Neon Tower Tiny Square'},
  {id:'big-tower-tiny-square-2',name:'Big Tower Tiny Square 2'},
  {id:'block-blast-2',name:'Block Blast 2'},
  {id:'block-blast',name:'Block Blast'},
  {id:'blood-money',name:'Blood Money'},
  {id:'bloxorz',name:'Bloxorz'},
  {id:'brawl-stars',name:'Brawl Stars'},
  {id:'buckshot-roulette',name:'Buckshot Roulette'},
  {id:'burrito-bison-launch-alibre',name:'Burrito Bison Launcha Libre'},
  {id:'celeste-2',name:'Celeste 2'},
  {id:'celeste',name:'Celeste'},
  {id:'cluster-rush',name:'Cluster Rush'},
  {id:'cookie-clicker',name:'Cookie Clicker'},
  {id:'core-ball',name:'Core Ball'},
  {id:'crazy-cars',name:'Crazy Cars'},
  {id:'crazy-cattle-3d',name:'Crazy Cattle 3D'},
  {id:'crossy-road',name:'Crossy Road'},
  {id:'deltarune',name:'Deltarune'},
  {id:'drift-boss',name:'Drift Boss'},
  {id:'drive-mad',name:'Drive Mad'},
  {id:'duck-life-2',name:'Duck Life 2'},
  {id:'duck-life-3',name:'Duck Life 3'},
  {id:'duck-life',name:'Duck Life'},
  {id:'eggy-car',name:'Eggy Car'},
  {id:'fire-boy-and-water-girl',name:'Fireboy and Watergirl'},
  {id:'flappy-bird',name:'Flappy Bird'},
  {id:'fnaf-2',name:"Five Nights at Freddy's 2"},
  {id:'fnaf-3',name:"Five Nights at Freddy's 3"},
  {id:'fnaf',name:"Five Nights at Freddy's"},
  {id:'fnaw',name:"Five Nights at Winston's"},
  {id:'free-rider',name:'Free Rider'},
  {id:'funny-shooter-2',name:'Funny Shooter 2'},
  {id:'geometry-dash-3d',name:'Geometry Dash 3D'},
  {id:'granny',name:'Granny'},
  {id:'grow-a-garden',name:'Grow a Garden'},
  {id:'gta-2',name:'GTA 2'},
  {id:'happy-wheels',name:'Happy Wheels'},
  {id:'hextris',name:'Hextris'},
  {id:'1',name:'1'},
  {id:'learn-to-fly-2',name:'Learn to Fly 2'},
  {id:'learn-to-fly-3',name:'Learn to Fly 3'},
  {id:'learn-to-fly',name:'Learn to Fly'},
  {id:'minecraft-1.5.2',name:'Minecraft 1.5.2'},
  {id:'minecraft-indev',name:'Minecraft Indev'},
  {id:'minecraft-parkour',name:'Minecraft Parkour'},
  {id:'minecraft-tower-defence',name:'Minecraft Tower Defence'},
  {id:'minecraft-zeta-client',name:'Minecraft Zeta Client'},
  {id:'motox3m-2',name:'Moto X3M 2'},
  {id:'motox3m-3',name:'Moto X3M 3'},
  {id:'motox3m-spookyland',name:'Moto X3M Spooky Land'},
  {id:'motox3m-winter',name:'Moto X3M Winter'},
  {id:'motox3m',name:'Moto X3M'},
  {id:'plants-vs-zombies',name:'Plants vs Zombies'},
  {id:'retro-bowl',name:'Retro Bowl'},
  {id:'short-life',name:'Short Life'},
  {id:'slither-io',name:'Slither.io'},
  {id:'slope-3',name:'Slope 3'},
  {id:'slow-roads',name:'Slow Roads'},
  {id:'snow-rider-3d',name:'Snow Rider 3D'},
  {id:'soccer-random',name:'Soccer Random'},
  {id:'subway-surfers',name:'Subway Surfers'},
  {id:'super-hot',name:'SUPERHOT'},
  {id:'the-binding-of-isaac',name:'The Binding of Isaac'},
  {id:'the-legend-of-zelda-the-minish-cap',name:'The Legend of Zelda: The Minish Cap'},
  {id:'the-worlds-hardest-game',name:"The World's Hardest Game"},
  {id:'tiny-fishing',name:'Tiny Fishing'},
  {id:'ultrakill',name:'ULTRAKILL'},
  {id:'vex-2',name:'Vex 2'},
  {id:'vex-3',name:'Vex 3'},
  {id:'vex-6',name:'Vex 6'},
  {id:'vex-7',name:'Vex 7'},
  {id:'vex-8',name:'Vex 8'},
  {id:'vex',name:'Vex'},
  {id:'volly-random',name:'Volley Random'},
  {id:'word-wonders',name:'Word Wonders'},
  {id:'wordle',name:'Wordle'},
  {id:'yohoho-io',name:'YoHoHo.io'},
  {id:'you-vs-100-skibidi-toilets',name:'You vs 100 Skibidi Toilets'},
  {id:'zombocalypse-2',name:'Zombocalypse 2'},
];

const LETTERS = ['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

let query = '';
let activeLetter = null;
let sortAsc = true;

function tokenize(str){
  return str.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(Boolean);
}

function scoreGame(game, tokens){
  if(!tokens.length) return 1;
  const name = game.name.toLowerCase();
  let score = 0;
  for(const tok of tokens){
    if(name.startsWith(tok)) score += 4;
    else if(name.includes(' '+tok)) score += 3;
    else if(name.includes(tok)) score += 1;
    else return 0;
  }
  return score;
}

function highlight(text, tokens){
  if(!tokens.length) return text;
  const escaped = tokens.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
  return text.replace(new RegExp(`(${escaped})`,'gi'),'<span class="match-highlight">$1</span>');
}

function getFiltered(){
  const tokens = tokenize(query);
  let list = games.map(g=>({...g,score:scoreGame(g,tokens)})).filter(g=>{
    if(g.score===0) return false;
    if(activeLetter){
      const first = g.name.replace(/^(the |a |an )/i,'')[0].toUpperCase();
      if(activeLetter==='#') return !/[A-Z]/.test(first);
      return first===activeLetter;
    }
    return true;
  });
  if(tokens.length && sortAsc){
    list.sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
  } else {
    list.sort((a,b)=>sortAsc?a.name.localeCompare(b.name):b.name.localeCompare(a.name));
  }
  return list;
}

function renderFilters(){
  const row = document.getElementById('filter-row');
  row.innerHTML='';
  LETTERS.forEach(l=>{
    const has = games.some(g=>{
      const first = g.name.replace(/^(the |a |an )/i,'')[0].toUpperCase();
      return l==='#' ? !/[A-Z]/.test(first) : first===l;
    });
    if(!has) return;
    const btn = document.createElement('button');
    btn.className='filter-pill'+(activeLetter===l?' active':'');
    btn.textContent=l;
    btn.onclick=()=>{ activeLetter=activeLetter===l?null:l; render(); };
    row.appendChild(btn);
  });
}

function renderSkeletons(count){
  const grid = document.getElementById('games-grid');
  grid.innerHTML='';
  for(let i=0;i<count;i++){
    const skeleton = document.createElement('div');
    skeleton.className='skeleton-card';
    skeleton.innerHTML=`
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-title"></div>
      </div>
    `;
    grid.appendChild(skeleton);
  }
}

function renderGrid(results){
  const tokens = tokenize(query);
  const grid = document.getElementById('games-grid');
  grid.innerHTML='';
  if(!results.length){
    grid.innerHTML=`<div class="empty-state"><i class="fa-solid fa-magnifying-glass-minus"></i><p>No games found</p><span>Try a different search or clear the filter</span></div>`;
    return;
  }
  results.forEach((g,i)=>{
    const safeId = g.id.replace(/['"]/g,'');
    const card = document.createElement('div');
    card.className='game-card';
    card.style.animationDelay=`${Math.min(i*10,180)}ms`;
    card.innerHTML=`
      <div class="card-img-wrap">
        <div class="card-img-placeholder" id="ph-${safeId}"><i class="fa-solid fa-gamepad"></i></div>
        <img src="../img/games/${safeId}.png" alt="${g.name}" loading="lazy"
          onload="var p=document.getElementById('ph-${safeId}');if(p)p.classList.add('hidden')"
          onerror="this.style.display='none'">
      </div>
      <div class="card-body">
        <div class="card-title" title="${g.name}">${highlight(g.name,tokens)}</div>
      </div>
    `;
    card.onclick = () => openGame(g);
    grid.appendChild(card);
  });
}

function render(){
  const results = getFiltered();
  document.getElementById('game-count').textContent=`${results.length} game${results.length!==1?'s':''}`;
  renderFilters();
  renderGrid(results);
  const meta = document.getElementById('search-meta');
  if(!query && !activeLetter){meta.textContent='';return;}
  const parts=[];
  if(query) parts.push(`"${query}"`);
  if(activeLetter) parts.push(`letter ${activeLetter}`);
  meta.textContent=`${results.length} of ${games.length} — ${parts.join(' · ')}`;
}

function openGame(g){
  document.getElementById('game-title').textContent = g.name;
  document.getElementById('game-frame').src = `../games/${g.id}.html`;
  document.getElementById('game-view').classList.add('open');
}

function closeGame(){
  document.getElementById('game-view').classList.remove('open');
  document.getElementById('game-frame').src = '';
}

document.getElementById('game-back').addEventListener('click', closeGame);

document.getElementById('game-reload').addEventListener('click', () => {
  const frame = document.getElementById('game-frame');
  frame.src = frame.src;
});

document.addEventListener('fullscreenchange', () => {
  const icon = document.getElementById('game-fullscreen')?.querySelector('i');
  if(icon) icon.className = document.fullscreenElement ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
});

render();

document.getElementById('search-input').addEventListener('input',e=>{
  query=e.target.value.trim();
  document.getElementById('search-clear').classList.toggle('visible',query.length>0);
  render();
});

document.getElementById('search-clear').addEventListener('click',()=>{
  document.getElementById('search-input').value='';
  query='';
  document.getElementById('search-clear').classList.remove('visible');
  render();
});

document.getElementById('sort-btn').addEventListener('click',()=>{
  sortAsc=!sortAsc;
  document.getElementById('sort-icon').className=`fa-solid ${sortAsc?'fa-arrow-down-a-z':'fa-arrow-up-a-z'}`;
  document.getElementById('sort-label').textContent=sortAsc?'A–Z':'Z–A';
  render();
});