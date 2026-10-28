/* Consolidated Work page: retain the source Lumavi role interaction; add FLIGHT progression tabs. */
(function(){var tabs=[].slice.call(document.querySelectorAll('#role-tabs [role="tab"]'));function select(tab){tabs.forEach(function(t){var on=t===tab;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;var p=document.getElementById(t.getAttribute('aria-controls'));if(p)p.hidden=!on;});tab.focus();}tabs.forEach(function(tab,i){tab.addEventListener('click',function(){select(tab)});tab.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowRight')n=tabs[(i+1)%tabs.length];if(e.key==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];if(e.key==='Home')n=tabs[0];if(e.key==='End')n=tabs[tabs.length-1];if(n){e.preventDefault();select(n);}});});})();
(function(){
  var tabs=Array.prototype.slice.call(document.querySelectorAll('.phase-tabs [role="tab"]'));
  function select(tab,focus){
    tabs.forEach(function(t){
      var on=t===tab;
      t.setAttribute('aria-selected',on?'true':'false');
      t.tabIndex=on?0:-1;
      var panel=document.getElementById(t.getAttribute('aria-controls'));
      if(panel) panel.hidden=!on;
    });
    if(focus) tab.focus();
  }
  tabs.forEach(function(tab,i){
    tab.addEventListener('click',function(){select(tab,false)});
    tab.addEventListener('keydown',function(e){
      var next=null;
      if(e.key==='ArrowRight') next=tabs[(i+1)%tabs.length];
      if(e.key==='ArrowLeft') next=tabs[(i+tabs.length-1)%tabs.length];
      if(e.key==='Home') next=tabs[0];
      if(e.key==='End') next=tabs[tabs.length-1];
      if(next){e.preventDefault();select(next,true)}
    });
  });
})();
