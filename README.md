# papergrapher
Vector Editor based on Paper.js

A working version can be found at https://w00dn.github.io/papergrapher/

## TODO:
raster image tracer (use metaballs example, gist for findContours, or geometrizer / primitive.js)  
vectors are low-res pictures detailed gradually (~kanji or progressive jpeg), halftone points / lines / shapes in RGB or CMYK    
storyboards as vectorized photos; connect to Panoramera  
  
### handle mouse velocity  
http://paperjs.org/features/#mouse-interaction  
http://paperjs.org/tutorials/interaction/mouse-tool-events/  
http://paperjs.org/tutorials/interaction/creating-mouse-tools/  
  
### 3d video soundtrack editor
load audio files as svg stroke-dasharray (lossless or for charting; subpixel stroke / gap ratio is volume,  
x/y is theta/phi, backward stroke data or distance is envelope, text along path is filename to include,  
grouped and layered strokes are spectrum (?))  
