import os
import re
import glob

files = glob.glob('src/**/*.tsx', recursive=True)

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Replace bg-[#080808] with bg-background
    content = content.replace('bg-[#080808]', 'bg-background')
    
    # Replace text-white with text-foreground, EXCEPT when followed by /
    content = re.sub(r'text-white(?!/|\w)', 'text-foreground', content)
    
    # Replace text-white/XX with text-foreground/XX
    content = re.sub(r'text-white/([0-9]+)', r'text-foreground/\1', content)
    
    # Replace bg-white/XX with bg-foreground/XX
    content = re.sub(r'bg-white/([0-9]+)', r'bg-foreground/\1', content)
    
    # Replace border-white/XX with border-foreground/XX
    content = re.sub(r'border-white/([0-9]+)', r'border-foreground/\1', content)
    
    # Replace border-white with border-foreground (if no / after)
    content = re.sub(r'border-white(?!/|\w)', 'border-foreground', content)

    # Specifics for solid buttons that used bg-white text-black
    content = content.replace('bg-white px-6', 'bg-foreground px-6')
    content = content.replace('text-black', 'text-background')

    # In Navbar, there's `bg-white px-4` inside mobile menu
    content = content.replace('bg-white px-4', 'bg-foreground px-4')
    
    # Any remaining solid bg-white that aren't parts of other words
    # be careful not to break things, maybe `bg-white` -> `bg-foreground`
    content = re.sub(r'bg-white(?!/|\w)', 'bg-foreground', content)

    with open(f, 'w') as file:
        file.write(content)
print("Done fixing themes in tsx files")
