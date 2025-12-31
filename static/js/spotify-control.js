document.addEventListener('DOMContentLoaded', function() {
  const iframes = document.querySelectorAll('iframe[src*="spotify.com/embed"]');

  iframes.forEach(iframe => {
    iframe.addEventListener('load', function() {
      const src = iframe.src;

      // Listen for messages from Spotify embeds
      window.addEventListener('message', function(e) {
        // Only react to Spotify embeds
        if (!e.origin.includes('spotify.com')) return;

        // Pause other iframes when one starts playing
        if (e.data && e.data.type === 'play') {
          iframes.forEach(other => {
            if (other !== iframe) {
              other.contentWindow.postMessage({ method: 'pause' }, 'https://open.spotify.com');
            }
          });
        }
      });
    });
  });
});
