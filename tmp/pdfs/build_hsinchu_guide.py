from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer,
    Image, KeepTogether, Table, TableStyle
)
from reportlab.platypus.flowables import HRFlowable
from pathlib import Path

ROOT = Path('/Users/weijingwang/Downloads/新竹黑白極致音樂會導聆')
OUT = Path('/Users/weijingwang/Documents/GitHub/music-and-culture-guides/output/pdf/2026-11-07-新竹黑白極致巨擘對話音樂會導聆.pdf')

# Embed a local Traditional-Chinese system font.  CID base fonts look correct in
# macOS Preview but are not portable to PDF renderers without Adobe CMap packs.
pdfmetrics.registerFont(TTFont('STHeiti', '/System/Library/Fonts/STHeiti Medium.ttc', subfontIndex=0))
FONT = 'STHeiti'
INK = colors.HexColor('#24333D')
TEAL = colors.HexColor('#2B6869')
GOLD = colors.HexColor('#A57A43')
PAPER = colors.HexColor('#F3F5F2')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CJKBody', fontName=FONT, fontSize=10.2, leading=16,
                          textColor=INK, spaceAfter=7, alignment=TA_LEFT))
styles.add(ParagraphStyle(name='CJKSmall', fontName=FONT, fontSize=8.5, leading=12,
                          textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle(name='CJKTitle', fontName=FONT, fontSize=28, leading=38,
                          textColor=INK, alignment=TA_CENTER, spaceAfter=10))
styles.add(ParagraphStyle(name='CJKSubTitle', fontName=FONT, fontSize=15, leading=24,
                          textColor=TEAL, alignment=TA_CENTER, spaceAfter=12))
styles.add(ParagraphStyle(name='CJKH1', fontName=FONT, fontSize=18, leading=26,
                          textColor=TEAL, spaceBefore=5, spaceAfter=10))
styles.add(ParagraphStyle(name='CJKH2', fontName=FONT, fontSize=13, leading=20,
                          textColor=INK, spaceBefore=5, spaceAfter=6))
styles.add(ParagraphStyle(name='CJKCaption', fontName=FONT, fontSize=8.5, leading=12,
                          textColor=TEAL, alignment=TA_CENTER, spaceAfter=8))
styles.add(ParagraphStyle(name='CJKLink', fontName=FONT, fontSize=9.3, leading=14,
                          textColor=TEAL, spaceAfter=4))
styles.add(ParagraphStyle(name='CJKQuote', fontName=FONT, fontSize=10, leading=16,
                          textColor=INK, leftIndent=10, rightIndent=10, spaceBefore=6, spaceAfter=8))

def p(text, style='CJKBody'):
    return Paragraph(text, styles[style])

def link(label, url):
    return p(f'<link href="{url}" color="#2B6869">{label}</link>', 'CJKLink')

def image(name, width=14.2*cm):
    path = ROOT / name
    im = Image(str(path))
    ratio = im.imageHeight / im.imageWidth
    im.drawWidth = width
    im.drawHeight = width * ratio
    return im

def listening(title, text):
    t = Table([[p(f'<b>{title}</b><br/>{text}', 'CJKQuote')]], colWidths=[16.4*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), PAPER),
        ('BOX', (0,0), (-1,-1), .5, colors.HexColor('#8EB1B1')),
        ('LEFTPADDING', (0,0), (-1,-1), 8), ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    return [Spacer(1, 3), t, Spacer(1, 8)]

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#B7C9C9'))
    canvas.line(2.2*cm, 1.35*cm, A4[0]-2.2*cm, 1.35*cm)
    canvas.setFont(FONT, 8)
    canvas.setFillColor(TEAL)
    canvas.drawString(2.2*cm, .85*cm, '黑白極致 巨擘對話  2026 新竹市文化局史坦威開琴系列')
    canvas.drawRightString(A4[0]-2.2*cm, .85*cm, f'{doc.page}')
    canvas.restoreState()

doc = BaseDocTemplate(str(OUT), pagesize=A4, leftMargin=2.2*cm, rightMargin=2.2*cm,
                      topMargin=2.1*cm, bottomMargin=1.8*cm)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='main')
doc.addPageTemplates([PageTemplate(id='all', frames=[frame], onPage=header_footer)])
story = []

# Cover
story += [Spacer(1, 1.5*cm), p('2026  HSINCHU', 'CJKSubTitle'), Spacer(1, .5*cm),
          p('黑白極致', 'CJKTitle'), p('巨擘對話', 'CJKTitle'),
          p('名家音樂會導聆', 'CJKSubTitle'),
          Spacer(1, .2*cm)]
cover_table = Table([[p('<b>PIANO I</b>', 'CJKSubTitle'), p('<b>PIANO II</b>', 'CJKSubTitle')]],
                    colWidths=[8.1*cm, 8.1*cm], rowHeights=[1.4*cm])
cover_table.setStyle(TableStyle([('BACKGROUND',(0,0),(0,0),INK),('BACKGROUND',(1,0),(1,0),colors.white),
    ('BOX',(0,0),(-1,-1),1,TEAL),('TEXTCOLOR',(0,0),(0,0),colors.white),
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ALIGN',(0,0),(-1,-1),'CENTER')]))
story += [cover_table, Spacer(1, 1.0*cm), p('2026 年 11 月 7 日 星期六  14:30', 'CJKSubTitle'),
          p('新竹市文化局演藝廳音樂廳<br/>新竹市北區東大路二段 17 號', 'CJKBody'),
          Spacer(1, .3*cm), p('嚴俊傑  盧易之  汪奕聞  Peter Ovcharov', 'CJKSubTitle'), Spacer(1, 1.5*cm),
          p('兩台史坦威 D-274 首度並置。這份手冊讓你先辨認聲音的路徑：旋律如何換手、節奏如何傳遞、兩台琴如何在同一個空間裡形成一段對話。', 'CJKQuote'),
          Spacer(1, 1.5*cm), p('本手冊為個人聆聽導引，曲序、樂章、版本與演出分工以現場節目單為準。所有「試聽」均為預習參考，非本場演出者。', 'CJKSmall'), PageBreak()]

# Event map
story += [p('先帶三個問題進音樂廳', 'CJKH1'),
          p('這場開琴音樂會以雙鋼琴與八手聯彈，讓四位演奏家在兩台新琴上合作。不要急著辨認每個音；先把注意力放在「誰正在說話」、「誰在托住句子」、「聲音如何收尾」三件事。'),
          p('旋律的交接', 'CJKH2'), p('先抓住一條容易辨認的旋律。它換到另一台琴時，新的演奏者如何接住原本的速度、音量和語氣？'),
          p('伴奏與低音', 'CJKH2'), p('在旋律下方，固定節奏、和聲與低音常是音樂前進的力量。試著暫時不追旋律，聽十秒鐘的低音。'),
          p('收音與餘韻', 'CJKH2'), p('雙鋼琴各有獨立踏板與共鳴。留意一句結束後，何時真正安靜；下一句又如何不突兀地進來。')]
story += listening('現場比較兩台新琴', '低音是否厚實而仍清楚？中音的旋律能否自然延展？高音快速音群是否明亮、細緻？弱音與結尾的餘韻如何漸漸消失？音色也會受到演奏者、曲目、座位與廳堂影響。')
data = [[p('<b>公布作品</b>', 'CJKSmall'), p('<b>先聽什麼</b>', 'CJKSmall')],
        [p('巴赫／拉赫曼尼諾夫', 'CJKSmall'), p('曲名待正式節目單公布；前者可追聲部模仿，後者可追長旋律與低音。', 'CJKSmall')],
        [p('莫札特 K.448', 'CJKSmall'), p('最清楚的旋律接力與句尾呼吸。', 'CJKSmall')],
        [p('德布西《黑與白》', 'CJKSmall'), p('和聲顏色、踏板與兩台琴的明暗對照。', 'CJKSmall')],
        [p('拉威爾《圓舞曲》', 'CJKSmall'), p('三拍子由朦朧到失控的累積。', 'CJKSmall')],
        [p('《土耳其狂想曲》／《骷髏之舞》', 'CJKSmall'), p('八手的主題分配、重音與身體協作。', 'CJKSmall')]]
t = Table(data, colWidths=[4.1*cm,12.1*cm])
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),TEAL),('TEXTCOLOR',(0,0),(-1,0),colors.white),
    ('GRID',(0,0),(-1,-1),.4,colors.HexColor('#D9D9D9')),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('BACKGROUND',(0,2),(-1,2),PAPER),('BACKGROUND',(0,4),(-1,4),PAPER),
    ('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
story += [Spacer(1, 5), t, PageBreak()]

# artists
story += [p('四位演奏家與合作舞台', 'CJKH1'), image('Pianists.png', 15.2*cm), p('嚴俊傑、盧易之、汪奕聞與 Peter Ovcharov。插畫依人物照片創作，非現場演出實況。', 'CJKCaption'),
          p('嚴俊傑', 'CJKH2'), p('長期以經典、新作與跨域策畫並行；可留意他在旋律交給夥伴後，如何調整伴奏與音量。'),
          p('盧易之', 'CJKH2'), p('演奏、編曲與創作並行；可以跟著較長旋律，聽伴奏怎麼替它留出空間。'),
          p('汪奕聞', 'CJKH2'), p('獨奏與室內樂經驗兼備；特別留意弱音裡的旋律，以及短音型在兩台琴之間的交接。'),
          p('Peter Ovcharov', 'CJKH2'), p('亦見拼作 Peter Ovtcharov；快速音群之外，也可聽內聲與低音如何讓層次清楚。')]
story += listening('看得到的合作訊號', '開始前的吸氣、抬手或眼神，常是共同進入的提示；在結尾處，觀察兩人或四人如何一起放慢、收音。第一鋼琴與第二鋼琴只是分譜名稱，主導旋律的人會不斷改變。')
story += [PageBreak()]

def work_page(title, subtitle, img, paragraphs, focus, links):
    story.append(p(title, 'CJKH1'))
    story.append(p(subtitle, 'CJKBody'))
    story.append(image(img))
    story.append(Spacer(1, 3))
    for h, body in paragraphs:
        story.append(p(h, 'CJKH2'))
        story.append(p(body))
    story.extend(listening('本曲聽點', focus))
    for label, url in links:
        story.append(link(label, url))
    story.append(PageBreak())

work_page('莫札特  D 大調雙鋼琴奏鳴曲 K 448', 'W. A. Mozart  Sonata for Two Pianos in D major  K.448', 'Mozart_Two_Pianos.png', [
    ('像對話一樣清楚', '這首作品寫於 1781 年的維也納時期。兩台琴都能主動提出想法，也能立刻回應對方；它是辨認雙鋼琴合作最容易的入口。'),
    ('三個樂章的路徑', '第一樂章的快板重在敏捷接力；第二樂章讓旋律更舒展；第三樂章以輕巧快速的主題反覆推進。實際演出樂章以現場節目單為準。')],
    '當快速音群換到另一台琴時，速度、力度與句尾是否像同一個人說下去？兩台琴同時奏出重音時，是否整齊卻不僵硬？',
    [('試聽 阿格麗希與巴倫波因演奏 K.448', 'https://youtu.be/USl7qUWU33k'), ('試聽 交響情人夢片段 K.448 第一樂章', 'https://youtu.be/Cuit0WR_NYU')])

work_page('德布西  黑與白', 'Claude Debussy  En blanc et noir  1915', 'Debussy_En_Blanc_Et_Noir.png', [
    ('不是只有黑鍵與白鍵', '作品完成於 1915 年，三首的性格從激烈到陰暗、再到敏捷詼諧。標題也提醒我們，兩台琴能以音域、和聲與觸鍵創造光影般的對比。'),
    ('三種聲音狀態', '第一首節奏與重音不斷移動；第二首以低音、停頓和不易解決的和聲形成沉重感；第三首則用短促動機與敏捷節奏把材料拋來接去。')],
    '聽哪些地方延音讓和聲相連，哪些地方又收得乾淨。兩位演奏者如何協調踏板與收音，讓色彩濃厚而聲部依然清楚？',
    [('試聽 阿格麗希與 Iddo Bar Shai 演奏 黑與白', 'https://youtu.be/HHZ3RYAHq20')])

work_page('拉威爾  圓舞曲', 'Maurice Ravel  La Valse  雙鋼琴版本', 'Ravel_La_Valse.png', [
    ('由霧中浮現的三拍子', '開頭先是低音與零碎舞曲片段，三拍子的脈動逐漸變清楚，完整旋律才慢慢浮現。'),
    ('華麗如何變成張力', '後段音符愈來愈密、重音更突出，兩台琴的聲響不斷加厚。這不是一個固定的故事，而是讓你直接感受節奏、力度與速度如何轉變。')],
    '先找三拍子，再追低音與短音型。高潮裡，兩台琴怎麼分配旋律、和聲和節奏，仍讓舞曲骨架保持清楚？',
    [('試聽 阿格麗希與 Nelson Freire 演奏 圓舞曲', 'https://youtu.be/Q0Qo1anGvfQ')])

work_page('土耳其狂想曲', 'Turkish Rhapsody  八手聯彈  本場作者與改編版本待確認', 'Turkish_Rhapsody.png', [
    ('把熟悉素材重新切開', '其他音樂會曾演出 Mozart / Vyacheslav Gryaznov 的八手版本，可能取材自莫札特 K.331 終樂章的土耳其風格；新竹場是否相同，仍待正式節目單確認。'),
    ('四人如何讓主題不消失', '狂想曲常自由地擴展素材：旋律可能被延長、拆分、移到低音，或由四人一起推到高潮。')],
    '主題現在由誰說？其他三人正在提供低音、和聲還是打擊般的節奏？突然停頓後，四人如何共同重新進入？',
    [('延伸閱讀 琴弦狂舞 2 0 八手節目資料', 'https://www.opentix.life/event/2011709863623639041')])

work_page('聖桑  骷髏之舞', 'Camille Saint Saens  Danse macabre Op.40  八手改編', 'Saint_Saens_Danse_Macabre.png', [
    ('午夜、死神與天亮', '原作描繪午夜十二下鐘聲、死神的小提琴與骷髏跳舞；到雞啼天亮，舞群才退去。管弦樂版還以木琴描寫骨骼碰撞。'),
    ('鋼琴怎麼扮演樂團', '八手改編會以不同音域、短長觸鍵和聲部分配，分別帶出鐘聲、旋律與敲擊感。不同改編版本的細節可能不同。')],
    '短而清脆的高音像不像骨骼碰撞？延展旋律如何接住原本小提琴的角色？結尾接近天亮時，聲部和音量怎麼慢慢變薄？',
    [('試聽 八手聯彈版本', 'https://youtu.be/E2cIH5tMAoA'), ('試聽 管弦樂版本', 'https://youtu.be/LxKQpEVYWog')])

# Closing listening / notes
story += [p('巴赫與拉赫曼尼諾夫  留給現場的耳朵', 'CJKH1'),
          p('公開介紹提到巴赫與拉赫曼尼諾夫，但尚未列出曲名。這正好是把導聆從「認作品」轉成「聽寫法」的機會。'),
          p('巴赫', 'CJKH2'), p('選一個短音型，聽它是否換到另一個音域或另一台琴。高音繁忙時，暫時追蹤低音，常會發現它也是一條完整旋律。現代鋼琴的踏板與延音，尤其考驗聲部是否清楚。'),
          p('拉赫曼尼諾夫', 'CJKH2'), p('不必追逐所有音符：先抓住寬廣的旋律，再聽內聲與深沉低音如何逐步增加重量。高潮時，旋律是否仍浮在厚重音響之上？'),
          p('三十分鐘預習路線', 'CJKH1'),
          p('莫札特約八分鐘，熟悉旋律交接；德布西約七分鐘，比較快速交錯與緩慢陰影；拉威爾約十分鐘，追三拍子如何加厚；《骷髏之舞》八手約五分鐘，觀察四人的聲部分工。'),
          p('演後筆記', 'CJKH1')]
story += listening('今天最想帶走的聲音', '印象最深刻的音色或段落：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿<br/>最值得記下的旋律交接或共同收尾：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿<br/>想回家再聽的作品與原因：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿')
story += [p('資料與版本說明', 'CJKH1'),
          p('本手冊依活動公開資訊與所附既有導聆素材整理。史坦威 D-274、曲目背景、演奏家介紹與延伸試聽來源皆可由 PDF 內的超連結開啟。巴赫、拉赫曼尼諾夫與《土耳其狂想曲》的曲名或版本未獲正式節目單確認者，均以「待確認」標示。查核資料日期：2026 年 11 月 1 日。', 'CJKSmall'),
          link('活動資訊 OPENTIX', 'https://www.opentix.life/event/2089958531710963713'),
          link('史坦威 D 274 官方規格', 'https://eu.steinway.com/en/pianos/grand-pianos/d-274')]

doc.build(story)
