// functions related to importing

pg.import = function () {
	
	var importAndAddExternalImage = function (url){
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			var reader = new FileReader();
			reader.onloadend = function () {
				importAndAddImage(reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	};
	
	
	var importAndAddImage = function (src) {
		new paper.Raster({
			source: src,
			position: paper.view.center
		});
		pg.undo.snapshot('importImage');
	};
	
	
	var importAndAddSVG = function (svgString) {
		paper.project.importSVG(svgString, {
			expandShapes: true, 
			onLoad: function(imp, svg) {
			try {
				var w = 3;
				var corner = 0.3;
				var items = paper.project.getItems({ class: 'Group' });
				var paths = items[items.length-1].getItems({ class: 'Path' });
				for (var i=0; i<paths.length; i++) {
					var diffs = [];
					var corners = [];
					for (var j=0; j<paths[i].segments.length; j++) {
						var x = 0;
					 var y = 0;
						for (var k=j-parseInt(w/2); k<=j+parseInt(w/2); k++) {
							if (k>=0 && k<paths[i].segments.length) {
								x += paths[i].segments[k].point.x;
								y += paths[i].segments[k].point.y;
							} else if (k<0) {
								x += paths[i].segments[paths[i].segments.length+k].point.x;
								y += paths[i].segments[paths[i].segments.length+k].point.y;
							} else if (k>=paths[i].segments.length) {
								x += paths[i].segments[k-paths[i].segments.length].point.x;
								y += paths[i].segments[k-paths[i].segments.length].point.y;
							}
						}
						diffs[j] = (Math.abs(paths[i].segments[j].point.x - x/w) + Math.abs(paths[i].segments[j].point.y - y/w));
						if (diffs[j] >= Math.sqrt(2)*corner) {
							corners[j] = true;
						} else if (diffs[j] >= corner) {
							corners[j] = null;
							paths[i].segments[j].point.x = x/w;
						 paths[i].segments[j].point.y = y/w;
						} else {
							corners[j] = false;
							paths[i].segments[j].point.x = x/w;
						 paths[i].segments[j].point.y = y/w;
						}
					}
					var j=0;
					while (paths[i].segments[j]) {
						if (corners[j] === false) {
							paths[i].segments.splice(j,1);
							diffs.splice(j,1);
							corners.splice(j,1);
						} else {
							j++;
						}
					}
					paths[i].smooth();
					var j=0;
					while (paths[i].segments[j]) {
						if (corners[j] === true) {
							paths[i].segments[j].clearHandles();
						}
						j++;
					}
				}
				items[items.length-1].scale(7.5);
			} catch(e) {alert(e);}
		 }
		});
		pg.undo.snapshot('importAndAddSVG');
		paper.project.view.update();
	};
	
	
	return {
		importAndAddImage: importAndAddImage,
		importAndAddExternalImage: importAndAddExternalImage,
		importAndAddSVG: importAndAddSVG
	};
}();