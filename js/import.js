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
			onLoad: function(item, svg) {
				try {
				alert(paper.project.getItems({ class: 'Group' }));
				for (var i=0; i<item.children.length; i++) { //groups by color
					for (var j=1; j<item.children[i].children.length; j++) { //paths
						var p = item.children[i].children[j];
						if (p.fillColor.lightness < 1.0) {
							item.children[i].children[0].replaceWith(
							 item.children[i].children[0].unite(item.children[i].children[j])
							);
						} else {
							item.children[i].children[0].replaceWith(
							 item.children[i].children[0].subtract(item.children[i].children[j])
							);
						}
					}
				}
				} catch(e) {alert(e)}
				return item;
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