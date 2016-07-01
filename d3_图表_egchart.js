var chart = {
    init_histroy: function (data) {

        var that = this;
        var date = new Date();
        var w_index = date.getDay();
        var xLabel = [];
        var showLabel = [];
        var d = [];
        var d2 = [];
        var i = 0;
        if (data&&data.history) {
            $.each(data.history, function (k, v) {
                var historyFlag = true;
                if ((parseInt(k.substring(k.length - 2, k.length)) - 1) > date.getHours() && parseInt(k.substring(k.length - 4, k.length - 2)) == date.getDate()) {
                    historyFlag = false;
                }
                if (v != 0 && v != null && historyFlag) {
                    var data_day = k.substring(k.length - 4, k.length);
                    if (k.substring(k.length - 2, k.length) == '00') {
                        var weekKey = that.week[w_index];
                        if (parseInt(k.substring(k.length - 4, k.length - 2)) == date.getDate()) {
                            xLabel.push('当天');
                            showLabel.push('当天');
                            weekKey = '当天';
                        } else {
                            xLabel.push(weekKey);
                            showLabel.push(weekKey);
                        }
                        d.push({date: weekKey, value: v});
                        w_index++;
                        w_index = w_index % 7;
                    }
                    else {
                        d.push({date: data_day, value: v});
                        xLabel.push(data_day);
                    }
                }
                else {
                    if (d2.length == 0 && d[i - 1])
                        d2.push({date: d[i - 1].date, value: d[i - 1].value});
                    d2.push({date: k.substring(k.length - 4, k.length), value: v});
                    xLabel.push(k.substring(k.length - 4, k.length));

                }
                i++;
            });
            this.init_chart(d, d2, xLabel, showLabel, data.limit, false);
        }
    },
    init_realtime: function (data) {
        var xLabel = [];
        var label = '';
        var nt = new Date();
        for (var i = 0; i < 25; i++) {
            if (nt.getHours() == i - 1) {
                xLabel.push('当前');
            } else {
                label = (i < 10 ? '0' + i : i) + ':00';
                xLabel.push(label);
            }
        }
        var d = [];
        var d2 = [];
        var i = 0;
        var showLabel = ["00:00", "06:00", "12:00", "18:00", "24:00"];
        var nh = nt.getHours() + 1;
        var nf = false;
        $.each(showLabel, function (k, v) {
            if (Math.abs(nh - parseInt(v.substring(0, 2))) < 3) {
                showLabel[k] = '当前';
                nf = true;
                return false;
            }
        });
        if (!nf) {
            showLabel.push('当前');
        }
        if (data&&data.rt) {
            $.each(data.rt, function (k, v) {
                var historyFlag = true;
                if ((parseInt(k.substring(k.length - 2, k.length)) - 1) > nt.getHours()) {
                    historyFlag = false;
                }
                if (v != 0 && v != null && historyFlag)
                    d.push({date: k.substring(k.length - 2, k.length) + ':00', value: v});
                else {
                    if (d2.length == 0 && d[i - 1])
                        d2.push({date: '当前', value: d[i - 1].value});
                    d2.push({date: k.substring(k.length - 2, k.length) + ':00', value: v});
                }
                i++;
            });
            d[d.length - 1]['date'] = '当前';
            this.init_chart(d, d2, xLabel, showLabel, data.limit, true);
        }

    },
    init: function () {

    },
    init_chart: function (data, d2, xLabel, showLabel, limit, isCircle) {
        $('.circle_2').css('display','none') ;
        $('.circle_2').css('-webkit-animation','none') ;
        var that = this;
        var clientHeight = $(window).height();
        var clientWidth = $(window).width();
        var margin = {top: 12, right: clientWidth * 0.05, bottom: 50, left: clientWidth * 0.05 + 20},
            width = clientWidth * 0.92 - margin.left - margin.right,
            height = clientHeight - Math.round(clientHeight * 0.61) - $('.chart_toggle').outerHeight() - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangePoints([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom").tickValues(showLabel);

        var area = d3.svg.line()
            .interpolate("monotone")
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.value);
            });
        var bg = d3.svg.area()
            .interpolate("monotone")
            .x(function (d) {
                return x(d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(d.value);
            });
        var line = d3.svg.line()
            .interpolate("monotone")
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.value);
            });
        d3.select("div#chart_area svg").remove();
        var svg = d3.select("div#chart_area").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        var defs = svg.append("defs");
        var y_max = d3.max(data.concat(d2).map(function (d) {
            if(d.value<limit[3])
                return limit[3]+3 ;
            else
                return Math.floor(d.value)+3 ;
        }));
        var dm = d3.max(data.map(function (d) {
            return d.value;
        }));
        var grad1 = defs.append("linearGradient")
            .attr('id', 'grad1')
            .attr("x1", "0")
            .attr("x2", "0")
            .attr("y1", "0")
            .attr("y2", "1");
        var grad2 = defs.append("linearGradient")
            .attr('id', 'grad2')
            .attr("x1", "0")
            .attr("x2", "0")
            .attr("y1", "0")
            .attr("y2", "1");
        var p_type = [limit[0] / y_max * 100, limit[1]*1.0 / y_max * 100, limit[2]*1.0 / y_max * 100];
        var y_type = 1;
        var y_color = ['rgb(0,255,0)', '#ffea87', '#ffaa46', 'rgb(255,0,0)'];

        if (dm < limit[0]) {
            y_type = 0;
        } else if (dm < limit[1]) {
            y_type = 1;
        } else if (dm < limit[2]) {
            y_type = 2;
        } else {
            y_type = 3;
        }
        grad1.append('stop').attr('offset', '0%').attr('stop-color', y_color[y_type]);
        grad2.append('stop').attr('offset', '0%').attr('stop-color', y_color[y_type]);
        for (i = y_type - 1; i >= 0; i--) {
            grad1.append('stop').attr('offset', (100 - parseInt(p_type[i])) + '%').attr('stop-color', y_color[i]);
            grad2.append('stop').attr('offset', (100 - parseInt(p_type[i])) + '%').attr('stop-color', y_color[i]);
        }
        grad1.append('stop').attr('offset', '100%').attr('stop-color', 'rgb(0,255,0)');
        grad2.append('stop').attr('offset', '100%').attr('stop-color', 'rgb(0,255,0)');


        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        for (var i = 0; i < data.length; i++) {
            data[i].value = +data[i].value;
            data[i].value = +data[i].value;
        }
        var ld = data[data.length - 1];
        x.domain(xLabel);
        var n = y_max ;

        if(n>limit[0]){
            y_max = n ;
        }else if(n>limit[0]*0.5) {
            y_max = limit[0];
        }
        if(n>limit[1]){
            y_max = n ;
        }else if(n>limit[1]*0.7) {
            y_max = limit[1];
        }
        if(n>limit[2]){
            y_max = n ;
        }else if(n>limit[2]*0.8){
            y_max = limit[2] ;
        }

        y.domain([0, y_max]);

        var yAxis = d3.svg.axis().scale(y).orient("left").ticks(Math.floor(y_max)).tickFormat(function (d) {
            return that.scoreFormat(d, limit, focus, xLabel, line);
        });
        focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "y axis")
            .attr("dy", ".71em")
            .attr("y", 6)
            .call(yAxis);
        var t1 = Math.round(data.length/(data.length + d2.length -1)*2000) ;
        var t2 = 2000 - t1 ;

        function pathTween_line() {
            var interpolate = d3.scale.quantile()
                .domain([0,1])
                .range(d3.range(1, data.length + 1));
            return function(t) {
                return area(data.slice(0, interpolate(t)));
            };
        }
        var line_path = focus.append("path")
            .attr("class", "area").transition()
            .duration(t1).attrTween("d", pathTween_line)
            .attr('stroke', "url(#grad1)");


        function pathTween_bg() {
            var interpolate = d3.scale.quantile()
                .domain([0,1])
                .range(d3.range(1, data.length + 1));
            return function(t) {
                return bg(data.slice(0, interpolate(t)));
            };
        }
        focus.append("path")
            .attr("class", "bg")
            .transition()
            .duration(t1).attrTween("d", pathTween_bg)
            .attr('fill', "url(#grad1)")
            .attr('opacity','0.2');

   //     d2 = d2.reverse() ;
        function pathTween_extline() {
            var interpolate = d3.scale.quantile()
                .domain([0,1])
                .range(d3.range(1, d2.length + 1));
            return function(t) {
                return line(d2.slice(0, interpolate(t)));
            };
        }
        var ext_line_path = focus.append("path")
            .datum(d2)
            .attr("class", "area3")
            .transition().delay(t1)
            .duration(t2)
            .attrTween("d", pathTween_extline)
            .style("stroke-dasharray", 6);

        if (isCircle) {
            focus.append('circle')
                .datum(ld)
                .attr('class', 'linecircle circle_1')
                .attr('cx', line.x())
                .attr('cy', line.y())
                .attr('r', 6).attr('fill', function (d) {
                    if (d.value < limit[0]) {
                        ld_y_type = 0;
                    } else if (d.value < limit[1]) {
                        ld_y_type = 1;
                    } else if (d.value < limit[2]) {
                        ld_y_type = 2;
                    } else {
                        ld_y_type = 3;
                    }
                    return y_color[ld_y_type];
                })
                .attr('opacity',0).transition().delay(t1).duration(1).attr('opacity',1);

            focus.append('circle')
                .datum(ld)
                .attr('class', 'linecircle circle_2')
                .attr('cx', line.x())
                .attr('cy', line.y())
                .attr('r', 12).attr('fill', function (d) {
                    if (d.value < limit[0]) {
                        ld_y_type = 0;
                    } else if (d.value < limit[1]) {
                        ld_y_type = 1;
                    } else if (d.value < limit[2]) {
                        ld_y_type = 2;
                    } else {
                        ld_y_type = 3;
                    }
                    return y_color[ld_y_type];
                })
                .attr('opacity',0).transition().delay(t1).duration(1).attr('opacity',0.3);

        }
        setTimeout(function(){$('.circle_2').css('-webkit-animation','twinkling_2 2s infinite ease-in-out');},t1) ;

    },

    scoreFormat: function (d, limit, focus, xLabel, line) {
        var data = [];
        if (d == parseInt(limit[3])) {
            $.each(xLabel, function (k, v) {
                data.push({'date': v, 'value': d});
            });
            focus.append("path")
                .datum(data)
                .attr("class", "limit-line")
                .attr("d", line)
                .attr('stroke', "#dfdfdf");
            return "稀疏";
        } else if (d == parseInt(limit[0])) {
            $.each(xLabel, function (k, v) {
                data.push({'date': v, 'value': d});
            });
            focus.append("path")
                .datum(data)
                .attr("class", "limit-line")
                .attr("d", line)
                .attr('stroke', "#dfdfdf");
            return "一般";

        }
        else if (d == parseInt(limit[1])) {
            $.each(xLabel, function (k, v) {
                data.push({'date': v, 'value': d});
            });
            focus.append("path")
                .datum(data)
                .attr("class", "limit-line")
                .attr("d", line)
                .attr('stroke', "#dfdfdf");
            return "较多";

        } else if (d == parseInt(limit[2])) {
            $.each(xLabel, function (k, v) {
                data.push({'date': v, 'value': d});
            });
            focus.append("path")
                .datum(data)
                .attr("class", "limit-line")
                .attr("d", line)
                .attr('stroke', "#dfdfdf");
            return "拥挤";

        }
        return "";
    },
    week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    chart: null
}
