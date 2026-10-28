import sys
from PIL import Image

img_path = "/Users/27-cfiad-alorredo/.gemini/antigravity-cli/brain/492bd496-457a-4066-84ce-f2856a49d3e0/al_logo_bold_1790586156823.jpg"
img = Image.open(img_path).convert("L")

w, h = img.size

# The logo is centered. Let's crop tighter on the bottom.
# Previous was: 212, 120, 812, 720. 
# Let's try 212, 120, 812, 630 to remove the text.
crop_box = (212, 120, 812, 630)
img_cropped = img.crop(crop_box)

def threshold(pixel):
    if pixel < 230:
        return 0 # black
    return 255 # white

img_bw = img_cropped.point(threshold, mode='1')

# To make sure we don't have empty space at the top/sides, we can find the bounding box
bbox = img_bw.getbbox()
if bbox:
    # getbbox returns (left, upper, right, lower) of the non-zero regions.
    # since our logo is 0 (black) and background is 255 (white), we need to invert first
    from PIL import ImageOps
    img_inv = ImageOps.invert(img_bw.convert('L'))
    bbox = img_inv.getbbox()
    if bbox:
        img_bw = img_bw.crop(bbox)

img_rgba_black = img_bw.convert("RGBA")
datas = img_rgba_black.getdata()

new_data_black = []
new_data_white = []

for item in datas:
    if item[0] == 255:
        new_data_black.append((255, 255, 255, 0))
        new_data_white.append((255, 255, 255, 0))
    else:
        new_data_black.append((0, 0, 0, 255))
        new_data_white.append((255, 255, 255, 255))

img_rgba_black.putdata(new_data_black)
img_rgba_white = Image.new("RGBA", img_rgba_black.size)
img_rgba_white.putdata(new_data_white)

img_rgba_black.save("public/logo-black.png")
img_rgba_white.save("public/logo-white.png")
print("Saved tighter cropped transparent PNGs")
