(function() {
  var config = window.NEURON_CONFIG || {};

  function getFeedbackClient() {
    if (window._feedbackSB) {
      return window._feedbackSB;
    }

    window._feedbackSB = window.supabase.createClient(
      config.feedbackSupabaseUrl,
      config.feedbackSupabaseAnonKey
    );
    return window._feedbackSB;
  }

  function initFeedbackWidget() {
    var widget = document.getElementById('feedbackWidget');
    var toggle = document.getElementById('feedbackToggle');
    var form = document.getElementById('feedbackForm');
    var text = document.getElementById('feedbackText');
    var send = document.getElementById('feedbackSend');
    var status = document.getElementById('feedbackStatus');

    if (!widget || !toggle || !form || !text || !send || !status) {
      return;
    }

    toggle.addEventListener('click', function() {
      var open = form.style.display !== 'none';
      form.style.display = open ? 'none' : 'block';
      if (!open) {
        text.focus();
      }
    });

    send.addEventListener('click', function() {
      var msg = text.value.trim();
      if (!msg) {
        return;
      }

      send.disabled = true;
      send.textContent = 'SENDING...';

      var sb = getFeedbackClient();
      var name = localStorage.getItem('neuron_name') || '';
      var page = location.pathname;
      var platform = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

      sb.from('neuron_feedback').insert({
        message: msg,
        name: name,
        page: page,
        platform: platform,
      }).then(function(res) {
        if (res.error) {
          status.textContent = 'ERROR - TRY AGAIN';
          status.style.color = '#ff4466';
        } else {
          status.textContent = 'SENT! THANK YOU';
          status.style.color = '#4fc3f7';
          text.value = '';
        }

        send.disabled = false;
        send.textContent = 'SEND';
        setTimeout(function() {
          status.textContent = '';
          form.style.display = 'none';
        }, 2000);
      });
    });

    text.addEventListener('keydown', function(event) {
      event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
      if (!widget.contains(event.target)) {
        form.style.display = 'none';
      }
    });
  }

  initFeedbackWidget();
})();