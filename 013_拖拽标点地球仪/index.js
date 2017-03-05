var defsTpl = '<defs id="defs-wrap">' +
            '<linearGradient id="g-blue" x1="0%" y1="0%" x2="100%" y2="0%">' +
                '<stop offset="0%" style="stop-color:#005C99;stop-opacity:1" />' +
                '<stop offset="100%" style="stop-color:#0099FF;stop-opacity:1" />' +
            '</linearGradient>' +
            '<filter id="f-glow">' +
                '<feColorMatrix type="matrix"'+
                    'values=' +
                    '"0 0 0 0   0 '+
                     '0 0 0 0.9 0 ' +
                     '0 0 0 0.9 0 ' +
                     '0 0 0 1   0"/>' +
                '<feGaussianBlur stdDeviation="5.5" result="coloredBlur"/>' +
                '<feMerge>' +
                    '<feMergeNode in="coloredBlur"/>' +
                    '<feMergeNode in="SourceGraphic"/>' +
                '</feMerge>' +
            '</filter>' +
        '</defs>';

d3.json("pos.json", function(posData) {
	d3.json("world.json", function(worldData) {
		var width = window.innerWidth,
			height = window.innerHeight;

		var projection = d3.geo.orthographic()
			.scale(225)
			.translate([width/2,height/2])
			.clipAngle(90);

		var path = d3.geo.path()
			.projection(projection);

		var pathPos= d3.geo.path()
			.projection(projection)
			.pointRadius(function(it) { 
				return 5; 
			});
	

		var graticule = d3.geo.graticule();

		var countries = worldData.features;

		var color = d3.scale.category20();
				
		//画布
		var svg = d3.select('#d3-panel')
			.append('svg')
			.attr('width',width)
			.attr('height',height)
			.attr('id','svg');
		
		//定义渐变与高斯模糊
		var defs = svg.append('g').html(defsTpl);
		
		//定义宇宙背景
		svg.append('g').append("rect")
            .attr("class", "frame")
            .attr("width", width)
            .attr("height", height);
		
		
		//画地球的圆，蓝色表示海洋
		var backgroundCircle = svg.append('g')	
			.append('circle')
			.attr('cx',width/2)
			.attr('cy',height/2)
			.attr('r',projection.scale())
			.attr('class','globe')
			.attr('filter','url(#f-glow)')
			.attr('fill','url(#g-blue)');


		var polygon = svg.append('g')
			.selectAll("path")
			.data(countries)
			.enter()
			.append("path").attr({
				"d": path,
				"stroke":function(){
					return "#5f9fb3";
				},
				"fill":function(d){
					return "#6ad2e8";
				}
			})
			.attr('class','feature')
			.on("mouseover",function(){
				console.log('mouseover');
			})
			.on('mousemove',function(){
			})
			.on("mouseout",function(){
			}); 
			
		//经纬度
		/**var grid = graticule();
		d3.select('#svg')
			.append('g')
			.append("path")
			.datum( grid )
			.attr("class","grid_path")
			.attr("d",path);
		**/

		//画圈标点
		d3.select("#svg")
			.selectAll("g.path-pos")
			.data(posData.features)
			.enter()
			.append("g")
			.attr("class", "path-pos");

		var circlePathPos = d3.select("#svg")
			.selectAll("g.path-pos")
			.append("path");
		
		var cityName = d3.select('g.path-pos')
			.append('text')
			.attr('fill','red')
			.text('深圳')
			.style('visibility','hidden');

		var updatePos = function() {
		  circlePathPos.attr({
			d: pathPos,
			fill: "none",
			stroke: "#f00"
		  });
		  
		  if(circlePathPos.attr('d')){ 
		  var pos = circlePathPos.attr('d').substring(0,circlePathPos.attr('d').indexOf('m')).replace('M','').split(',');
			
			cityName.attr('x',+pos[0]+10)
			.attr('y',+pos[1]+2)
			.style('visibility','visible');
		  }else {
			cityName.style('visibility','hidden'); 
		  }
		  
		};


		d3.select("#svg").call(
			d3.behavior.drag()
			.origin(function() {
				r = projection.rotate();
				return {x: r[0], y: -r[1]};
			})
			.on("drag", function() {
				rotate = projection.rotate();
				projection.rotate([d3.event.x, 0, 0]);
				d3.select("#svg").selectAll("path").attr("d", path);
				updatePos();
			})
		);

		projection
		.rotate([-114,0,0]);
		
		d3.select("#svg")
			.selectAll("path")
			.attr("d", path);

		updatePos();

	});
});






