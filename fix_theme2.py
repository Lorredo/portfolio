import os
import re
import glob

files = glob.glob('src/**/*.tsx', recursive=True)

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Catch bg-white/[...]
    content = re.sub(r'bg-white/(\[[^\]]+\])', r'bg-foreground/\1', content)
    # Also catch border-white/[...] just in case
    content = re.sub(r'border-white/(\[[^\]]+\])', r'border-foreground/\1', content)
    # Also text-white/[...]
    content = re.sub(r'text-white/(\[[^\]]+\])', r'text-foreground/\1', content)
    
    with open(f, 'w') as file:
        file.write(content)
print("Done fixing bracket theme strings")
