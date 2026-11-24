import sys, json
from PIL import Image, ImageDraw
Image.MAX_IMAGE_PIXELS=None
im=Image.open('/mnt/user-data/uploads/5705809a-image.jpg').convert('RGB')
pts=json.load(open(sys.argv[1])); out=sys.argv[2]
R=260; cell=520; cols=4
rows=(len(pts)+cols-1)//cols
sheet=Image.new('RGB',(cols*cell,rows*(cell+30)),'white')
d=ImageDraw.Draw(sheet)
for i,(name,x,y) in enumerate(pts):
    c=im.crop((x-R,y-R,x+R,y+R)); cd=ImageDraw.Draw(c)
    cd.line((R-30,R,R+30,R),fill='red',width=2); cd.line((R,R-30,R,R+30),fill='red',width=2)
    gx,gy=(i%cols)*cell,(i//cols)*(cell+30)
    sheet.paste(c,(gx,gy+30)); d.text((gx+5,gy+8),f'{name} ({x},{y})',fill='black')
sheet.save(out)
