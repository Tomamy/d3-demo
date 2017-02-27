var dataset = [ 2500, 2100, 1700, 1300, 900 ];  //数据（表示矩形的宽度）
var width = 400;  //画布的宽度
var height = 400;   //画布的高度
var svg = d3.select("#d3-panel")     //选择文档中的body元素
		.append("svg")          //添加一个svg元素
		.attr("width", width)       //设定宽度
		.attr("height", height);    //设定高度

var linear = d3.scaleLinear();
	linear.domain([0, d3.max(dataset)]);
	linear.range([0, 320]);

var axisb = d3.axisBottom()
    .scale(linear)      //指定比例尺
	.ticks(6); 

var axisl = d3.axisLeft()
    .scale(linear)      //指定比例尺
	.ticks(6); 


svg.append('g')
	.attr('transform','translate(40,360)')
	.call(axisb);

svg.append('g')
	.attr('transform','translate(40,40)')
	.call(axisl);


