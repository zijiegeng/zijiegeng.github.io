document.addEventListener('DOMContentLoaded', function() {
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0) {
      progressBar.style.width = (window.scrollY / windowHeight) * 100 + '%';
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var y = target.getBoundingClientRect().top + window.scrollY - 78;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  document.querySelectorAll('.btn').forEach(function(button) {
    button.addEventListener('click', function(e) {
      var ripple = document.createElement('span');
      var rect = this.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 600);
    });
  });

  var masthead = document.querySelector('.masthead');
  if (masthead) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        masthead.style.boxShadow = '0 10px 30px rgba(10,14,22,.08)';
        masthead.style.borderBottomColor = 'rgba(15,20,30,.12)';
      } else {
        masthead.style.boxShadow = 'none';
        masthead.style.borderBottomColor = 'rgba(15,20,30,.10)';
      }
    });
  }
});
