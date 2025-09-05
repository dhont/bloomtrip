/* Mermaid initialization for BloomTrip docs */
(function(){
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: true, securityLevel: 'strict', theme: 'default' });
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      if (window.mermaid) {
        window.mermaid.initialize({ startOnLoad: true, securityLevel: 'strict', theme: 'default' });
      }
    });
  }
})();
