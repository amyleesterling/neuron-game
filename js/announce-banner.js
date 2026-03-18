(function() {
  var KEY = 'announce_hivemind_v1';

  function dismissBanner() {
    localStorage.setItem(KEY, 'dismissed');
    var banner = document.getElementById('announceBanner');
    if (!banner) {
      return;
    }

    banner.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    banner.style.transform = 'translateY(-100%)';
    banner.style.opacity = '0';
    setTimeout(function() {
      banner.style.display = 'none';
    }, 300);
  }

  function initBanner() {
    var now = Date.now();
    var stored = localStorage.getItem(KEY);
    if (stored === 'dismissed') {
      return;
    }
    if (stored && now - Number(stored) > 72 * 60 * 60 * 1000) {
      localStorage.setItem(KEY, 'dismissed');
      return;
    }
    if (!stored) {
      localStorage.setItem(KEY, String(now));
    }

    var banner = document.getElementById('announceBanner');
    if (!banner) {
      return;
    }

    banner.style.display = 'flex';

    var startY = 0;
    var deltaY = 0;
    banner.addEventListener('touchstart', function(event) {
      startY = event.touches[0].clientY;
      deltaY = 0;
    }, { passive: true });
    banner.addEventListener('touchmove', function(event) {
      deltaY = event.touches[0].clientY - startY;
      if (deltaY < 0) {
        banner.style.transform = 'translateY(' + deltaY + 'px)';
      }
    }, { passive: true });
    banner.addEventListener('touchend', function() {
      if (deltaY < -30) {
        dismissBanner();
      } else {
        banner.style.transform = '';
      }
    });
  }

  window.dismissBanner = dismissBanner;
  initBanner();
})();