var width  = 800;
var height = 8000;
var speed = 0.02;
var startTime = Date.now();
var currentTime = Date.now();


var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

var projection = d3.geo.orthographic()
					.scale(200)
					.clipAngle(90);

var graticule = d3.geo.graticule();

var path = d3.geo.path()
	.projection(projection);

/**var pathPos = d3.geo.path()
		.projection(projection)
		.pointRadius(function(id){
			return 5;			
		});
**/

var color = d3.scale.category20();

svg.append("text")
	.attr("id","loading")
	.attr("x",width/2)
	.attr("y",height/2)
	.text("Now Loading...");

d3.json("./world.json", function(error, root) {
	if (error) 
		return console.error(error);
	
	var grid = graticule();
	
	console.log(grid);
	
	var map = svg.append("g")
			.attr('id','map')	
			.attr("transform", "translate(" +  -230 + "," + -20 + ")");
	
	map.append("path")
		.datum( grid )
		.attr("id","grid_id")
		.attr("class","grid_path")
		.attr("d",path);
	
	map.selectAll(".map_path")
			.data( root.features )
			.enter()
			.append("path")
			.attr("class","map_path")
			.attr("fill",function(d,i){
				return color(i);
			})
			.attr("d", path )
			.on("mouseover",function(d,i){
				d3.select(this)
					.attr("fill","yellow");
			})
			.on("mouseout",function(d,i){
				d3.select(this)
					.attr("fill",color(i));
			});;

	svg.select("#loading")
		.attr("opacity",0);
});

//标志当前位
/**var curPos = { 
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				
			},
			"geometry": {
				"type": "Point",
				"coordinates": [-156.489,57.3437]
			},
			"id": "mb80095989"
		}
	]
}
var posCircleG = svg.selectAll('g')
		.data(curPos.features)
		.enter()
		.append('g')
		.attr('id','pos-circle');
var posCircle = svg.select('#pos-circle').append('path');

function drawPos (){	
	posCircle.attr({
			d: pathPos,
			fill: 'none',
			stroke: 'red',
			'stroke-width': '2px'
		})
}


svg.call(
	d3.behavior.drag()
	.origin(function(){
		r = projection.rotate();
		return {
			x: r[0],
			y: -r[1]
		}
	})
	.on('drag',function(){
		rotate = projection.rotate();
		projection.rotate([
			d3.event.x,
			-d3.event.y,
			rotate[2]
		]);
		svg.selectAll('path')
			.attr('d',path);
		drawPos();
	})
);















**/
