/* A restrained motion layer. Content is never hidden while waiting to animate. */
(function(){
  'use strict';
  var nav = document.querySelector('.work-jump-nav');
  if (nav) {
    var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var sectionPairs = navLinks.map(function(link){
      return {link:link, section:document.getElementById(link.getAttribute('href').slice(1))};
    }).filter(function(pair){return !!pair.section;});
    var scheduled = false;
    function syncNav(){
      scheduled=false;
      if (!sectionPairs.length) return;
      var active=sectionPairs[0];
      sectionPairs.forEach(function(pair){
        if (pair.section.getBoundingClientRect().top<=220) active=pair;
      });
      sectionPairs.forEach(function(pair){
        if(pair===active) pair.link.setAttribute('aria-current','location');
        else pair.link.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll',function(){
      if(!scheduled){scheduled=true;window.requestAnimationFrame(syncNav);}
    },{passive:true});
    window.addEventListener('hashchange',syncNav);
    syncNav();
  }
  if (!('IntersectionObserver' in window) ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  var targets=Array.prototype.slice.call(document.querySelectorAll(
    '.home-page .path, .approach-page .approach-flow, .work-page .portfolio-project > .project-divider, .work-page .portfolio-project > .case-hero, ' +
    '.home-page .lens-section .section-head, .home-page .lens-options, .home-page #featured .work-card, ' +
    '.home-page #how-i-work .principles li, .approach-page .approach-principles li, ' +
    '.approach-page #capabilities .card, .about-page .about-hero, .about-page .about-path__detail, ' +
    '.about-page .about-role, .about-page .about-research-card, .about-page .about-values__grid > *, ' +
    '.work-page .portfolio-project > .case-section .case-section__head, ' +
    '.work-page .portfolio-project > .case-section .card, .work-page .flight-iteration-comparison__item'
  ));
  if (!targets.length && !document.body.classList.contains('home-page')) return;
  document.documentElement.classList.add('motion-enabled');
  targets.forEach(function(el){el.classList.add('motion-pending')});
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      }
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  targets.forEach(function(el){observer.observe(el)});
})();
