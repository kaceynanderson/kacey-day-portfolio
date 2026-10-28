/* Homepage lens selector: the selection changes the evidence links, not just color. */
(function(){
 var buttons=Array.prototype.slice.call(document.querySelectorAll('.lens-options [data-lens]'));
 function select(button){
  buttons.forEach(function(b){
   var on=b===button;
   b.setAttribute('aria-pressed',on?'true':'false');
   var panel=document.getElementById(b.getAttribute('aria-controls'));
   if(panel) panel.hidden=!on;
  });
 }
 buttons.forEach(function(button){button.addEventListener('click',function(){select(button)});});
})();