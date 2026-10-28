const profiles = {
  'computer science': {
    insight: 'Strong foundations in computation can open pathways across software, data, security, and product teams. Applied projects help graduates show how they use that knowledge in context.',
    roles: [
      {title:'Software developer', icon:'⌘', description:'Designs, builds, tests, and maintains software.', skills:['Programming','Testing','Teamwork']},
      {title:'Data analyst', icon:'▥', description:'Turns datasets into findings that support decisions.', skills:['Data analysis','Communication','Critical thinking']},
      {title:'Cybersecurity analyst', icon:'◈', description:'Monitors systems and helps reduce security risks.', skills:['Security','Problem solving','Ethics']},
      {title:'UX / product associate', icon:'◉', description:'Connects user needs, product goals, and technology.', skills:['User research','Communication','Design thinking']},
      {title:'Cloud / systems engineer', icon:'☁', description:'Builds and operates reliable computing infrastructure.', skills:['Systems','Automation','Troubleshooting']},
      {title:'Research assistant', icon:'⌁', description:'Applies computational methods to investigate questions.', skills:['Research','Statistics','Writing']}
    ],
    skills:[['Programming & software development','Technical foundations','Core'],['Data analysis & visualisation','Technical foundations','Core'],['Problem solving & computational thinking','Reasoning','Core'],['Communication & technical writing','Professional practice','Important'],['Teamwork & collaborative development','Professional practice','Important'],['Cybersecurity & responsible computing','Ethics and risk','Important'],['Project planning & agile practice','Delivery','Emerging']]
  },
  'business administration': {
    insight: 'Business graduates often work across functions. Pairing core management knowledge with evidence-based decisions, digital fluency, and communication creates clearer pathways into practice.',
    roles:[
      {title:'Business analyst',icon:'⌕',description:'Clarifies business needs and recommends improvements.',skills:['Analysis','Communication','Process design']},
      {title:'Marketing coordinator',icon:'◉',description:'Supports campaigns, audiences, and market insight.',skills:['Marketing','Data literacy','Writing']},
      {title:'Operations associate',icon:'↗',description:'Helps teams deliver services efficiently.',skills:['Operations','Problem solving','Teamwork']},
      {title:'People / HR associate',icon:'♧',description:'Supports hiring, employee experience, and people processes.',skills:['People skills','Ethics','Communication']},
      {title:'Project coordinator',icon:'◷',description:'Tracks scope, timelines, risks, and collaboration.',skills:['Project planning','Teamwork','Organisation']},
      {title:'Entrepreneurial / venture associate',icon:'✳',description:'Tests ideas and helps develop new products or services.',skills:['Innovation','Finance','Research']}
    ],
    skills:[['Data literacy & business analytics','Digital and analytical','Core'],['Financial literacy & budgeting','Business foundations','Core'],['Communication & presentation','Professional practice','Core'],['Critical thinking & decision making','Reasoning','Core'],['Project management & collaboration','Delivery','Important'],['Customer insight & market research','Digital and analytical','Important'],['Ethical leadership & sustainability','Ethics and responsibility','Important']]
  },
  'psychology': {
    insight: 'Psychology supports work in research, people-focused services, and organisational settings. Graduates benefit from strong research methods, ethical judgement, and the ability to communicate evidence clearly.',
    roles:[
      {title:'Research assistant',icon:'⌁',description:'Supports study design, data collection, and analysis.',skills:['Research methods','Statistics','Ethics']},
      {title:'People / HR associate',icon:'♧',description:'Applies people insight to hiring and workplace practices.',skills:['Interpersonal skills','Communication','Ethics']},
      {title:'Behaviour support worker',icon:'♡',description:'Helps deliver person-centred support in a supervised setting.',skills:['Empathy','Observation','Boundaries']},
      {title:'UX research assistant',icon:'◉',description:'Studies how people experience products and services.',skills:['User research','Interviewing','Analysis']},
      {title:'Community programme officer',icon:'⌂',description:'Coordinates initiatives that support community wellbeing.',skills:['Communication','Planning','Cultural awareness']},
      {title:'Further study pathway',icon:'↗',description:'Builds toward specialist or regulated professional practice.',skills:['Academic writing','Ethics','Research']}
    ],
    skills:[['Research design & evidence evaluation','Research practice','Core'],['Statistics & data interpretation','Research practice','Core'],['Ethical judgement & confidentiality','Ethics and responsibility','Core'],['Communication & active listening','Professional practice','Core'],['Cultural awareness & inclusive practice','People and context','Important'],['Reflective practice & boundaries','Professional practice','Important'],['Digital research tools','Digital and analytical','Emerging']]
  }
};
const genericProfile = {
  insight:'This degree can be explored through its subject knowledge, the ways students apply it, and the settings where graduates contribute. Use the examples below as prompts, then validate them with local evidence.',
  roles:[
    {title:'Graduate / entry-level practitioner',icon:'↗',description:'Applies subject knowledge in a supervised professional setting.',skills:['Subject knowledge','Communication','Problem solving']},
    {title:'Research or project assistant',icon:'⌁',description:'Supports a team to investigate a question or deliver an outcome.',skills:['Research','Data literacy','Teamwork']},
    {title:'Programme / operations coordinator',icon:'◷',description:'Organises people, information, and activities to meet goals.',skills:['Planning','Communication','Digital fluency']},
    {title:'Policy or service associate',icon:'⌂',description:'Contributes to services, analysis, or decisions in an organisation.',skills:['Critical thinking','Writing','Ethics']},
    {title:'Client / community liaison',icon:'♡',description:'Builds relationships and helps connect people with services or expertise.',skills:['Listening','Cultural awareness','Communication']},
    {title:'Further study pathway',icon:'✳',description:'Continues into advanced study or a specialist professional pathway.',skills:['Research','Academic writing','Self-directed learning']}
  ],
  skills:[['Subject knowledge applied to real cases','Discipline practice','Core'],['Critical thinking & problem solving','Reasoning','Core'],['Communication & professional writing','Professional practice','Core'],['Research & evidence evaluation','Research practice','Important'],['Data and digital literacy','Digital and analytical','Important'],['Teamwork & project delivery','Delivery','Important'],['Ethical and inclusive practice','Ethics and responsibility','Important']]
};

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const state = {course:'', skills:[], modules:[], mappings:{}};
const form = $('#course-form');
const input = $('#course-input');
let toastTimer;
const STORAGE_KEY='coursecraft.workspace.v1';
const ACTIVE_KEY='coursecraft.active-course.v1';
function notify(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2300)}
function slug(text){return text.toLowerCase().trim()}
function loadWorkspace(course){
  try{
    const perCourse=JSON.parse(localStorage.getItem(`${STORAGE_KEY}:${slug(course)}`)||'null');
    if(perCourse&&typeof perCourse==='object')return perCourse;
    const previous=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    return previous&&slug(previous.course||'')===slug(course)?previous:null;
  }catch(error){return null}
}
function persistWorkspace(){
  if(!state.course)return;
  try{const workspace={course:state.course,modules:state.modules,mappings:state.mappings,updatedAt:new Date().toISOString()};localStorage.setItem(`${STORAGE_KEY}:${slug(state.course)}`,JSON.stringify(workspace));localStorage.setItem(ACTIVE_KEY,state.course);$('#save-status').textContent='Saved locally'}
  catch(error){$('#save-status').textContent='Could not save'}
}
function renderProfile(course,restoreState=null){
  const profile=profiles[slug(course)]||genericProfile;
  state.course=course;
  $('#results').classList.remove('hidden');
  $('#result-title').textContent=course;
  $('#course-insight').textContent=profile.insight;
  $('#role-grid').innerHTML=profile.roles.map(role=>`<article class="role-card"><div class="role-top"><span class="role-icon">${role.icon}</span><span class="role-chevron">↗</span></div><h4>${role.title}</h4><p>${role.description}</p><div class="role-skills">${role.skills.map(s=>`<span>${s}</span>`).join('')}</div></article>`).join('');
  state.skills=profile.skills.map((s,i)=>({id:`s${i}`,name:s[0],category:s[1],priority:s[2]}));
  state.modules=Array.isArray(restoreState?.modules)?restoreState.modules.filter(m=>typeof m==='string'):[];
  state.mappings=restoreState?.mappings&&typeof restoreState.mappings==='object'?restoreState.mappings:{};
  state.mappings=Object.fromEntries(Object.entries(state.mappings).filter(([id,value])=>state.skills.some(skill=>skill.id===id)&&(value===null||typeof value==='string')));
  renderSkills();renderMapping();
  if(!restoreState)$('#results').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderSkills(){
  $('#skill-list').innerHTML=state.skills.map(skill=>`<label class="skill-row"><input class="skill-check" type="checkbox" data-skill="${skill.id}" ${state.mappings[skill.id]?'checked':''}><span><span class="skill-name">${skill.name}</span><span class="skill-category">${skill.category}</span></span><span class="priority">${skill.priority}</span><span class="skill-arrow">↗</span></label>`).join('');
  $$('.skill-check').forEach(box=>box.addEventListener('change',()=>{if(box.checked&&!state.mappings[box.dataset.skill])state.mappings[box.dataset.skill]=null;else if(!box.checked)delete state.mappings[box.dataset.skill];renderMapping()}));
}
function renderMapping(){
  const selected=state.skills.filter(s=>Object.hasOwn(state.mappings,s.id));
  $('#mapped-count').textContent=selected.filter(s=>state.mappings[s.id]).length;
  $('#module-count').textContent=state.modules.length;
  $('#unmapped-count').textContent=selected.filter(s=>!state.mappings[s.id]).length;
  $('#module-list').innerHTML=state.modules.length?state.modules.map((m,i)=>`<div class="module-item"><span class="module-dot"></span><span class="module-title">${escapeHtml(m)}</span><span class="module-badge">${selected.filter(s=>state.mappings[s.id]===m).length||''}</span><button class="remove-module" data-remove="${i}" aria-label="Remove ${escapeHtml(m)}">×</button></div>`).join(''):'<div class="module-empty">Your existing modules will appear here.</div>';
  $$('.remove-module').forEach(btn=>btn.addEventListener('click',()=>{const removed=state.modules.splice(Number(btn.dataset.remove),1)[0];Object.keys(state.mappings).forEach(id=>{if(state.mappings[id]===removed)state.mappings[id]=null});renderMapping()}));
  const unmapped=selected.filter(s=>!state.mappings[s.id]);
  $('#unmapped-list').innerHTML=unmapped.map(skill=>`<div class="unmapped-item"><span>${escapeHtml(skill.name)}</span><select data-map="${skill.id}" aria-label="Map ${escapeHtml(skill.name)} to a module"><option value="">Choose a module…</option>${state.modules.map(m=>`<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join('')}<option value="__new__">Propose a new module</option></select></div>`).join('');
  $('#empty-skills').classList.toggle('hidden',selected.length>0);
  $$('.unmapped-item select').forEach(select=>select.addEventListener('change',()=>{
    const val=select.value;
    if(val==='__new__'){const skill=state.skills.find(item=>item.id===select.dataset.map);const title=`Proposed: ${skill.name}`;if(!state.modules.includes(title))state.modules.push(title);state.mappings[select.dataset.map]=title;renderMapping();notify('Added a proposed module to your map.');return}
    if(val){state.mappings[select.dataset.map]=val;renderMapping();}
  }));
  renderSuggestions(unmapped);
}
function renderSuggestions(unmapped){
  const suggestions=unmapped.map(skill=>{
    const name=skill.name.toLowerCase();let idea='Use a short applied case study, followed by a reflection on how the skill was used.';let evidence='case analysis + reflective note';
    if(/data|statistic|analysis/.test(name)){idea='Add a lab where students work with a real or open dataset, choose an appropriate method, and explain the limits of their findings.';evidence='data brief + reproducible analysis';}
    else if(/communication|writing|presentation/.test(name)){idea='Build a discipline-specific briefing or presentation for a non-specialist audience into an existing module.';evidence='audience-focused brief + rubric';}
    else if(/team|collaborat|project/.test(name)){idea='Use a small team project with rotating roles, peer feedback, and an individual contribution reflection.';evidence='team deliverable + peer review';}
    else if(/ethic|inclusive|cultural|responsib/.test(name)){idea='Add a decision case that asks students to identify stakeholders, risks, and ethical trade-offs before recommending an action.';evidence='decision memo + criteria rubric';}
    else if(/research|evidence/.test(name)){idea='Ask students to compare sources, assess evidence quality, and defend a research-informed recommendation.';evidence='annotated sources + recommendation';}
    return `<div class="suggestion-card"><strong>${escapeHtml(skill.name)}</strong><p>${idea} <span>Possible evidence: ${evidence}.</span></p></div>`;
  });
  $('#suggestion-list').innerHTML=suggestions.join('');
  $('#recommendations').classList.toggle('hidden',unmapped.length===0);
  persistWorkspace();
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
form.addEventListener('submit',e=>{e.preventDefault();const course=input.value.trim();if(!course)return;renderProfile(course,loadWorkspace(course))});
$$('.sample-chip').forEach(chip=>chip.addEventListener('click',()=>{input.value=chip.dataset.course;renderProfile(chip.dataset.course,loadWorkspace(chip.dataset.course))}));
$('#reset-button').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});input.focus()});
$('#module-form').addEventListener('submit',e=>{e.preventDefault();const field=$('#module-input');const title=field.value.trim();if(!title)return;if(state.modules.some(m=>slug(m)===slug(title))){notify('That module is already in your list.');return}state.modules.push(title);field.value='';renderMapping();notify('Module added to your curriculum map.')});
$('#export-button').addEventListener('click',()=>{
  const profile=profiles[slug(state.course)]||genericProfile;
  const selected=state.skills.filter(skill=>Object.hasOwn(state.mappings,skill.id));
  const lines=[`# Curriculum plan: ${state.course}`,'',`Exported from Coursecraft on ${new Date().toLocaleDateString()}.`,'','## Example career pathways',...profile.roles.map(role=>`- **${role.title}:** ${role.description}`),'','## Selected skills',...(selected.length?selected.map(skill=>`- **${skill.name}** (${skill.priority}; ${skill.category}) — ${state.mappings[skill.id]||'Unmapped'}`):['- No skills selected yet.']),'','## Existing and proposed modules',...(state.modules.length?state.modules.map(module=>`- ${module}`):['- No modules added yet.']),'','## Curriculum ideas for unmapped skills',...$$(".suggestion-card").map(card=>`- **${$('.suggestion-card strong',card).textContent}:** ${$('.suggestion-card p',card).textContent}`),'','> This is an illustrative planning aid, not live labor-market analysis. Validate roles and skills against local job postings, employers, accreditation requirements, and graduate outcomes.'];
  const blob=new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download=`${slug(state.course).replace(/[^a-z0-9]+/g,'-')}-curriculum-plan.md`;anchor.click();URL.revokeObjectURL(url);notify('Curriculum plan exported.');
});
try{const lastCourse=localStorage.getItem(ACTIVE_KEY);const saved=lastCourse?loadWorkspace(lastCourse):JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(saved&&typeof saved.course==='string'){input.value=saved.course;renderProfile(saved.course,saved)}}catch(error){$('#save-status').textContent='Ready to save'}

