
// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle){
  toggle.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      if (nav.classList.contains('open')) nav.classList.remove('open');
    }
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Feedback: download as JSON, and Email link
const dlBtn = document.getElementById('downloadBtn');
const mailto = document.getElementById('mailtoLink');
const form = document.getElementById('feedbackForm');
if (dlBtn && mailto && form){
  function collect(){
    return {
      timestamp: new Date().toISOString(),
      age: document.getElementById('age').value || null,
      favouriteSection: document.getElementById('fav').value,
      message: document.getElementById('message').value.trim()
    };
  }
  dlBtn.addEventListener('click', ()=>{
    const data = collect();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feedback.json';
    a.click();
    URL.revokeObjectURL(url);
  });
  mailto.addEventListener('click', (e)=>{
    const data = collect();
    const subject = encodeURIComponent('Young Athletes Website Feedback');
    const body = encodeURIComponent(`Age: ${data.age ?? ''}\nFavourite Section: ${data.favouriteSection}\n\nFeedback:\n${data.message}`);
    mailto.href = `mailto:?subject=${subject}&body=${body}`;
  });
}
