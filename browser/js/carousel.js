(function(){
  var dots   = document.querySelectorAll('.review-dot');
  var cards  = document.querySelectorAll('.review-card');
  var cur    = 0;
  var total  = cards.length;
  var timer;

  function goTo(idx, manual){
    cards[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    dots[cur].setAttribute('aria-selected','false');
    cur = (idx + total) % total;
    cards[cur].classList.add('active');
    dots[cur].classList.add('active');
    dots[cur].setAttribute('aria-selected','true');
    if(manual){ clearInterval(timer); timer = setInterval(next, 4800); }
  }

  function next(){ goTo(cur + 1, false); }

  cards[0].classList.add('active');
  timer = setInterval(next, 4800);

  dots.forEach(function(d){
    d.addEventListener('click', function(){ goTo(parseInt(d.dataset.dot), true); });
  });

  document.getElementById('review-prev').addEventListener('click', function(){ goTo(cur - 1, true); });
  document.getElementById('review-next').addEventListener('click', function(){ goTo(cur + 1, true); });
})();