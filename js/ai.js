const API_URL='https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY_URL='https://ai.cdn.cgamz.online';
const SYSTEM_PROMPT={role:'system',content:'You are Crafted AI, an intelligent and helpful AI assistant. You are designed to assist users with a wide variety of tasks including answering questions, writing, coding, analysis, creative tasks, and more. You are knowledgeable, friendly, and professional. Always strive to provide accurate, helpful, and comprehensive responses.'};

let API_KEY=null,currentModel='llama-3.3-70b-versatile',messages=[],recognition=null,isListening=false,currentAudio=null;

async function loadAPIKey(){
  try{
    const res=await fetch(GROQ_KEY_URL,{headers:{'Content-Type':'application/json'}});
    if(!res.ok)throw new Error(`${res.status}`);
    const data=await res.json();API_KEY=data.apiKey;
  }catch(e){console.error('API key load failed:',e);addSystem('Could not load API configuration. Please refresh.')}
}

function initSpeech(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return;
  recognition=new SR();
  recognition.continuous=false;recognition.interimResults=false;recognition.lang='en-US';
  recognition.onresult=e=>{document.getElementById('userInput').value=e.results[0][0].transcript;autoResize(document.getElementById('userInput'))};
  recognition.onerror=()=>stopVoice();recognition.onend=()=>stopVoice();
}

function toggleVoice(){
  if(!recognition){alert('Speech recognition not supported.');return}
  if(isListening){recognition.stop();stopVoice()}
  else{recognition.start();isListening=true;const btn=document.getElementById('voiceBtn');btn.classList.add('listening');btn.innerHTML='<i class="fas fa-stop"></i>'}
}
function stopVoice(){
  isListening=false;const btn=document.getElementById('voiceBtn');
  btn.classList.remove('listening');btn.innerHTML='<i class="fas fa-microphone"></i>';
}

function initModelSelect(){
  const overlay=document.getElementById('modelOverlay');
  const pill=document.getElementById('modelPill');
  const nameEl=document.getElementById('selectedModelName');
  pill.addEventListener('click',()=>overlay.classList.add('active'));
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('active')});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')overlay.classList.remove('active')});
  document.querySelectorAll('.model-option').forEach(opt=>{
    opt.addEventListener('click',()=>{
      document.querySelectorAll('.model-option').forEach(o=>o.classList.remove('selected'));
      opt.classList.add('selected');currentModel=opt.dataset.value;
      nameEl.textContent=opt.dataset.name;overlay.classList.remove('active');
      addSystem(`Model switched to ${opt.querySelector('.model-option-name').textContent}`);
    });
  });
}

function autoResize(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,140)+'px'}
function handleKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}}
function useSuggestion(text){document.getElementById('userInput').value=text;sendMessage()}
function hideWelcome(){const ws=document.getElementById('welcomeScreen');if(ws)ws.remove()}
function scrollBottom(){const c=document.getElementById('chatContainer');c.scrollTop=c.scrollHeight}

function addSystem(text){
  hideWelcome();const el=document.createElement('div');
  el.className='msg-system';el.textContent=text;
  document.getElementById('chatContainer').appendChild(el);scrollBottom();
}

function addMessage(content,type){
  hideWelcome();const container=document.getElementById('chatContainer');
  const row=document.createElement('div');row.className=`msg-row ${type}`;
  const avatar=document.createElement('div');avatar.className=`msg-avatar ${type}`;
  if(type==='ai'){const img=document.createElement('img');img.src='../img/logo.png';img.alt='AI';avatar.appendChild(img)}
  else{avatar.textContent='U'}
  const bubble=document.createElement('div');bubble.className=`msg-bubble ${type}`;
  if(type==='ai'){
    bubble.innerHTML=marked.parse(content);
    const listenBtn=document.createElement('button');listenBtn.className='listen-btn';
    listenBtn.innerHTML='<i class="fas fa-volume-up"></i> Listen';
    listenBtn.onclick=()=>speakText(content,listenBtn);bubble.appendChild(listenBtn);
  }else{bubble.textContent=content}
  row.appendChild(avatar);row.appendChild(bubble);container.appendChild(row);scrollBottom();
}

function showTyping(){
  hideWelcome();const container=document.getElementById('chatContainer');
  const row=document.createElement('div');row.className='msg-row ai';row.id='typingRow';
  const avatar=document.createElement('div');avatar.className='msg-avatar ai';
  const img=document.createElement('img');img.src='../img/logo.png';img.alt='AI';avatar.appendChild(img);
  const bubble=document.createElement('div');bubble.className='msg-bubble ai';
  bubble.innerHTML='<div class="typing-dots"><span></span><span></span><span></span></div>';
  row.appendChild(avatar);row.appendChild(bubble);container.appendChild(row);scrollBottom();
}
function hideTyping(){const el=document.getElementById('typingRow');if(el)el.remove()}

async function sendMessage(){
  const input=document.getElementById('userInput');const sendBtn=document.getElementById('sendBtn');
  const text=input.value.trim();if(!text)return;
  if(!API_KEY){addSystem('Please wait — loading API configuration…');return}
  addMessage(text,'user');messages.push({role:'user',content:text});
  input.value='';input.style.height='auto';input.disabled=true;sendBtn.disabled=true;showTyping();
  try{
    const res=await fetch(API_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${API_KEY}`},
      body:JSON.stringify({model:currentModel,messages:[SYSTEM_PROMPT,...messages],temperature:0.7,max_tokens:2048})
    });
    if(!res.ok)throw new Error(`${res.status}`);
    const data=await res.json();const reply=data.choices[0].message.content;
    hideTyping();addMessage(reply,'ai');messages.push({role:'assistant',content:reply});
  }catch(err){hideTyping();addMessage('Sorry, I encountered an error. Please try again.','ai');console.error(err)}
  finally{input.disabled=false;sendBtn.disabled=false;input.focus()}
}

function speakText(text,btn){
  if(currentAudio){currentAudio.pause();currentAudio=null;document.querySelectorAll('.listen-btn.playing').forEach(b=>{b.classList.remove('playing');b.innerHTML='<i class="fas fa-volume-up"></i> Listen'})}
  if(btn.classList.contains('playing')){btn.classList.remove('playing');btn.innerHTML='<i class="fas fa-volume-up"></i> Listen';return}
  const clean=text.replace(/#{1,6}\s/g,'').replace(/\*\*/g,'').replace(/\*/g,'').replace(/`{1,3}[^`]*`{1,3}/g,'').replace(/\[([^\]]+)\]\([^\)]+\)/g,'$1').replace(/^\s*[-*+]\s/gm,'').trim();
  if(!('speechSynthesis' in window)){alert('Text-to-speech not supported.');return}
  const utt=new SpeechSynthesisUtterance(clean);utt.rate=1.0;utt.pitch=1.0;utt.volume=1.0;
  btn.classList.add('playing');btn.innerHTML='<i class="fas fa-stop"></i> Stop';
  utt.onend=utt.onerror=()=>{btn.classList.remove('playing');btn.innerHTML='<i class="fas fa-volume-up"></i> Listen';currentAudio=null};
  window.speechSynthesis.cancel();window.speechSynthesis.speak(utt);
  currentAudio={pause:()=>window.speechSynthesis.cancel()};
}

window.addEventListener('DOMContentLoaded',async()=>{
  await loadAPIKey();initSpeech();initModelSelect();
});