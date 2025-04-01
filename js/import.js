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
				alert(JSON.stringify(imp));
				var items = paper.project.getItems({ class: 'Group' });
				var paths = items[items.length-1].children;
				var d = 5;
				for (var i=0; i<paths.length; i++) {
					for (var j=0; j<paths[i].segments.length; j++) {
						var x = 0;
						var y = 0;
						for (var k=-parseInt(d/2); k<=parseInt(d/2); k++) {
							if (j+k >= 0) {
					   x += paths[i].segments[j+k].point.x;
					   y += paths[i].segments[j+k].point.y;
							} else {
								x += paths[i].segments[paths[i].segments.length+j+k].point.x;
					   y += paths[i].segments[paths[i].segments.length+j+k].point.y;
							}
						}
						paths[i].segments[j].point.x = x / d;
						paths[i].segments[j].point.y = y / d;
					}
				}
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