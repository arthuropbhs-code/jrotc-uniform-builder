{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const RIBBONS=[\{id:'hero',name:'Medal for Heroism',precedence:1,img:'images/hero.png'\}, /* add rest */];\
const MEDALS=[\{id:'m-hero',name:'Heroism Medal',color:'#8b0000'\}];\
const ARCS=[\{id:'a-challenge',name:'Cadet Challenge'\}].sort((a,b)=>a.name.localeCompare(b.name));\
\
let state=\{ribbons:new Map(),medals:new Set(),arcs:new Set(),tab:'ribbons'\};\
\
// Load from localStorage\
if(localStorage.getItem('jt_state'))\{\
    const saved=JSON.parse(localStorage.getItem('jt_state'));\
    state.ribbons=new Map(saved.ribbons); state.medals=new Set(saved.medals); state.arcs=new Set(saved.arcs);\
\}\
\
function saveState()\{localStorage.setItem('jt_state',JSON.stringify(\{ribbons:[...state.ribbons],medals:[...state.medals],arcs:[...state.arcs]\}));\}\
\
function enterApp(school,unit)\{document.getElementById('header-school-name').innerText=school;document.getElementById('header-unit-name').innerText=unit;document.getElementById('landing-page').classList.add('hidden');document.getElementById('builder-content').classList.remove('hidden');renderSelections();\}\
\
function exitApp()\{document.getElementById('builder-content').classList.add('hidden');document.getElementById('landing-page').classList.remove('hidden');\}\
\
function setTab(tab)\{state.tab=tab;['ribbons','medals','arcs'].forEach(t=>\{const btn=document.getElementById(`btn-$\{t\}`);btn.className=t===tab?"flex-1 py-3.5 rounded-[1.5rem] font-bold text-sm bg-white text-indigo-600 shadow-sm":"flex-1 py-3.5 rounded-[1.5rem] font-bold text-sm text-slate-500";\});renderSelections();\}\
\
function updateRibbon(id,delta)\{let count=(state.ribbons.get(id)||0)+delta;if(count<=0)state.ribbons.delete(id);else state.ribbons.set(id,Math.min(count,10));renderSelections();updatePreview();saveState();\}\
\
function toggleItem(type,id)\{state[type].has(id)?state[type].delete(id):state[type].add(id);renderSelections();updatePreview();saveState();\}\
\
function resetAll()\{state.ribbons.clear();state.medals.clear();state.arcs.clear();updatePreview();renderSelections();saveState();\}\
\
function renderSelections()\{\
    const list=document.getElementById('selection-list');list.innerHTML='';\
    if(state.tab==='ribbons')\{RIBBONS.forEach(r=>\{const count=state.ribbons.get(r.id)||0;const div=document.createElement('div');div.className=`flex items-center justify-between p-4 rounded-3xl border transition-all $\{count>0?'border-indigo-500 bg-indigo-50/40':'border-slate-100 bg-white'\}`;div.innerHTML=`<div class="flex items-center gap-4"><img src="$\{r.img\}" class="w-14 h-4 object-fill rounded shadow-sm"><span class="text-xs font-bold text-slate-700">$\{r.name\}</span></div><div class="flex items-center bg-white rounded-2xl p-1 shadow-sm border"><button onclick="updateRibbon('$\{r.id\}',-1)" class="w-8 h-8 text-slate-400 font-black">-</button><span class="w-8 text-center text-xs font-black text-indigo-600">$\{count\}</span><button onclick="updateRibbon('$\{r.id\}',1)" class="w-8 h-8 text-indigo-500 font-black">+</button></div>`;list.appendChild(div);\});\}\
    else if(state.tab==='medals')\{MEDALS.forEach(m=>\{const active=state.medals.has(m.id);const div=document.createElement('div');div.className=`flex items-center justify-between p-5 rounded-3xl border cursor-pointer transition-all $\{active?'border-indigo-500 bg-indigo-50/40':'border-slate-100 bg-white'\}`;div.onclick=()=>toggleItem('medals',m.id);div.innerHTML=`<div class="flex items-center gap-3"><div class="w-4 h-4 rounded-full border border-slate-300" style="background-color:$\{m.color\}"></div><span class="text-sm font-bold text-slate-700">$\{m.name\}</span></div><span class="text-indigo-600 font-black">$\{active?'\uc0\u10003 ':'+'\}</span>`;list.appendChild(div);\});\}\
    else\{ARCS.forEach(a=>\{const active=state.arcs.has(a.id);const div=document.createElement('div');div.className=`flex items-center justify-between p-5 rounded-3xl border cursor-pointer transition-all $\{active?'border-indigo-500 bg-indigo-50/40':'border-slate-100 bg-white'\}`;div.onclick=()=>toggleItem('arcs',a.id);div.innerHTML=`<span class="text-sm font-bold text-slate-700">$\{a.name\} Arc</span><span class="text-indigo-600 font-black">$\{active?'\uc0\u10003 ':'+'\}</span>`;list.appendChild(div);\});\}\
\}\
\
function updatePreview()\{\
    const rPreview=document.getElementById('u-ribbons');rPreview.innerHTML='';const activeRibbons=RIBBONS.filter(r=>state.ribbons.has(r.id)).sort((a,b)=>a.precedence-b.precedence);\
    for(let i=0;i<activeRibbons.length;i+=3)\{const row=document.createElement('div');row.className='flex gap-[1px]';activeRibbons.slice(i,i+3).forEach(r=>\{const count=state.ribbons.get(r.id);const div=document.createElement('div');div.className='ribbon-mini';div.style.backgroundImage=`url($\{r.img\})`;if(count>1)\{const star=document.createElement('div');star.className='mini-star';star.innerText=count>5?'\uc0\u9733 S':'\u9733 '.repeat(count-1);div.appendChild(star);\}row.appendChild(div);\});rPreview.appendChild(row);\}\
    const mPreview=document.getElementById('u-medals');mPreview.innerHTML='';MEDALS.filter(m=>state.medals.has(m.id)).forEach(m=>\{const div=document.createElement('div');div.className='medal-mini';div.innerHTML=`<div class="medal-ribbon-part" style="background:$\{m.color\}"></div><div class="medal-coin-part"></div>`;mPreview.appendChild(div);\});\
    const aPreview=document.getElementById('u-arcs');aPreview.innerHTML='';ARCS.filter(a=>state.arcs.has(a.id)).forEach(a=>\{const div=document.createElement('div');div.className='arc-mini';div.innerText=a.name;aPreview.appendChild(div);\});\
\}\
\
window.onload=()=>\{renderSelections();updatePreview();\}\
}