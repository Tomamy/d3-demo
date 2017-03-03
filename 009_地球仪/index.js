var width = 800,
    height = 800;
	
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);
var earthMap = svg.append("g");

var globalProjection = d3.geo.orthographic()
	.scale(100)
	.translate([400,400])
	.clipAngle(90);	

var pathRenderer = d3.geo.path()
	.projection(globalProjection);

var color = d3.scale.category20();	


d3.json('./world.json',function(ret){	
	 earthMap.selectAll("path")
		.data(ret.features)
		.enter()
		.append('path')
		.attr({
			d: pathRenderer,
			fill: function(d,i){
				return color(i);	
			}
	});
});

//拖动
var zoom = d3.behavior.drag()
	.origin(function() {
		var r = globalProjection.rotate(); /* 目前转动的角度 ... */
		return {x: r[0], y: -r[1]}; /* ... 做为这次拖动的起点 */
	})
	.on("drag", function() {
		var r = globalProjection.rotate();
		/* 更新投影的角度 */
		globalProjection.rotate([d3.event.x, -d3.event.y, r[2]]);
		/* 更新完投影后必须要重画一遍地图 */
		earthMap.selectAll("path").attr(
			{
				d: pathRenderer,
				fill: function(d,i){
					return color(i);	
				}
			}
		);
	});

earthMap.call(zoom);
