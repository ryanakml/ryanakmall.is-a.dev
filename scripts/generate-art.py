"""Original editorial raster illustrations; not product screenshots or runtime evidence.

Run with Python 3 and Pillow. Official OFL font masters are
read in memory; the website itself uses the separate self-hosted WOFF2 files.
"""
from io import BytesIO
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import quote
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'art'
OUT.mkdir(parents=True, exist_ok=True)
S = 2
SIZE = (1400, 1000)
STONE = '#e8e6df'
PAPER = '#f7f6f0'
BLUE = '#1843dc'
SLATE = '#24363f'
PALE = '#b5c9dc'
TEAL = '#0d7480'


def load_master(name, filename):
    url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{name}/' + quote(filename)
    return urlopen(url).read()


ARCHIVO = load_master('archivo', 'Archivo[wdth,wght].ttf')
ALBERT = load_master('albertsans', 'AlbertSans[wght].ttf')


def font(size, weight=500, condensed=False):
    f = ImageFont.truetype(BytesIO(ARCHIVO if condensed else ALBERT), round(size * S))
    axes = f.get_variation_axes()
    values = []
    for axis in axes:
        name = axis['name'].decode() if isinstance(axis['name'], bytes) else axis['name']
        values.append(weight if 'Weight' in name else (76 if condensed and 'Width' in name else axis['default']))
    f.set_variation_by_axes(values)
    return f


def canvas(bg):
    im = Image.new('RGB', (SIZE[0] * S, SIZE[1] * S), bg)
    return im, ImageDraw.Draw(im)


def rect(d, xy, fill):
    d.rectangle(tuple(round(v * S) for v in xy), fill=fill)


def line(d, points, fill, width=8):
    d.line([(round(x*S), round(y*S)) for x,y in points], fill=fill, width=round(width*S), joint='curve')


def text(d, xy, words, size=36, fill=SLATE, weight=500, condensed=False, spacing=1.03):
    f = font(size, weight, condensed)
    x, y = xy
    for row in words.split('\n'):
        d.text((round(x*S),round(y*S)),row,font=f,fill=fill,anchor='lt')
        y += size * spacing


def arrow(d, a, b, fill, width=10, head=23):
    line(d, [a,b], fill, width)
    x,y=b
    if b[0]>=a[0]:
        d.polygon([(x*S,y*S),((x-head)*S,(y-head*.7)*S),((x-head)*S,(y+head*.7)*S)],fill=fill)
    else:
        d.polygon([(x*S,y*S),((x+head)*S,(y-head*.7)*S),((x+head)*S,(y+head*.7)*S)],fill=fill)


def save(im, name):
    im.resize(SIZE, Image.Resampling.LANCZOS).save(OUT / name, optimize=True)


def flowdesk():
    im,d=canvas(STONE)
    text(d,(65,64),'FlowDesk',58,weight=600,condensed=True)
    text(d,(65,165),'The work continues\nafter the message.',92,weight=600,condensed=True,spacing=.98)

    # Three different spatial objects carry the actual message/storage/worker path.
    rect(d,(65,430,390,783),BLUE)
    text(d,(93,463),'Incoming',34,PAPER)
    text(d,(91,521),'event',105,PAPER,650,True)
    text(d,(94,707),'WhatsApp',30,PAPER)

    arrow(d,(408,605),(495,605),SLATE)
    rect(d,(517,422,846,774),SLATE)
    rect(d,(538,405,825,428),PALE)
    rect(d,(558,388,804,405),PAPER)
    text(d,(545,470),'PostgreSQL',48,PAPER,550,True)
    text(d,(545,551),'Stored event',34,PAPER)
    rect(d,(544,637,820,743),PAPER)
    text(d,(565,668),'Outbox',49,SLATE,600,True)

    arrow(d,(864,605),(951,605),SLATE)
    rect(d,(975,430,1335,783),PALE)
    text(d,(1004,463),'Background',34,SLATE)
    text(d,(1002,521),'worker',100,SLATE,650,True)
    text(d,(1004,707),'Process the task',30,SLATE)
    text(d,(65,875),'Receive. Store. Process.',35,SLATE)
    text(d,(925,881),'Editorial architecture study',25,SLATE)
    save(im,'flowdesk.png')


def deadbolt():
    im,d=canvas(SLATE)
    text(d,(65,64),'Deadbolt',58,PAPER,600,True)
    text(d,(65,167),'Who can\nstill write?',112,PAPER,600,True,spacing=.94)
    # Parallel claims meet one explicit fence: an ownership question, no live run.
    text(d,(66,458),'Earlier claim',34,PALE)
    rect(d,(65,519,470,658),STONE)
    text(d,(93,553),'Worker A',63,SLATE,600,True)
    arrow(d,(491,588),(804,588),PALE,width=12)
    rect(d,(836,446,867,881),BLUE)
    line(d,[(769,554),(815,622)],PAPER,12)
    line(d,[(815,554),(769,622)],PAPER,12)
    text(d,(913,559),'Stale claim',43,PAPER,500,True)

    text(d,(66,702),'Current claim',34,PALE)
    rect(d,(65,759,470,899),BLUE)
    text(d,(93,794),'Worker B',63,PAPER,600,True)
    arrow(d,(491,828),(1235,828),PAPER,width=12)
    text(d,(914,742),'Ownership check',43,PAPER,500,True)
    text(d,(804,392),'Fence',34,PAPER)
    text(d,(940,68),'Conceptual study\nCollaborative work',27,PALE,spacing=1.3)
    save(im,'deadbolt.png')


def contribution():
    im,d=canvas(PAPER)
    text(d,(65,64),'Celery contribution',58,SLATE,600,True)
    text(d,(65,166),'A small character.\nA real path.',92,SLATE,600,True,spacing=.98)
    rect(d,(65,432,499,877),BLUE)
    text(d,(125,557),'~',620,PAPER,500,True)
    text(d,(98,801),'Home shorthand',29,PAPER)

    arrow(d,(532,649),(691,649),SLATE,width=12)
    rect(d,(727,432,1335,877),STONE)
    text(d,(766,489),'home',143,SLATE,600,True)
    text(d,(773,663),'directory',85,SLATE,500,True)
    text(d,(772,802),'Expanded before worker start',29,SLATE)
    text(d,(65,934),'Multi-worker path expansion',29,SLATE)
    text(d,(1053,934),'Editorial illustration',25,SLATE)
    save(im,'contribution.png')


if __name__ == '__main__':
    flowdesk()
    deadbolt()
    contribution()
    for path in sorted(OUT.glob('*.png')):
        image=Image.open(path)
        print(f'{path.relative_to(ROOT)}: {image.width}×{image.height}, {path.stat().st_size:,} bytes')
