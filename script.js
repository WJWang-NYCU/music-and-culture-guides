const mobileStyles = document.createElement('style');
mobileStyles.textContent = '.menu-button{display:none}@media(max-width:760px){.menu-button{display:block!important;border:0;background:transparent;color:#30473e;font-size:22px}.site-header{position:relative}.site-header nav{display:none;position:absolute;right:20px;top:64px;background:#fbfaf6;border:1px solid #d9ddd5;padding:14px 18px;z-index:5}.site-header nav.is-open{display:grid;gap:9px}}';
document.head.append(mobileStyles);

document.querySelectorAll('[data-menu-button]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.site-header nav')?.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(document.querySelector('.site-header nav')?.classList.contains('is-open')));
  });
});

const listeningSection = document.querySelector('#listen');
if (listeningSection) {
  const more = document.createElement('p');
  more.innerHTML = '<strong>更多演奏連結：</strong> <a href="https://www.youtube.com/watch?v=ETH8NA-_zXw" target="_blank" rel="noreferrer">第二號詼諧曲・魯賓斯坦 ↗</a>、<a href="https://www.youtube.com/watch?v=x6o3VQ64vD8" target="_blank" rel="noreferrer">英雄波蘭舞曲・魯賓斯坦 ↗</a>、<a href="https://www.youtube.com/watch?v=v1CXY5NHvms" target="_blank" rel="noreferrer">搖籃曲・魯賓斯坦 ↗</a>、<a href="https://www.youtube.com/watch?v=fu3j0qtDTqo" target="_blank" rel="noreferrer">船歌・齊瑪曼 ↗</a>。';
  listeningSection.append(more);
}

// The public edition contains only web-ready content; remove the former source-file note.
document.querySelector('.source-note')?.remove();
