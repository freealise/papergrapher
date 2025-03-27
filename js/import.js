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
				var items = paper.project.getItems({ class: 'Group' });
				
				for (var i=0; i<items.length; i++) { //groups by color
					for (var j=1; j<items[i].children.length; j++) { //paths
						var p = items[i].children[j];
						if (p.fillColor.lightness < 1.0) {
							items[i].children[0].replaceWith(
							 items[i].children[0].unite(items[i].children[j])
							);
						} else {
							items[i].children[0].replaceWith(
							 items[i].children[0].subtract(items[i].children[j])
							);
						}
					}
				}
				} catch(e) {alert(e)}
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