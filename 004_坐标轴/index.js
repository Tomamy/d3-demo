var dataset = [ 
	[34,2500], 
	[2100, 1700], 
	[1300, 900] 
];  

var width = 400;  //画布的宽度
var height = 400;   //画布的高度
var svg = d3.select("#d3-panel")     //选择文档中的body元素
		.append("svg")          //添加一个svg元素
		.attr("width", width)       //设定宽度
		.attr("height", height);    //设定高度

var padding = 40;

var xScale = d3.scaleLinear();
	xScale.domain([0, d3.max(dataset,function(d,i){
		return d[0];	
	})]);
	xScale.range([0, width - padding * 2]);


var yScale = d3.scaleLinear();
	yScale.domain([0, d3.max(dataset,function(d,i){
		return d[1];	
	})]);
	yScale.range([height - padding * 2,0]);


var axisX = d3.axisBottom()
    .scale(xScale)      //指定比例尺
	.ticks(6); 

var axisY = d3.axisLeft()
    .scale(yScale)      //指定比例尺
	.ticks(6); 


svg.append('g')
	.attr('transform','translate('+padding+','+ (height-padding)+')')
	.call(axisX);

svg.append('g')
	.attr('transform','translate('+padding+','+padding+')')
	.call(axisY);


