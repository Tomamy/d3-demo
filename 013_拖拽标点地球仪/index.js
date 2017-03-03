d3.json("pos.json", function(posData) {
	d3.json("world.json", function(worldData) {
		
		var projection = d3.geo.orthographic()
			.scale(225)
			.translate([300,300])
			.clipAngle(90);

		var path = d3.geo.path()
			.projection(projection);

		var pathPos= d3.geo.path()
			.projection(projection)
			.pointRadius(function(it) { 
				return 5; 
			});
		
		var countries = worldData.features;

		var color = d3.scale.category20();

		var polygon = d3.select('body')
			.append("svg")
			.attr('width',800)
			.attr('height',800)
			.attr('id','svg')
			.selectAll("path")
			.data(countries)
			.enter()
			.append("path").attr({
				"d": path,
				"stroke":function(){
					return "#bbb";
				},
				"fill":function(d){
					return "#ccc";
				}
		  }); 

		d3.select("#svg")
			.selectAll("g.path-pos")
			.data(posData.features)
			.enter()
			.append("g")
			.attr("class", "path-pos");

		var circlePathPos = d3.select("#svg")
			.selectAll("g.path-pos")
			.append("path");
		
		
		var updatePos = function() {
		  circlePathPos.attr({
			d: pathPos,
			fill: "none",
			stroke: "#f00"
		  });
		};


		d3.select("#svg").call(
			d3.behavior.drag()
			.origin(function() {
				r = projection.rotate();
				return {x: r[0], y: -r[1]};
			})
			.on("drag", function() {
				rotate = projection.rotate();
				projection.rotate([d3.event.x, -d3.event.y, rotate[2]]);
				d3.select("#svg").selectAll("path").attr("d", path);
				updatePos();
			})
		);
		updatePos();
	});
});
