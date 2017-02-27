var dataset = [ 2500, 2100, 1700, 1300, 900 ];  //数据（表示矩形的宽度）
var width = 300;  //画布的宽度
var height = 300;   //画布的高度
var svg = d3.select("#d3-panel")     //选择文档中的body元素
		.append("svg")          //添加一个svg元素
		.attr("width", width)       //设定宽度
		.attr("height", height);    //设定高度

var rectHeight = 25;
var linear = d3.scaleLinear();
	linear.domain([0, d3.max(dataset)]);
	linear.range([0, 100]);

//测试
var testPoint = linear(100);
console.log('线性比例尺：'+testPoint);

svg.selectAll("rect")
		.data(dataset) //绑定数组
		.enter()  //指定选择集的entry部分
		.append("rect") //添加足够数量的矩形元素
		.attr("x",20)
		.attr("y",function (d,i) {
			return i * rectHeight;
		})
		.attr("width",function (d) {
			return linear(d);
		})
		.attr("height",rectHeight - 2)
		.attr("fill","blue");



//序数比例尺
var index = [0, 1, 2, 3, 4,5,6];
var color = ["red", "blue", "green", "yellow", "black"];
var ordinal = d3.scaleOrdinal();
	ordinal.domain(index);
	ordinal.range(color);

console.log('序数比例尺：');
console.log(ordinal(0));
console.log(ordinal(4));
console.log(ordinal(5));
console.log(ordinal(6));
