const mobileStyles = document.createElement('style');
mobileStyles.textContent = '.menu-button{display:none}.feature-card img{object-position:center top}@media(max-width:760px){.menu-button{display:block!important;border:0;background:transparent;color:#30473e;font-size:22px}.site-header{position:relative}.site-header nav{display:none;position:absolute;right:20px;top:64px;background:#fbfaf6;border:1px solid #d9ddd5;padding:14px 18px;z-index:5}.site-header nav.is-open{display:grid;gap:9px}}';
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

const choCard = `<article class="feature-card added-card"><a class="image-link" href="articles/seong-jin-cho-2026.html"><img src="assets/cho-2026.png" alt="趙成珍鋼琴獨奏會"></a><div><p class="eyebrow">音樂會・曲目導聆</p><h2><a href="articles/seong-jin-cho-2026.html">趙成珍鋼琴獨奏會：中文曲目導聆</a></h2><p>從巴赫、荀白克、舒曼到十四首蕭邦圓舞曲，帶著聆聽線索走進現場。</p><a class="text-link" href="articles/seong-jin-cho-2026.html">閱讀專文 <span>→</span></a></div></article>`;
if (location.pathname.endsWith('/articles.html')) document.querySelector('.listing')?.insertAdjacentHTML('beforeend', choCard);
if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) document.querySelector('.intro')?.insertAdjacentHTML('beforeend', choCard);

const handelCard = `<article class="feature-card added-card"><a class="image-link" href="articles/handel-in-vienna-2026.html"><img src="assets/handel-portrait-2026.png" alt="韓德爾之夜"></a><div><p class="eyebrow">音樂會・巴洛克導聆</p><h2><a href="articles/handel-in-vienna-2026.html">韓德爾之夜：Handel in Vienna</a></h2><p>從管風琴、二重唱到《參孫》選曲，走進維也納金色大廳的巴洛克聲響。</p><a class="text-link" href="articles/handel-in-vienna-2026.html">閱讀專文 <span>→</span></a></div></article>`;
if (location.pathname.endsWith('/articles.html')) document.querySelector('.listing')?.insertAdjacentHTML('beforeend', handelCard);
if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) document.querySelector('.intro')?.insertAdjacentHTML('beforeend', handelCard);

const minsooCard = `<article class="feature-card added-card"><a class="image-link" href="articles/minsoo-sohn-wtc-2026.html"><img src="assets/minsoo-portrait-2026.png" alt="孫旻秀巴哈平均律獨奏會"></a><div><p class="eyebrow">音樂會・古典音樂導聆</p><h2><a href="articles/minsoo-sohn-wtc-2026.html">孫旻秀：巴哈《平均律》第一冊</a></h2><p>二十四組前奏曲與賦格的聆聽地圖，從聲部、調性到節目冊意象。</p><a class="text-link" href="articles/minsoo-sohn-wtc-2026.html">閱讀專文 <span>→</span></a></div></article>`;
if (location.pathname.endsWith('/articles.html')) document.querySelector('.listing')?.insertAdjacentHTML('beforeend', minsooCard);
if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) document.querySelector('.intro')?.insertAdjacentHTML('beforeend', minsooCard);

const bibleImagerySection = document.querySelector('#images');
if (bibleImagerySection) {
  bibleImagerySection.insertAdjacentHTML('beforebegin', `<section class="research-context"><h2>《平均律》的聖經象徵解讀</h2><p>二十世紀音樂理論家亞沃爾斯基（Boleslav Yavorsky，1877–1942）提出，可以從新教聖詠、巴哈聲樂作品與音樂修辭的關聯，理解《平均律鍵盤曲集》中的宗教意涵。在這種解讀下，鍵盤作品中的旋律與節奏，也可能喚起聖詠歌詞及聖經故事的聯想。</p><p>這個方法的關鍵，在於器樂與有歌詞的音樂之間的聯繫：當某個音型與聖詠或受難曲中的旋律相似，研究者便進一步比較其歌詞、情境與音樂寫法，提出對作品意義的解釋。這屬於音樂詮釋與象徵研究，不能僅憑旋律相似，就認定巴哈為每首作品設定了固定的故事。</p><p>鋼琴家 Natalya Pasichnyk 在研究計畫 <em>Rethinking WTC</em> 中，明確以亞沃爾斯基的理論為出發點，探索《平均律》與聖詠及巴哈聲樂作品的關聯。她也與 Calmus Ensemble 合作，將聲樂材料與鍵盤音樂交織，使聽者能直接聽見她所提出的聯繫。</p><p><strong>本頁的 24 組聖經意象仍依臺北場節目冊列示。</strong>亞沃爾斯基的理論僅作為相關研究背景，不將兩者視為已逐項核對一致的對照系統。Pasichnyk 的現代詮釋也有自己的安排，不能直接用來替代節目冊的對應。</p><aside class="revolution-card"><p class="eyebrow">延伸閱讀與聆聽</p><p><a href="https://www.researchcatalogue.net/view/1861285/1861286" target="_blank" rel="noreferrer">Natalya Pasichnyk：Rethinking WTC 研究計畫 ↗</a></p><p><a href="https://www.navonarecords.com/catalog/nv6593/" target="_blank" rel="noreferrer">Navona Records：Rethinking the Well-Tempered Clavier 專輯與曲目說明 ↗</a></p></aside></section>`);
}
