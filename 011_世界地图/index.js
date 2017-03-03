var width = window.innerWidth,
    height = window.innerHeight;
	
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

var projection = d3.geo.mercator()
	.center([103,35])
	.scale(800)
	.translate([width/2,height/2]);

var path = d3.geo.path()
	.projection(projection);

d3.json('./world.json',function(ret){
	var projection = d3.geo.mercator();
	var oldScala = projection.scale();
	var oldTranslate = projection.translate();

	xy = projection.scale(oldScala * (width / oldTranslate[0] / 2) * 0.5)
		.translate([width / 2, height / 2]);
		  
	path = d3.geo.path().projection(xy);
	svg.append('g')
		.selectAll('path')
		.data(ret.features)
		.enter()
		.append('path')
		.attr('d', path)
		.on('mouseover', function(data) {
			d3.select(this).attr('fill', 'rgba(2,2,139,0.61)');
		})
		.on('mouseout', function(data) {
			d3.select(this).attr('fill', 'rgba(128,124,139,0.61');
		})
		.attr('fill', 'rgba(128,124,139,0.61)')
		.attr('stroke', 'rgba(255,255,255,1)')
		.attr('stroke-width', 1);
})

