const mobileStyles = document.createElement('style');
mobileStyles.textContent = '.menu-button{display:none}.feature-card img{object-position:center top}.wtc-guide{padding:26px 0;border-top:1px solid #d9ddd5}.wtc-guide h3{margin:0 0 10px}.full-guide-heading{margin-top:56px!important}@media(max-width:760px){.menu-button{display:block!important;border:0;background:transparent;color:#30473e;font-size:22px}.site-header{position:relative}.site-header nav{display:none;position:absolute;right:20px;top:64px;background:#fbfaf6;border:1px solid #d9ddd5;padding:14px 18px;z-index:5}.site-header nav.is-open{display:grid;gap:9px}}';
document.head.append(mobileStyles);

document.querySelectorAll('[data-menu-button]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.site-header nav')?.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(document.querySelector('.site-header nav')?.classList.contains('is-open')));
  });
});

const twoPianosWorks = document.querySelector('#works');
if (twoPianosWorks) {
  twoPianosWorks.querySelector('h2').textContent = '從作品聽雙鋼琴';
  const performances = [
    ['阿格麗希、巴倫波因', 'https://youtu.be/USl7qUWU33k'],
    ['阿格麗希、Iddo Bar-Shai', 'https://youtu.be/HHZ3RYAHq20'],
    ['阿格麗希、Nelson Freire', 'https://youtu.be/wYLasmJdeEg'],
    ['阿格麗希、Nelson Goerner', 'https://vimeo.com/27052613'],
    ['阿格麗希、Nelson Freire', 'https://youtu.be/Q0Qo1anGvfQ']
  ];
  document.querySelectorAll('#world .timeline-table tr').forEach((row, index) => {
    if (!index || !performances[index - 1]) return;
    const [name, href] = performances[index - 1];
    const work = row.cells[0].textContent.replace('↗', '').trim();
    row.cells[0].textContent = work;
    row.cells[1].innerHTML = `<a href="${href}" target="_blank" rel="noreferrer">${name} ↗</a>`;
  });
  const addListeningLink = (heading, name, href) => {
    const title = [...twoPianosWorks.querySelectorAll('h3')].find((item) => item.textContent.startsWith(heading));
    let paragraph = title?.nextElementSibling;
    while (paragraph && paragraph.tagName !== 'P') paragraph = paragraph.nextElementSibling;
    if (!paragraph || paragraph.querySelector(`a[href="${href}"]`)) return;
    paragraph.insertAdjacentHTML('beforeend', ` <a href="${href}" target="_blank" rel="noreferrer">${name} ↗</a>`);
  };
  document.querySelectorAll('#works a').forEach((link) => {
    if (link.href.includes('DBgV14408Q8')) link.textContent = '尤森兄弟，BWV 1060 第一樂章 ↗';
    if (link.href.includes('5ZUCSJfT0Ds')) link.textContent = '尤森兄弟，BWV 1060 第二樂章 ↗';
    if (link.href.includes('E2cIH5tMAoA')) link.textContent = '今野早苗、菅生晴美、前場央子、前場聖子 ↗';
    if (link.href.includes('LxKQpEVYWog')) link.textContent = 'Empyrean Orchestra、Kevin Griffiths、Sherniyaz Mussakhan ↗';
  });
  const nodameParagraph = [...document.querySelectorAll('#world p')].find((item) => item.textContent.includes('《交響情人夢》中千秋與野田妹'));
  nodameParagraph?.insertAdjacentHTML('beforebegin', '<figure class="article-image"><img src="../assets/Nodame.png" alt="交響情人夢千秋與野田妹在鋼琴旁的畫面"><figcaption>《交響情人夢》千秋與野田妹的鋼琴畫面。</figcaption></figure>');
  if (nodameParagraph && !document.querySelector('a[href*="m_q4avgMQ8Q"]')) nodameParagraph.insertAdjacentHTML('afterend', '<p><a href="https://youtu.be/m_q4avgMQ8Q?si=tvhQbXacJQqcsGPB" target="_blank" rel="noreferrer">嚴俊傑、海牛（音樂家無聊人生）：交響情人夢名場面，莫札特雙鋼琴奏鳴曲為何這麼曖昧？↗</a></p>');
  addListeningLink('莫札特 K.448', '阿格麗希、巴倫波因', 'https://youtu.be/USl7qUWU33k');
  addListeningLink('德布西《黑與白》', '阿格麗希、Iddo Bar-Shai', 'https://youtu.be/HHZ3RYAHq20');
  addListeningLink('拉威爾《圓舞曲》', '阿格麗希、Nelson Freire', 'https://youtu.be/Q0Qo1anGvfQ');
  addListeningLink('八手的兩個例子', 'Mozart／Vyacheslav Gryaznov《土耳其狂想曲》兩台鋼琴八手版', 'https://youtu.be/lvrCfvpSa_8');
  addListeningLink('拉赫曼尼諾夫', '阿格麗希、Nelson Freire《第二號組曲》', 'https://youtu.be/wYLasmJdeEg');
  addListeningLink('拉赫曼尼諾夫', '阿格麗希、Nelson Goerner《交響舞曲》', 'https://vimeo.com/27052613');
  twoPianosWorks.insertAdjacentHTML('beforeend', `<aside class="revolution-card"><p class="eyebrow">影劇延伸</p><h3>《Four Hands, Two Sonatas》裡的《骷髏之舞》</h3><figure class="article-image"><img src="../assets/K_Drama_Four_Hands.png" alt="Four Hands Two Sonatas 兩位主角的水彩人物插畫"><figcaption>《Four Hands, Two Sonatas》人物水彩插畫，非劇照。</figcaption></figure><p>韓劇《Four Hands, Two Sonatas》（포핸즈）以兩位鋼琴學生的競爭與合作為主線。這段《骷髏之舞》把四手聯彈放進劇情：兩人必須共用一台琴的音域與空間，與兩台鋼琴八手的分工形成有趣對照。</p><p>觀看時，可以留意兩位角色如何處理同一架琴上的手位、起音與節奏同步，再回頭比較八手版本裡四人分配低音、旋律與裝飾音的方式。<a href="https://www.youtube.com/watch?v=U7aOEDO5egM&list=RDU7aOEDO5egM&start_radio=1" target="_blank" rel="noreferrer">宋江、李濬榮《骷髏之舞》四手聯彈片段 ↗</a></p></aside>`);
}

const twoPianosEvent = document.querySelector('#event');
if (twoPianosWorks && twoPianosEvent && !twoPianosEvent.querySelector('.actual-programme')) {
  twoPianosEvent.querySelector('h2').textContent = '實際演出曲目與當日導聆';
  twoPianosEvent.insertAdjacentHTML('afterbegin', `<aside class="revolution-card actual-programme"><p class="eyebrow">2026.11.07・實際節目單</p><p>下列依現場節目單整理，包含一琴四手、雙鋼琴及兩琴八手三種編制；原頁面原有的作品導聆與影音延伸完整保留於後。</p><h3>上半場｜巴赫與莫札特</h3><ol><li><strong>巴赫／Mary Howe：〈羊群安然〉，BWV 208</strong><br>一琴四手｜嚴俊傑、Peter Ovcharov</li><li><strong>巴赫／György Kurtág：BWV 106 器樂序奏〈小奏鳴曲〉</strong><br>一琴四手｜汪奕聞、盧易之</li><li><strong>莫札特：D 大調雙鋼琴奏鳴曲，K.448</strong><br>雙鋼琴｜嚴俊傑、Peter Ovcharov</li><li><strong>莫札特／Vyacheslav Gryaznov：《土耳其狂想曲》</strong><br>兩琴八手｜嚴俊傑、Peter Ovcharov、汪奕聞、盧易之</li></ol><p><em>中場休息</em></p><h3>下半場｜舞曲、抒情與序曲</h3><ol start="5"><li><strong>米堯：《屋頂上的牛》，Op. 58</strong><br>一琴四手｜汪奕聞、Peter Ovcharov</li><li><strong>拉赫曼尼諾夫：C 小調第二號鋼琴協奏曲，Op. 18，第二樂章 Adagio sostenuto</strong><br>雙鋼琴｜嚴俊傑、盧易之</li><li><strong>拉赫曼尼諾夫：《義大利波爾卡》</strong><br>一琴四手｜汪奕聞、Peter Ovcharov</li><li><strong>葛令卡／Vyacheslav Gryaznov：《魯斯蘭與柳德米拉》序曲</strong><br>兩琴八手｜嚴俊傑、Peter Ovcharov、汪奕聞、盧易之</li></ol><p><strong>三個現場聆聽線索：</strong>一琴四手先聽同一鍵盤上的音量與踏板協調；雙鋼琴追蹤主題怎麼在兩台琴間交接；兩琴八手則留意快速音群、低音與旋律能否在四人同時推進時依然清楚。</p></aside>`);
  const legacyLead = [...twoPianosEvent.querySelectorAll('p')].find((paragraph) => paragraph.textContent.startsWith('2026 年 11 月 7 日'));
  legacyLead?.insertAdjacentHTML('beforebegin', '<h3 class="legacy-programme-heading">原有預告版本與延伸導聆（保留）</h3>');
}

const listeningSection = document.querySelector('#listen');
if (listeningSection) {
  const more = document.createElement('p');
  more.innerHTML = '<strong>更多演奏連結：</strong> <a href="https://www.youtube.com/watch?v=ETH8NA-_zXw" target="_blank" rel="noreferrer">第二號詼諧曲・魯賓斯坦 ↗</a>、<a href="https://www.youtube.com/watch?v=x6o3VQ64vD8" target="_blank" rel="noreferrer">英雄波蘭舞曲・魯賓斯坦 ↗</a>、<a href="https://www.youtube.com/watch?v=v1CXY5NHvms" target="_blank" rel="noreferrer">搖籃曲・魯賓斯坦 ↗</a>、<a href="https://www.youtube.com/watch?v=fu3j0qtDTqo" target="_blank" rel="noreferrer">船歌・齊瑪曼 ↗</a>。';
  listeningSection.append(more);
}

// The public edition contains only web-ready content; remove the former source-file note.
document.querySelector('.source-note')?.remove();

const pingtungRachmaninoff = document.querySelector('#rachmaninoff');
if (pingtungRachmaninoff) {
  const setLink = (oldPart, href, label) => {
    const link = pingtungRachmaninoff.querySelector(`a[href*="${oldPart}"]`);
    if (!link) return;
    link.href = href;
    link.textContent = `${label} ↗`;
  };
  setLink('OfFc8Zr1R8Y', 'https://youtu.be/NEEYbvTh21o?si=Gnm2bxDS7sFkPTvL', '林東赫、阿格麗希：《交響舞曲》第一樂章');
  setLink('vimeo.com/449119236', 'https://youtu.be/hnOHI_ZaH4o?si=q6Hf6NAyWG_jn5TN', '林東赫、阿格麗希：《交響舞曲》第三樂章');
  const secondHeading = [...pingtungRachmaninoff.querySelectorAll('h3')].find((heading) => heading.textContent.startsWith('II.'));
  if (secondHeading && !pingtungRachmaninoff.querySelector('a[href*="5Hh4hN4deP0"]')) secondHeading.insertAdjacentHTML('afterend', '<p><a href="https://youtu.be/5Hh4hN4deP0?si=r4UwKZD5G67etJU3" target="_blank" rel="noreferrer">林東赫、阿格麗希：《交響舞曲》第二樂章 ↗</a></p>');
}

const isHandelGuide = location.pathname.endsWith('/articles/handel-in-vienna-2026.html');

// Handel in Vienna: make the complete printed programme visible as a set of
// direct listening links, rather than leaving listeners to use search pages.
const handelProgramme = document.querySelector('#programme');
if (isHandelGuide && handelProgramme && !handelProgramme.querySelector('.handel-programme-links')) {
  handelProgramme.insertAdjacentHTML('beforeend', `<aside class="revolution-card handel-programme-links"><p class="eyebrow">本場完整曲目・點選聆聽</p><ol><li><a href="https://www.youtube.com/watch?v=H3-m4LzDVdY" target="_blank" rel="noreferrer">Günther Rost、4D Barock：韓德爾《降 B 大調管風琴協奏曲》Op. 7 No. 1，HWV 306 ↗</a></li><li><a href="https://www.youtube.com/watch?v=FPmbv5yngGk" target="_blank" rel="noreferrer">Lucy Crowe、Mark Padmore、The English Concert：《As steals the morn upon the night》／HWV 55 ↗</a></li><li><a href="https://chambermusicsociety.org/cms-on-screen/digital-archive/2018/handel-let-the-bright-seraphim-from-samson-for-soprano-trumpet-strings-and-continuo-hwv-57" target="_blank" rel="noreferrer">Chamber Music Society of Lincoln Center：《Let the bright Seraphim》／《參孫》HWV 57 ↗</a></li><li><a href="https://www.youtube.com/watch?v=AaYUycaqeSc" target="_blank" rel="noreferrer">Günther Rost、4D Barock：韓德爾《F 大調管風琴協奏曲》Op. 4 No. 4，HWV 292 ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4" target="_blank" rel="noreferrer">Vox Luminis、Lionel Meunier：韓德爾《聖塞西莉亞日頌》HWV 76 ↗</a></li></ol><p>以上依節目單順序列出；這些是對應曲目的延伸聆聽，並非本場演出錄音。</p></aside>`);
}

const handelOrgan = document.querySelector('#organ');
if (isHandelGuide && handelOrgan) {
  handelOrgan.querySelectorAll('a[href*="results?search_query=Handel+HWV+306"]').forEach((link) => {
    link.href = 'https://www.youtube.com/watch?v=H3-m4LzDVdY';
    link.textContent = 'Günther Rost、4D Barock：HWV 306 演出 ↗';
  });
}
const handelMorn = document.querySelector('#morn');
if (isHandelGuide && handelMorn) {
  handelMorn.querySelectorAll('a[href*="results?search_query=Handel+As+steals"]').forEach((link) => {
    link.href = 'https://www.youtube.com/watch?v=FPmbv5yngGk';
    link.textContent = 'Lucy Crowe、Mark Padmore、The English Concert：〈As steals the morn〉↗';
  });
}
const handelSamson = document.querySelector('#samson');
if (isHandelGuide && handelSamson) {
  handelSamson.querySelectorAll('a[href*="results?search_query=Handel+Let+the+bright+Seraphim"]').forEach((link) => {
    link.href = 'https://chambermusicsociety.org/cms-on-screen/digital-archive/2018/handel-let-the-bright-seraphim-from-samson-for-soprano-trumpet-strings-and-continuo-hwv-57';
    link.textContent = 'Chamber Music Society of Lincoln Center：〈Let the bright Seraphim〉演出 ↗';
  });
}
const handelCecilia = document.querySelector('#cecilia');
if (isHandelGuide && handelCecilia && !handelCecilia.querySelector('a[href*="Eeom7cS9ty4"]')) {
  handelCecilia.insertAdjacentHTML('beforeend', '<p><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4" target="_blank" rel="noreferrer">Vox Luminis、Lionel Meunier：《聖塞西莉亞日頌》HWV 76 完整演出 ↗</a></p>');
}

if (isHandelGuide && handelCecilia && !handelCecilia.querySelector('.cecilia-timestamps')) {
  handelCecilia.insertAdjacentHTML('beforeend', `<aside class="revolution-card cecilia-timestamps"><p class="eyebrow">Vox Luminis 完整演出・段落時間碼</p><p>指揮：Lionel Meunier。點選段落可直接跳至影片對應位置。</p><ol><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4" target="_blank" rel="noreferrer">00:00　Ouverture: Larghetto e staccato—allegro—minuet ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=284s" target="_blank" rel="noreferrer">04:44　Recitativo (tenor): From harmony, from heavenly harmony ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=482s" target="_blank" rel="noreferrer">08:02　Chorus: From harmony, from heavenly harmony ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=750s" target="_blank" rel="noreferrer">12:30　Aria (soprano): What passion cannot music raise and quell! ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=1184s" target="_blank" rel="noreferrer">19:44　Aria (tenor) and Chorus: The trumpet’s loud clangour ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=1393s" target="_blank" rel="noreferrer">23:13　March ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=1516s" target="_blank" rel="noreferrer">25:16　Aria (soprano): The soft complaining flute ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=1849s" target="_blank" rel="noreferrer">30:49　Aria (tenor): Sharp violins proclaim their jealous pangs ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=2111s" target="_blank" rel="noreferrer">35:11　Aria (soprano): But oh! What art can teach ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=2501s" target="_blank" rel="noreferrer">41:41　Aria (soprano): Orpheus could lead the savage race ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=2610s" target="_blank" rel="noreferrer">43:30　Recitative (soprano): But bright Cecilia raised the wonder higher ↗</a></li><li><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=2680s" target="_blank" rel="noreferrer">44:40　Grand Chorus with soprano: As from the power of sacred lays ↗</a></li></ol><p><a href="https://www.youtube.com/watch?v=Eeom7cS9ty4&t=3075s" target="_blank" rel="noreferrer">51:15　安可：〈Hallelujah〉，選自《彌賽亞》↗</a></p></aside>`);
}

// Restored from the supplied 19-page Handel in Vienna listening guide.
const handelPdfEdition = document.querySelector('#programme');
if (isHandelGuide && handelPdfEdition && !document.querySelector('#handel-context')) {
  handelPdfEdition.insertAdjacentHTML('afterend', `<section id="handel-context"><h2>韓德爾與十八世紀倫敦的音樂生活</h2><p>韓德爾（George Frideric Handel, 1685–1759）出生於德國哈勒，年輕時曾赴義大利學習，後來在倫敦建立重要的音樂事業。他與巴赫同年出生，卻走出不同道路：巴赫的重心多與教會和宮廷職務相關；韓德爾則在歌劇、神劇與公共音樂演出中發展出鮮明的戲劇感。</p><p>本場將管風琴協奏曲、神劇相關選曲與頌歌相連，讓管弦樂、獨唱、二重唱及合唱各自展示性格。Orchester Wiener Akademie 採取「歷史知情演奏」的觀念，從作品時代的樂器、演奏技術、裝飾音、速度與音響平衡出發；現場可留意弦樂線條的清晰度、管樂音色，以及管風琴和樂團彼此呼應的方式。</p><aside class="revolution-card"><p class="eyebrow">本頁依上傳導聆整理</p><p><strong>演出：</strong>2026 年 11 月 1 日 19:30，Musikverein Wien, Großer Saal</p><p><strong>演出者：</strong>Orchester Wiener Akademie；Martin Haselböck 指揮；Balázs Szabó 管風琴；Sophie Junker 女高音；Gwilym Bowen 男高音；Singverein der Gesellschaft der Musikfreunde in Wien。</p><p>曲目名稱與順序依導聆所載 Musikverein 當時公告整理；第二首為 HWV 55 二重唱，仍以演出當晚節目單為準。</p></aside></section>`);

  const organSection = document.querySelector('#organ');
  organSection?.insertAdjacentHTML('beforeend', `<section class="guide-detail"><h3>作品背景與四個樂章</h3><p>韓德爾的管風琴協奏曲是十八世紀倫敦音樂生活的重要創新。他常在神劇演出的段落之間親自演奏，既展示作曲才能，也讓聽眾聽見鍵盤演奏家的即興能力。HWV 306 完成於 1740 年，後來收入作品第七集；其中的獨立踏板聲部，也顯示韓德爾對管風琴低音域與演奏技術的運用。</p><ol><li>Andante</li><li>Andante</li><li>Largo, e piano</li><li>Bourrée</li></ol><p><strong>再聽一次：</strong>前幾樂章可追管風琴如何時而突出、時而融入弦樂和聲；終樂章 Bourrée 的節奏格外明確，帶出舞曲性格。</p></section>`);

  const mornSection = document.querySelector('#morn');
  mornSection?.insertAdjacentHTML('beforeend', `<section class="guide-detail"><h3>作品、文本與兩個聲部</h3><p>〈As steals the morn upon the night〉選自韓德爾 1740 年的英語聲樂作品 <em>L'Allegro, il Penseroso ed il Moderato</em>, HWV 55。前兩部分文本取自彌爾頓詩作，第三部分採 Charles Jennens 的文字，在節制與平衡中調和歡愉、沉思兩種性情。這首二重唱位於第三部分，以晨光逐漸取代夜色，描寫理性使心靈恢復明晰與平衡。</p><p>兩個歌唱聲部以舒展旋律交替、接續，再彼此重疊；器樂線條也加入其中，讓晨光不是一下子降臨，而是逐步展開。可特別注意一位歌者起句後，另一位何時進入，及兩人如何安排呼吸、重音與樂句終點。</p><h3>延伸欣賞：Eternal source of light divine</h3><p>這首延伸曲選自 1713 年《安妮女王生日頌歌》HWV 74，不是本場公告曲目。歌詞以光明與祝福為主題，開頭可譯作「永恆神聖的光明之源」。悠長抒情的歌唱線條與器樂獨奏彼此回應；低音持續支撐上方旋律，形成內斂而莊嚴的巴洛克優雅。</p></section>`);

  const samsonSection = document.querySelector('#samson');
  samsonSection?.insertAdjacentHTML('beforeend', `<section class="guide-detail"><h3>《參孫》的戲劇背景</h3><p>《參孫》HWV 57 是韓德爾依舊約人物參孫故事寫成的英語神劇，也受到彌爾頓作品的影響。參孫失去力量、遭受囚禁，最終以自己的生命完成對敵人的反擊。〈Let the Bright Seraphim〉出現在作品近結尾，以明亮、耀眼的聲響頌揚英雄。</p><p>這首詠嘆調中的小號與女高音不是伴奏與主旋律的單向關係，而是兩個相互競逐的角色：小號提出清楚有力的音型，女高音再以華麗聲樂線條回應。聽見快速音群時，不妨同時追問：它們如何把炫技轉化為勝利、光輝與榮耀的情緒？</p></section>`);

  const ceciliaSection = document.querySelector('#cecilia');
  ceciliaSection?.insertAdjacentHTML('beforebegin', `<section id="organ-292"><h2>F 大調管風琴協奏曲，HWV 292</h2><p>HWV 292 完成於 1735 年，後來收入作品第四集、編為第四號；它是韓德爾早期倫敦管風琴協奏曲的代表。相較於 HWV 306，此曲的樂章對比更直接、節奏輪廓更鮮明。</p><ol><li>Allegro</li><li>Andante</li><li>Adagio</li><li>Allegro</li></ol><p>第一樂章以明朗節奏與主題發展建立開放、有活力的氣氛；第二樂章轉為親密，管風琴旋律與和聲呈現內省而優雅的表情；短小的慢板使情緒轉折，最後由活潑終樂章收束。早期版本的結尾還曾銜接一段 <em>Hallelujah</em> 合唱。</p><aside class="revolution-card"><p class="eyebrow">兩首協奏曲怎麼比較</p><p>HWV 306 著重管風琴獨奏能力、踏板聲部與不同音色的對話；HWV 292 則以較鮮明的樂章對比、清楚節奏與巴洛克協奏曲的活力取勝。</p><p><a href="https://www.youtube.com/watch?v=AaYUycaqeSc" target="_blank" rel="noreferrer">Günther Rost、4D Barock：HWV 292 演出 ↗</a>　<a href="https://imslp.org/wiki/Organ_Concerto_in_F_major%2C_HWV_292_(Handel%2C_George_Frideric)" target="_blank" rel="noreferrer">IMSLP：HWV 292 樂譜與作品資料 ↗</a></p></aside></section>`);

  ceciliaSection?.insertAdjacentHTML('beforeend', `<section class="guide-detail"><h3>為什麼是聖塞西莉亞？</h3><p>《聖塞西莉亞日頌》完成於 1739 年，採用英國詩人約翰・德萊頓（John Dryden）1687 年的詩篇。聖塞西莉亞在基督教傳統中被尊為音樂與音樂家的主保聖人；韓德爾以歌唱、管弦樂與不同樂器提出一個核心問題：音樂如何形成秩序，又如何觸動人類的情感？</p><h3>宇宙、和諧與樂器性格</h3><p>德萊頓的詩借用了古代哲學中宇宙與音樂和諧的想像：在古希臘畢達哥拉斯傳統裡，數字比例、音程與宇宙秩序被視為彼此相關。作品裡的不同樂器也各具象徵性格：<strong>小號</strong>帶來勇氣、戰鬥與英雄氣概；<strong>長笛</strong>表達溫柔、哀傷與低聲傾訴；<strong>小提琴</strong>能描寫激動、嫉妒與強烈情緒；<strong>管風琴</strong>則帶有莊嚴、神聖與超越世俗的性格。</p><h3>完整段落與聆聽順序</h3><ol><li><strong>Overture</strong>：建立莊嚴的開場氣氛。</li><li><strong>From Harmony; When Nature</strong>：男高音宣敘調，描寫混沌與和諧。</li><li><strong>From Harmony, from Heavenly Harmony</strong>：合唱，宇宙由和諧獲得秩序。</li><li><strong>What Passion Cannot Music Raise and Quell</strong>：女高音詠嘆調，音樂能喚起也能平息情感。</li><li><strong>The Trumpet’s Loud Clangour</strong>：男高音與合唱，小號象徵戰鬥與勇氣。</li><li><strong>March</strong>：展現鮮明節奏性格。</li><li><strong>The Soft Complaining Flute</strong>：女高音詠嘆調，長笛表達哀傷。</li><li><strong>Sharp Violins Proclaim Their Jealous Pangs</strong>：男高音詠嘆調，小提琴表現嫉妒與激動。</li><li><strong>But Oh! What Art Can Teach</strong>：女高音詠嘆調，歌頌管風琴的崇高音色。</li><li><strong>Orpheus Could Lead the Savage Race</strong>：女高音詠嘆調，引用俄耳甫斯以音樂感動萬物的神話。</li><li><strong>But Bright Cecilia Raised the Wonder Higher</strong>：女高音宣敘調，聖塞西莉亞將音樂提升至神聖境界。</li><li><strong>As from the Power of Sacred Lays</strong>：女高音與合唱，以宏偉終曲連結音樂與宇宙秩序。</li></ol><aside class="revolution-card"><p class="eyebrow">聆聽提問</p><p>同樣是音樂，為什麼長笛讓人感到哀傷，小號卻使人振奮？這正是德萊頓詩篇與韓德爾音樂共同探問的主題。</p></aside></section>`);
}

const choCard = `<article class="feature-card added-card"><a class="image-link" href="articles/seong-jin-cho-2026.html"><img src="assets/cho-2026.png" alt="趙成珍鋼琴獨奏會"></a><div><p class="eyebrow">音樂會・曲目導聆</p><h2><a href="articles/seong-jin-cho-2026.html">趙成珍鋼琴獨奏會：中文曲目導聆</a></h2><p>從巴赫、荀白克、舒曼到十四首蕭邦圓舞曲，帶著聆聽線索走進現場。</p><a class="text-link" href="articles/seong-jin-cho-2026.html">閱讀專文 <span>→</span></a></div></article>`;
if (location.pathname.endsWith('/articles.html')) document.querySelector('.listing')?.insertAdjacentHTML('beforeend', choCard);
if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) document.querySelector('.intro')?.insertAdjacentHTML('beforeend', choCard);

const handelCard = `<article class="feature-card added-card"><a class="image-link" href="articles/handel-in-vienna-2026.html"><img src="assets/handel-portrait-2026.png" alt="韓德爾之夜"></a><div><p class="eyebrow">音樂會・巴洛克導聆</p><h2><a href="articles/handel-in-vienna-2026.html">韓德爾之夜：Handel in Vienna</a></h2><p>從管風琴、二重唱到《參孫》選曲，走進維也納金色大廳的巴洛克聲響。</p><a class="text-link" href="articles/handel-in-vienna-2026.html">閱讀專文 <span>→</span></a></div></article>`;
if (location.pathname.endsWith('/articles.html')) document.querySelector('.listing')?.insertAdjacentHTML('beforeend', handelCard);
if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) document.querySelector('.intro')?.insertAdjacentHTML('beforeend', handelCard);

const minsooCard = `<article class="feature-card added-card"><a class="image-link" href="articles/minsoo-sohn-wtc-2026.html?v=6879f9e"><img src="assets/minsoo-portrait-2026.png" alt="孫旻秀巴哈平均律獨奏會"></a><div><p class="eyebrow">音樂會・古典音樂導聆</p><h2><a href="articles/minsoo-sohn-wtc-2026.html?v=6879f9e">孫旻秀：巴哈《平均律》第一冊</a></h2><p>二十四組前奏曲與賦格的聆聽地圖，從聲部、調性到節目冊意象。</p><a class="text-link" href="articles/minsoo-sohn-wtc-2026.html?v=6879f9e">閱讀專文 <span>→</span></a></div></article>`;
if (location.pathname.endsWith('/articles.html')) document.querySelector('.listing')?.insertAdjacentHTML('beforeend', minsooCard);
if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) document.querySelector('.intro')?.insertAdjacentHTML('beforeend', minsooCard);

const bibleImagerySection = document.querySelector('#images');
if (bibleImagerySection) {
  bibleImagerySection.insertAdjacentHTML('beforebegin', `<section class="research-context"><h2>《平均律》的聖經象徵解讀</h2><p>二十世紀音樂理論家亞沃爾斯基（Boleslav Yavorsky，1877–1942）提出，可以從新教聖詠、巴哈聲樂作品與音樂修辭的關聯，理解《平均律鍵盤曲集》中的宗教意涵。在這種解讀下，鍵盤作品中的旋律與節奏，也可能喚起聖詠歌詞及聖經故事的聯想。</p><p>這個方法的關鍵，在於器樂與有歌詞的音樂之間的聯繫：當某個音型與聖詠或受難曲中的旋律相似，研究者便進一步比較其歌詞、情境與音樂寫法，提出對作品意義的解釋。這屬於音樂詮釋與象徵研究，不能僅憑旋律相似，就認定巴哈為每首作品設定了固定的故事。</p><p>鋼琴家 Natalya Pasichnyk 在研究計畫 <em>Rethinking WTC</em> 中，明確以亞沃爾斯基的理論為出發點，探索《平均律》與聖詠及巴哈聲樂作品的關聯。她也與 Calmus Ensemble 合作，將聲樂材料與鍵盤音樂交織，使聽者能直接聽見她所提出的聯繫。</p><p><strong>本頁的 24 組聖經意象仍依臺北場節目冊列示。</strong>亞沃爾斯基的理論僅作為相關研究背景，不將兩者視為已逐項核對一致的對照系統。Pasichnyk 的現代詮釋也有自己的安排，不能直接用來替代節目冊的對應。</p><aside class="revolution-card"><p class="eyebrow">延伸閱讀與聆聽</p><p><a href="https://www.researchcatalogue.net/view/1861285/1861286" target="_blank" rel="noreferrer">Natalya Pasichnyk：Rethinking WTC 研究計畫 ↗</a></p><p><a href="https://www.navonarecords.com/catalog/nv6593/" target="_blank" rel="noreferrer">Navona Records：Rethinking the Well-Tempered Clavier 專輯與曲目說明 ↗</a></p></aside></section>`);
}

const wtcGroups = document.querySelector('#groups');
if (wtcGroups) {
  const guides = [
    ['1','C 大調','846','天使報喜｜路加福音','分解和弦與四聲部賦格','前奏曲以規律的分解和弦展開，音型持續反覆，和聲隨低音與內聲部移動而改變。賦格由單一聲部開始，其他聲部先後奏出主題，與前奏曲形成不同織體。','前奏曲可聽低音變化；賦格則先辨認開頭主題，再聽它在不同音域出現。'],
    ['2','C 小調','847','燃燒的荊棘｜出埃及記','連續音型與短主題','前奏曲以快速、連續的音型推進，尾段的速度與織體有所轉變。賦格主題短而鮮明，容易從節奏辨認它在各聲部的進入。','比較前奏曲尾段與開頭的速度感，再留意賦格主題每次進入時，其他聲部正在演奏什麼。'],
    ['3','升 C 大調','848','三位一體｜馬太福音','快速音型與樂句','前奏曲音型在兩手之間交替，連續音符仍有清楚的樂句起伏。賦格同樣輕快，主題在不同聲部間接續出現。','聽快速音型如何分成較長樂句，以及每句結束時的停頓與收尾。'],
    ['4','升 C 小調','849','客西馬尼園的禱告｜馬太福音','五聲部賦格','前奏曲以較長旋律線條展開。賦格從簡短、緩慢的主題開始，後來加入較活躍材料；不同材料逐漸交疊，使音樂愈加密集。','記住賦格最初主題，聽它如何與後來加入的旋律同時進行。'],
    ['5','D 大調','850','聖靈降臨｜使徒行傳','連續音流與附點節奏','前奏曲右手持續演奏快速音型，左手以較簡潔音符支持和聲。賦格的附點節奏與和弦性寫法，帶來較莊重的性格。','比較前奏曲連續流動的音型，與賦格較有重量的節奏。'],
    ['6','D 小調','851','罪與救贖｜創世記','快速音型與低音','前奏曲右手連續音型形成持續動勢，低音移動帶出和聲變化。賦格中，主題與相關片段在不同聲部出現，使旋律彼此銜接。','右手快速行進時，也可留意左手低音何時移動，以及樂句在哪裡結束。'],
    ['7','降 E 大調','852','三位一體｜教義性主題','前奏曲的段落與對位','這首前奏曲篇幅較大，內部包含不同速度感與織體段落，也有明顯模仿與對位；後面的賦格較精煉，性格也較輕巧。','留意前奏曲如何從一段轉入下一段，以及旋律在不同聲部間的模仿。'],
    ['8','降 E 小調／升 D 小調','853','卸下十字架｜約翰福音','歌唱性旋律與聲部交疊','前奏曲採降 E 小調，賦格寫作升 D 小調，兩者在現代鋼琴上同音異名。前奏曲旋律有較長延續與停留；賦格透過主題反覆進入與交疊展開。','前奏曲可聽旋律延續時下方和聲的改變；賦格留意前一次主題尚未結束，下一次便已開始的位置。'],
    ['9','E 大調','854','逃往埃及｜馬太福音','搖曳的節奏','前奏曲節奏柔和，旋律在規律律動中延續。賦格篇幅較短，主題節奏較緊湊，與前奏曲形成對比。','比較兩首的節奏性格，以及前奏曲旋律下方持續活動的聲部。'],
    ['10','E 小調','855','聖母探訪｜路加福音','二聲部賦格','前奏曲中，歌唱性旋律與持續音型同時進行，後段轉為更快速段落。賦格只有兩個聲部，兩條旋律的模仿與交替因而較容易辨認。','在賦格中先追蹤上方旋律，再重聽一次，只注意下方旋律。'],
    ['11','F 大調','856','捕魚的神蹟｜路加福音','裝飾音與舞曲節奏','前奏曲以裝飾音與連續音型交織。賦格的三拍子節奏鮮明，主題在聲部間接續，保有輕盈律動。','聽前奏曲裝飾音如何接入樂句，以及賦格每小節的輕重。'],
    ['12','F 小調','857','聖母悼歌｜約翰福音','半音與和聲','前奏曲在穩定脈動中讓不同旋律線條交織。賦格主題的半音移動帶來較強和聲張力；這組結束後是臺北場中場休息。','留意賦格主題中的半音移動，以及其他聲部加入後和聲如何改變。'],
    ['13','升 F 大調','858','新年｜路加福音','旋律與節奏的擺動','下半場由升 F 大調開始。前奏曲旋律帶有柔和擺動感；賦格中各聲部接續主題，也在主題之外延展自己的旋律。','除了最高聲部，也留意低音與中間聲部如何接續樂句。'],
    ['14','升 F 小調','859','背負十字架｜約翰福音','兩手之間的模仿','前奏曲材料在兩手間交替出現，一個聲部提出的音型會由另一聲部接續；賦格則以較長主題展開多聲部寫作。','聽前奏曲相似音型如何由一手轉到另一手，以及接續時的音域變化。'],
    ['15','G 大調','860','基督復活｜馬太福音','舞曲節奏與主題倒影','前奏曲與賦格都有鮮明動感。賦格主題除了原來形態，也會改變旋律上下方向，形成倒影。','先熟悉主題節奏，再聽旋律方向改變後，哪些節奏特徵仍保留。'],
    ['16','G 小調','861','聖母探訪｜路加福音','裝飾音與主題的進入','前奏曲的裝飾音與持續音，使旋律在流動中也有停留。賦格主題輪廓鮮明，每次進入都與其他旋律形成不同組合。','比較主題在高音與低音出現時，周圍聲部的不同配合。'],
    ['17','降 A 大調','862','賢士朝拜｜馬太福音','和弦與對位','前奏曲的和弦性寫法與節奏帶有較明確宣告感。賦格由各聲部交錯旋律展開，與前奏曲呈現不同音響。','比較前奏曲較整齊的和弦節奏，與賦格各聲部先後進入的寫法。'],
    ['18','升 G 小調','863','十架七言｜四福音書','主題與其他聲部的配合','前奏曲以短小材料連接成較長樂句。賦格中主題出現時，其他聲部仍持續演奏，並非只作和弦伴奏。','選一次清楚主題進入，同時留意另一個聲部旋律如何延續。'],
    ['19','A 大調','864','賢士朝拜｜馬太福音','休止與主題節奏','前奏曲中，不同聲部以相似材料互相照應。賦格主題開頭的單音、休止與後續音型，構成容易辨認的節奏。','記住主題起頭停頓，聽它在其他聲部出現時如何接入仍在進行的旋律。'],
    ['20','A 小調','865','約旦河受洗｜馬太福音','長篇賦格','前奏曲以規律節奏與音型展開。賦格篇幅較長，主題多次進入，聲部組合與音域也隨之改變。','由主題每次出現的位置，留意當時有多少聲部同時活動，以及旋律集中在哪個音域。'],
    ['21','降 B 大調','866','牧羊人朝拜｜路加福音','快速音群與和弦段落','前奏曲交替使用快速音群與和弦性段落，帶有即興般變化。賦格以較連續節奏，讓主題在各聲部間展開。','比較前奏曲不同段落的音型與停頓，再聽賦格如何維持較穩定律動。'],
    ['22','降 B 小調','867','耶穌之死｜馬太福音','五聲部的緩慢展開','前奏曲旋律與和聲緩慢推移。五聲部賦格讓各條旋律交疊，在較慢速度中形成厚實音響。','先聽最高與最低聲部，再留意中間旋律進入，以及主題彼此重疊段落。'],
    ['23','B 大調','868','基督復活｜馬太福音','流暢的旋律與對位','前奏曲線條流暢，各樂句自然接續。賦格中主題與其他旋律同時進行，可聽見各聲部在不同音域間配合。','主題再次出現時，留意其他聲部如何延續原有旋律。'],
    ['24','B 小調','869','走向各各他｜路加福音','B 小調的終曲','前奏曲中上方旋律與低音各有清楚線條。賦格主題較長，包含鮮明半音移動，並在全曲多次回返。','先熟悉賦格主題的半音進行，再聽它在不同聲部與和聲之下的變化。']
  ];
  const guideHtml = guides.map(([n,key,bwv,bible,heading,body,focus]) => `<article class="wtc-guide"><p class="eyebrow">第 ${n} 組・節目冊意象：${bible}</p><h3>${key}，BWV ${bwv}</h3><p><strong>${heading}</strong></p><p>${body}</p><p><strong>聆聽重點：</strong>${focus}</p><p><a href="https://www.youtube.com/results?search_query=Minsoo+Sohn+Bach+BWV+${bwv}" target="_blank" rel="noreferrer">YouTube 搜尋：Minsoo Sohn BWV ${bwv} ↗</a></p></article>`).join('');
  wtcGroups.insertAdjacentHTML('beforeend', `<h3 class="full-guide-heading">24 組逐曲聆聽提示</h3><p>以下恢復原導聆的每組內容、聆聽重點與指定演奏者搜尋連結。</p>${guideHtml}`);
}
