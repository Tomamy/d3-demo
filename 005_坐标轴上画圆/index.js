var dataset = [ 
	[5,50], 
	[25, 20], 
	[40,100], 
	[60,70], 
	[70,140] 
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

//画x轴
svg.append('g')
	.attr('transform','translate('+padding+','+ (height-padding)+')')
	.call(axisX);

//画y轴
svg.append('g')
	.attr('transform','translate('+padding+','+padding+')')
	.call(axisY);

//画圆
svg.append('g')
	.selectAll('circle')
	.data(dataset)
	.enter()
	.append('circle')
	.attr('cx',function(d,i){
		return xScale(d[0]) + padding;	
	})
	.attr('cy',function(d,i){
		return yScale(d[1]) + padding;		
	})
	.attr('r',4)
	.attr('fill','red');



