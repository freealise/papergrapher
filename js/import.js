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
				var items = paper.project.getItems({ class: 'Group' });
				var paths = items[items.length-1].getItems({ class: 'Path' });
				for (var i=0; i<paths.length; i++) {
					for (var j=0; j<paths[i].segments.length; j++) {
						var x = 0;
					 var y = 0;
						for (var k=j-parseInt(w/2); k<=j+parseInt(w/2); k++) {
							if (k>=0) {
								x += paths[i].segments[k].point.x;
								y += paths[i].segments[k].point.y;
							} else {
								x += paths[i].segments[paths[i].segments.length+k].point.x;
								y += paths[i].segments[paths[i].segments.length+k].point.y;
							}
						}
						paths[i].segments[j].point.x = x/w;
						paths[i].segments[j].point.y = y/w;
					}
				}
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