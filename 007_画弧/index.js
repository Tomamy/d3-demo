var width = 450,
    height = 450,
	radius =  Math.min(width, height) / 2 ,
    color = d3.scale.category20();
	
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g");

var startPoint = [100,400],
	endPoint = [30,100],

	distance = Math.sqrt(
		Math.pow(startPoint[0]-endPoint[0],2) + Math.pow(startPoint[1]-endPoint[1],2)
	),
	r = (distance/2)/Math.sin((Math.PI / 180) * 20);

function getD (){
	
	//M为起点，A是以startPoint为起点endpoint坐标为终点，x半径为r，y半径为r，第一个0为X轴与水平方向顺时针方向夹角，第二个0为小角度弧线，1表示顺时针方向
	var d = ['M',startPoint[0],startPoint[1],'A',r,r,0,0,1,endPoint[0],endPoint[1]];
	return d.join(' ');
}

				  

svg.append("path")
	.attr('d',getD())
	.style("stroke", "red")
	.attr('stroke-width','1')
	.attr('fill','transparent');

