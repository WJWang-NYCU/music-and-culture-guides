"""Render every reader-facing section of the supplied LaTeX guide to a portable PDF.

The source was authored for XeLaTeX, which is not available in this workspace.
This renderer deliberately preserves its complete reader-facing content, links,
image assets, and source list while using embedded Traditional-Chinese fonts.
"""
from pathlib import Path
import re
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle

ROOT = Path('/Users/weijingwang/Downloads/新竹黑白極致音樂會導聆')
TEX = ROOT / 'main.tex'
OUT = Path('/Users/weijingwang/Documents/GitHub/music-and-culture-guides/output/pdf/雙鋼琴的聲音與對話完整導聆.pdf')

pdfmetrics.registerFont(TTFont('STHeiti', '/System/Library/Fonts/STHeiti Medium.ttc', subfontIndex=0))
FONT='STHeiti'; INK=colors.HexColor('#24333D'); TEAL=colors.HexColor('#2B6869'); PAPER=colors.HexColor('#F3F5F2')
ss=getSampleStyleSheet()
ss.add(ParagraphStyle(name='fullbody',fontName=FONT,fontSize=10.1,leading=16,textColor=INK,spaceAfter=7))
ss.add(ParagraphStyle(name='fullsmall',fontName=FONT,fontSize=8.4,leading=12,textColor=INK,spaceAfter=3))
ss.add(ParagraphStyle(name='fullh1',fontName=FONT,fontSize=18,leading=26,textColor=TEAL,spaceBefore=5,spaceAfter=10))
ss.add(ParagraphStyle(name='fullh2',fontName=FONT,fontSize=13,leading=19,textColor=INK,spaceBefore=6,spaceAfter=6))
ss.add(ParagraphStyle(name='fulltitle',fontName=FONT,fontSize=28,leading=38,textColor=INK,alignment=TA_CENTER,spaceAfter=10))
ss.add(ParagraphStyle(name='fullsubtitle',fontName=FONT,fontSize=14,leading=22,textColor=TEAL,alignment=TA_CENTER,spaceAfter=12))
ss.add(ParagraphStyle(name='fullcaption',fontName=FONT,fontSize=8.5,leading=12,textColor=TEAL,alignment=TA_CENTER,spaceAfter=7))
ss.add(ParagraphStyle(name='fulllink',fontName=FONT,fontSize=9,leading=14,textColor=TEAL,spaceAfter=4))

def P(s, sty='fullbody'):
    return Paragraph(s, ss[sty])

def image(name):
    im=Image(str(ROOT/name)); im.drawWidth=14.6*cm; im.drawHeight=im.drawWidth*im.imageHeight/im.imageWidth
    return im

def foot(canvas, doc):
    canvas.saveState(); canvas.setStrokeColor(colors.HexColor('#B7C9C9')); canvas.line(2.2*cm,1.32*cm,A4[0]-2.2*cm,1.32*cm)
    canvas.setFillColor(TEAL); canvas.setFont(FONT,8); canvas.drawString(2.2*cm,.83*cm,'雙鋼琴的聲音與對話  完整導聆')
    canvas.drawRightString(A4[0]-2.2*cm,.83*cm,str(doc.page)); canvas.restoreState()

doc=BaseDocTemplate(str(OUT),pagesize=A4,leftMargin=2.2*cm,rightMargin=2.2*cm,topMargin=2.05*cm,bottomMargin=1.8*cm)
doc.addPageTemplates([PageTemplate(id='all',frames=[Frame(doc.leftMargin,doc.bottomMargin,doc.width,doc.height,id='f')],onPage=foot)])
story=[]

# The uploaded PDF is the editorial authority.  Reframe its material so the
# subject is the medium (two pianos), with the Hsinchu concert as context.
story += [Spacer(1,1.25*cm),P('TWO PIANOS  MANY VOICES','fullsubtitle'),P('雙鋼琴的','fulltitle'),P('聲音與對話','fulltitle'),
          P('從獨立鍵盤、共鳴與踏板，到四手八手聯彈的合作','fullsubtitle'),Spacer(1,.6*cm),
          P('這不是把一架鋼琴加倍而已。兩位演奏者擁有各自完整的音域與踏板，必須在旋律、低音、和聲、速度與收音之間不斷交換角色；當四人加入時，舞台又形成更密集的聲部網絡。','fullbody'),
          Spacer(1,.5*cm),P('以 2026 新竹市文化局史坦威開琴系列「黑白極致・巨擘對話」為例<br/>2026 年 11 月 7 日  新竹市文化局演藝廳音樂廳','fullsubtitle'),
          Spacer(1,.35*cm),P('內容依使用者上傳的《新竹黑白極致音樂會導聆》PDF 整理。保留其演奏家介紹、曲目導聆、延伸影音與資料來源；不納入排程式準備與填寫頁。','fullsmall'),PageBreak()]

raw=TEX.read_text(encoding='utf-8')
raw=raw.split(r'\begin{document}',1)[1].rsplit(r'\end{document}',1)[0]
# The cover above retains its prose; suppress its layout-only TeX block and ToC.
raw=re.sub(r'\\begin\{titlepage\}.*?\\end\{titlepage\}', '', raw, flags=re.S)
raw=raw.replace(r'\tableofcontents','')
raw=raw.replace(r'\label{sec:duo-videos}','')

# Reorder the complete source around its central subject.  The original event
# overview is retained near the end; only Section 13 (preview route and notes)
# is intentionally excluded at the user's request.
chunks = re.split(r'(?=\\section\{)', raw)
by_title = {}
for chunk in chunks:
    match = re.match(r'\\section\{([^{}]+)\}', chunk)
    if match:
        by_title[match.group(1)] = chunk
order = [
    '認識鋼琴：開琴活動在聽什麼',
    '雙鋼琴與八手聯彈的舞台語言',
    '雙鋼琴：從舞台上的對話到教室裡的合作',
    '認識四位演奏家',
    '巴赫：先學會聽見多條旋律',
    '莫札特：D 大調雙鋼琴奏鳴曲 K.448',
    '德布西：黑與白',
    '拉威爾：圓舞曲',
    '土耳其狂想曲：八手聯彈的主題變化',
    '聖桑：骷髏之舞',
    '拉赫曼尼諾夫：風格與延伸聆聽',
    '先看這場音樂會的輪廓',
    '資料來源與版本說明',
]
missing = [title for title in order if title not in by_title]
if missing:
    raise ValueError(f'Missing source sections: {missing}')
raw = '\n'.join(by_title[title] for title in order)

def braced(s, start):
    """Return one balanced braced argument starting at the opening brace."""
    if start>=len(s) or s[start] != '{': return '', start
    level=0
    for i in range(start,len(s)):
        if s[i]=='{': level+=1
        elif s[i]=='}':
            level-=1
            if level==0: return s[start+1:i], i+1
    return s[start+1:],len(s)

def inline(s):
    s=s.strip()
    s=s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    # Table/list conversion inserts these safe ReportLab tags before this stage.
    s=s.replace('&lt;br/&gt;', '<br/>').replace('&lt;b&gt;', '<b>').replace('&lt;/b&gt;', '</b>')
    # Restore actual markup in a controlled way.
    for cmd,tag in [('textbf','b'),('textit','i'),('emph','i')]:
        pattern=r'\\'+cmd+r'\{([^{}]*)\}'
        s=re.sub(pattern,lambda m:f'<{tag}>{m.group(1)}</{tag}>',s)
    s=re.sub(r'\\href\{([^{}]*)\}\{([^{}]*)\}',lambda m:f'<link href="{m.group(1)}" color="#2B6869">{m.group(2)}</link>',s)
    s=re.sub(r'\\src\{([^{}]*)\}',lambda m:f'<font color="#2B6869">[資料 {m.group(1)}]</font>',s)
    s=re.sub(r'\\work\{([^{}]*)\}\{([^{}]*)\}',lambda m:f'<b>{m.group(1)}</b><br/><i>{m.group(2)}</i>',s)
    s=s.replace(r'\par','<br/>').replace(r'\medskip','<br/>').replace(r'\noindent','')
    s=re.sub(r'\\(?:textwidth|smallskip|footnotesize|small|large|Large|LARGE|Huge|bfseries|itshape|color\{[^{}]*\})','',s)
    s=re.sub(r'\\(?:href|textbf|textit|emph)\{','',s)
    s=s.replace(r'\%', '%').replace(r'\&','&amp;').replace('---','—').replace('--','–')
    s=re.sub(r'\\(?:ref|cite)\{[^{}]*\}', '', s)
    s=re.sub(r'\\[a-zA-Z]+(?:\[[^\]]*\])?', '', s)
    s=s.replace('{','').replace('}','').replace('~',' ')
    s=re.sub(r'\s+',' ',s).strip()
    return s

def listen(title, content):
    text=inline(content)
    t=Table([[P(f'<b>{inline(title)}</b><br/>{text}','fullbody')]],colWidths=[16.35*cm])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PAPER),('BOX',(0,0),(-1,-1),.45,colors.HexColor('#8EB1B1')),
        ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
    return [Spacer(1,3),t,Spacer(1,8)]

# Extract reader-facing LaTex constructs in source order.  Tables are rendered
# as readable line-by-line content so no source sentence disappears.
token=re.compile(r'\\(?:section|subsection)\{[^{}]*\}|\\begin\{listen\}\{[^{}]*\}|\\begin\{(?:longtable|tabularx|tabular)\}.*?\\end\{(?:longtable|tabularx|tabular)\}|\\begin\{center\}.*?\\end\{center\}|\\begin\{(?:itemize|enumerate)\}.*?\\end\{(?:itemize|enumerate)\}|\\clearpage',re.S)
pos=0
for m in token.finditer(raw):
    before=inline(raw[pos:m.start()])
    if before: story.append(P(before))
    block=m.group(0)
    if block == r'\clearpage':
        story.append(PageBreak())
    elif block.startswith(r'\section{'):
        story.append(P(inline(block[len(r'\section{'):-1]),'fullh1'))
    elif block.startswith(r'\subsection{'):
        story.append(P(inline(block[len(r'\subsection{'):-1]),'fullh2'))
    elif block.startswith(r'\begin{listen}'):
        title=block[len(r'\begin{listen}{'):].split('}',1)[0]
        # regex token ends at begin: consume through the matching end separately
        end=raw.find(r'\end{listen}',m.end())
        body=raw[m.end():end]
        story.extend(listen(title,body)); pos=end+len(r'\end{listen}'); continue
    elif block.startswith(r'\begin{center}'):
        img_match=re.search(r'\\includegraphics(?:\[[^\]]*\])?\{([^{}]+)\}',block)
        if img_match:
            story.append(image(img_match.group(1)))
        remainder=re.sub(r'\\includegraphics(?:\[[^\]]*\])?\{[^{}]+\}','',block)
        remainder=re.sub(r'\\begin\{center\}|\\end\{center\}','',remainder)
        text=inline(remainder)
        if text: story.append(P(text,'fullcaption'))
    else:
        # Tables and lists: preserve every cell/item as ordered readable lines.
        if r'\toprule' in block:
            # Drop only the column specification, which is LaTex layout code.
            cleaned=re.sub(r'^.*?\\toprule', '', block, count=1, flags=re.S)
        else:
            cleaned=block
        cleaned=re.sub(r'\\(?:begin|end)\{[^{}]*\}(?:\{[^{}]*\})?', '', cleaned)
        cleaned=cleaned.replace(r'\toprule','').replace(r'\midrule','').replace(r'\bottomrule','')
        cleaned=re.sub(r'\\(?:endfirsthead|endhead|endfoot)', '', cleaned)
        cleaned=cleaned.replace(r'\item','<br/>• ').replace(r'\\[6pt]','<br/>').replace(r'\\','<br/>')
        text=inline(cleaned)
        if text: story.append(P(text,'fullsmall'))
    pos=m.end()
tail=inline(raw[pos:])
if tail: story.append(P(tail))

doc.build(story)
