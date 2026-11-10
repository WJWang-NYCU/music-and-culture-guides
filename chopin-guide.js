(() => {
  const guide = document.querySelector('[data-work-guide]');
  const controls = document.querySelectorAll('[data-work-filter]');
  if (!guide || !controls.length) return;

  const cards = [...guide.querySelectorAll('[data-work-type]')];
  const markers = [...guide.querySelectorAll('[data-period-marker]')];

  controls.forEach((control) => {
    control.addEventListener('click', () => {
      const type = control.dataset.workFilter;
      controls.forEach((button) => {
        const selected = button === control;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      cards.forEach((card) => { card.hidden = type !== 'all' && card.dataset.workType !== type; });
      markers.forEach((marker) => { marker.hidden = type !== 'all'; });
    });
  });
})();
