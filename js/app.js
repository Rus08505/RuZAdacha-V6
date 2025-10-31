(function(){
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));
  const THEME_KEY='ruza.theme';
  const tabs=['today','ideas','tasks','finance','habits','analytics','settings'];
  function setActive(id){ $$('.screen').forEach(el=>el.classList.remove('active')); $('#screen-'+id)?.classList.add('active'); }
  function setTabByIndex(i){ const id=tabs[i]||'today'; setActive(id); state.tab=i; }
  function applyTheme(t){ const app=$('#app'); app.classList.remove('theme-neon','theme-gradient','theme-black'); app.classList.add('theme-'+t); localStorage.setItem(THEME_KEY,t); }
  function goTab(i){ setTabByIndex(i); closeMenu(); } window.goTab = goTab;
  const state={ tab:0, menu:false, theme: localStorage.getItem(THEME_KEY)||'neon' };
  document.addEventListener('DOMContentLoaded',()=>{
    applyTheme(state.theme);
    $('#homeBtn')?.addEventListener('click',()=>{ setTabByIndex(0); closeMenu(); });
    $('#openSettings')?.addEventListener('click',()=> setTabByIndex(6));
    $('#hamburger')?.addEventListener('click',toggleMenu);
    $('.scrim')?.addEventListener('click',closeMenu);
    $$('input[name=theme]').forEach(r=> r.addEventListener('change',(e)=> applyTheme(e.target.value)));
    setTabByIndex(0);
  });
  function toggleMenu(){ state.menu=!state.menu; updateMenu(); }
  function closeMenu(){ state.menu=false; updateMenu(); }
  function updateMenu(){ const d=$('.drawer'); const s=$('.scrim'); if(!d||!s) return; d.classList.toggle('open',state.menu); s.classList.toggle('show',state.menu); }
})();