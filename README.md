# papergrapher
Vector Editor based on Paper.js

A working version can be found at https://w00dn.github.io/papergrapher/

## TODO:
add grid with optional alignment  
  
use polylines with MA interpolation instead of Bezier curves for usability  
(lerp, smooth by moving average, lerp the difference from original points, add it to result  
keypoints are integers aligned to grid when dragging, all other points in path are floats)  
  
halftone points / lines / shapes in RGB or CMYK (dither or scatter vector point coordinates by varying random distance)  
storyboards as vectorized photos; connect to Panoramera  
geometrizer / primitive.js  
  
### handle mouse velocity  
http://paperjs.org/features/#mouse-interaction  
http://paperjs.org/tutorials/interaction/mouse-tool-events/  
http://paperjs.org/tutorials/interaction/creating-mouse-tools/  
  
### 3d video soundtrack editor
load audio files as svg stroke-dasharray (lossless or for charting; subpixel stroke / gap ratio is volume,  
x/y is theta/phi, backward stroke data or distance is envelope, text along path is filename to include,  
grouped and layered strokes are spectrum (?))  
