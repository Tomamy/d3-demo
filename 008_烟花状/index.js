var width = 450,
    height = 450,
	radius =  Math.min(width, height) / 2 ,
    color = d3.scale.category20();
	
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g");

svg.append("circle")
	.attr('cx',100)
	.attr('cy',100)
	.attr('r',5)
	.attr('fill','rgba(255,0,0,1)')

svg.append("circle")
	.attr('cx',103)
	.attr('cy',100)
	.attr('r',5)
	.attr('fill','rgba(255,0,0,.5)')

svg.append("circle")
	.attr('cx',106)
	.attr('cy',100)
	.attr('r',5)
	.attr('fill','rgba(255,0,0,.3)')

svg.append("circle")
	.attr('cx',109)
	.attr('cy',100)
	.attr('r',5)
	.attr('fill','rgba(255,0,0,.2)')

svg.append("circle")
	.attr('cx',112)
	.attr('cy',100)
	.attr('r',5)
	.attr('fill','rgba(255,0,0,.1)')

svg.append("circle")
	.attr('cx',115)
	.attr('cy',100)
	.attr('r',5)
	.attr('fill','rgba(255,0,0,.05)')

