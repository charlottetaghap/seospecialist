// Shared report viewer: category filters and in-page preview modal.
(function () {
  var cards = document.querySelectorAll('.rpt');
  document.querySelectorAll('.rpt-filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      document.querySelectorAll('.rpt-filter').forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      cards.forEach(function (c) { c.hidden = !(f === 'all' || c.getAttribute('data-cat') === f); });
    });
  });

  var modal = document.getElementById('rmodal');
  if (!modal) return;
  var frame = document.getElementById('rmodalFrame'),
      title = document.getElementById('rmodalTitle'),
      openLink = document.getElementById('rmodalOpen'),
      closeBtn = document.getElementById('rmodalClose'),
      lastFocus = null;

  function openModal(a) {
    lastFocus = a;
    title.textContent = a.getAttribute('data-title');
    openLink.href = a.href;
    openLink.firstChild.nodeValue = a.hasAttribute('data-direct') ? 'Open file ' : 'Open in Drive ';
    frame.src = a.getAttribute('data-preview');
    modal.hidden = false; modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeModal() {
    modal.classList.remove('open'); modal.hidden = true;
    frame.src = 'about:blank';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.rpt__open').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      // Files hosted on this site open directly on small screens, where PDFs do not preview well in a frame.
      if (a.hasAttribute('data-direct') && window.matchMedia('(max-width: 760px)').matches) return;
      e.preventDefault(); openModal(a);
    });
  });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
})();
