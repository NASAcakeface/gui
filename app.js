(function(){
    var app = angular.module('eq', []);

    app.controller("PanelController", function(){
        this.tab = 1;

        this.selectTab = function(setTab) { this.tab = setTab;
        };

        this.isSelected = function(checkTab){
        return this.tab === checkTab;
        };
    });

    app.controller('EqController', function(){
        this.users = astros;
    });

    app.controller('ScoreController',['$http', function($http){
        var eq = this;
        eq.scores = [];

        $http.get('http://spacepuzzlesapis.herokuapp.com/radardata').success(function(data){
            eq.scores = data;
        });
    }]);


    var astros= [
    {
        name: 'Astro A',
        age: 45,
    },
    {
        name: 'Astro B',
        age: 33,
    },
    {
        name: 'Astro C',
        age: 38,
    },
    ]

    app.controller("SalesController", ["$scope", function($scope) {
    $scope.salesData = [
        {hour: 111,sales: 54},
        {hour: 112,sales: 66},
        {hour: 113,sales: 77},
        {hour: 114,sales: 70},
        {hour: 115,sales: 60},
        {hour: 116,sales: 63},
        {hour: 117,sales: 55},
        {hour: 118,sales: 47},
        {hour: 119,sales: 55},
        {hour: 110,sales: 30}
    ];
    }]);

    app.controller("RadarController", ["$scope", function($scope) {
    $scope.radarData = [
        {hour: 1,sales: 54},
        {hour: 2,sales: 66},
        {hour: 3,sales: 77},
        {hour: 4,sales: 70},
        {hour: 5,sales: 60},
        {hour: 6,sales: 63},
        {hour: 7,sales: 55},
        {hour: 8,sales: 47},
        {hour: 9,sales: 55},
        {hour: 10,sales: 30}
    ];
    }]);

    app.controller("XadarController", ["$scope", function($scope) {
    $scope.radarData = [
        [
			{axis:"Email",value:0.59},
			{axis:"Social Networks",value:0.56},
			{axis:"Internet Banking",value:0.42},
			{axis:"News Sportsites",value:0.34},
			{axis:"Search Engine",value:0.48},
			{axis:"View Shopping sites",value:0.14},
			{axis:"Paying Online",value:0.11},
			{axis:"Buy Online",value:0.05},
			{axis:"Stream Music",value:0.07},
			{axis:"Online Gaming",value:0.12},
			{axis:"Navigation",value:0.27},
			{axis:"App connected to TV program",value:0.03},
			{axis:"Offline Gaming",value:0.12},
			{axis:"Photo Video",value:0.4},
			{axis:"Reading",value:0.03},
			{axis:"Listen Music",value:0.22},
			{axis:"Watch TV",value:0.03},
			{axis:"TV Movies Streaming",value:0.03},
			{axis:"Listen Radio",value:0.07},
			{axis:"Sending Money",value:0.18},
			{axis:"Other",value:0.07},
			{axis:"Use less Once week",value:0.08}
		  ],[
			{axis:"Email",value:0.48},
			{axis:"Social Networks",value:0.41},
			{axis:"Internet Banking",value:0.27},
			{axis:"News Sportsites",value:0.28},
			{axis:"Search Engine",value:0.46},
			{axis:"View Shopping sites",value:0.29},
			{axis:"Paying Online",value:0.11},
			{axis:"Buy Online",value:0.14},
			{axis:"Stream Music",value:0.05},
			{axis:"Online Gaming",value:0.19},
			{axis:"Navigation",value:0.14},
			{axis:"App connected to TV program",value:0.06},
			{axis:"Offline Gaming",value:0.24},
			{axis:"Photo Video",value:0.17},
			{axis:"Reading",value:0.15},
			{axis:"Listen Music",value:0.12},
			{axis:"Watch TV",value:0.1},
			{axis:"TV Movies Streaming",value:0.14},
			{axis:"Listen Radio",value:0.06},
			{axis:"Sending Money",value:0.16},
			{axis:"Other",value:0.07},
			{axis:"Use less Once week",value:0.17}
        ]
    ];
    }]);
    
    app.directive('xadarChart', function($parse, $window){
        return{
            restrict:'EA',
            template:"<svg width='550' height='200'></svg>",
            link: function(scope, elem, attrs){
                /*
                var exp = $parse(attrs.radarData);

                var salesDataToPlot=exp(scope);
                var padding = 20;
                var pathClass="path";
                var xScale, yScale, xAxisGen, yAxisGen, lineFun;

                var d3 = $window.d3;
                var rawSvg=elem.find('svg');
                var svg = d3.select(rawSvg[0]);
                */

                var exp = $parse(attrs.chartData);
                function drawLineChart(exp) {

                    var d = exp;
                    console.log(d);
                    var cfg = {
                    radius: 5,
                    w: 600,
                    h: 600,
                    factor: 1,
                    factorLegend: .85,
                    levels: 3,
                    maxValue: 0,
                    radians: 2 * Math.PI,
                    opacityArea: 0.5,
                    ToRight: 5,
                    TranslateX: 80,
                    TranslateY: 30,
                    ExtraWidthX: 100,
                    ExtraWidthY: 100,
                    color: d3.scale.category10()
                    };
                    
                    if('undefined' !== typeof options){
                    for(var i in options){
                        if('undefined' !== typeof options[i]){
                        cfg[i] = options[i];
                        }
                    }
                    }
                    cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
                    var allAxis = (d[0].map(function(i, j){return i.axis}));
                    var total = allAxis.length;
                    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
                    var Format = d3.format('%');
                    d3.select(id).select("svg").remove();
                    
                    var rawSvg=elem.find('svg');
                    var svg = d3.select(rawSvg[0]);
                    var g = d3.select(rawSvg[0])
                            .append("svg")
                            .attr("width", cfg.w+cfg.ExtraWidthX)
                            .attr("height", cfg.h+cfg.ExtraWidthY)
                            .append("g")
                            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
                            ;

                    var tooltip;
                    
                    //Circular segments
                    for(var j=0; j<cfg.levels-1; j++){
                    var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
                    g.selectAll(".levels")
                    .data(allAxis)
                    .enter()
                    .append("svg:line")
                    .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                    .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                    .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                    .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                    .attr("class", "line")
                    .style("stroke", "grey")
                    .style("stroke-opacity", "0.75")
                    .style("stroke-width", "0.3px")
                    .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
                    }

                    //Text indicating at what % each level is
                    for(var j=0; j<cfg.levels; j++){
                    var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
                    g.selectAll(".levels")
                    .data([1]) //dummy data
                    .enter()
                    .append("svg:text")
                    .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
                    .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
                    .attr("class", "legend")
                    .style("font-family", "sans-serif")
                    .style("font-size", "10px")
                    .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
                    .attr("fill", "#737373")
                    .text(Format((j+1)*cfg.maxValue/cfg.levels));
                    }
                    
                    series = 0;

                    var axis = g.selectAll(".axis")
                            .data(allAxis)
                            .enter()
                            .append("g")
                            .attr("class", "axis");

                    axis.append("line")
                        .attr("x1", cfg.w/2)
                        .attr("y1", cfg.h/2)
                        .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                        .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                        .attr("class", "line")
                        .style("stroke", "grey")
                        .style("stroke-width", "1px");

                    axis.append("text")
                        .attr("class", "legend")
                        .text(function(d){return d})
                        .style("font-family", "sans-serif")
                        .style("font-size", "11px")
                        .attr("text-anchor", "middle")
                        .attr("dy", "1.5em")
                        .attr("transform", function(d, i){return "translate(0, -10)"})
                        .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
                        .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});

                
                    d.forEach(function(y, x){
                    dataValues = [];
                    g.selectAll(".nodes")
                        .data(y, function(j, i){
                        dataValues.push([
                            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
                            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                        ]);
                        });
                    dataValues.push(dataValues[0]);
                    g.selectAll(".area")
                                    .data([dataValues])
                                    .enter()
                                    .append("polygon")
                                    .attr("class", "radar-chart-serie"+series)
                                    .style("stroke-width", "2px")
                                    .style("stroke", cfg.color(series))
                                    .attr("points",function(d) {
                                        var str="";
                                        for(var pti=0;pti<d.length;pti++){
                                            str=str+d[pti][0]+","+d[pti][1]+" ";
                                        }
                                        return str;
                                    })
                                    .style("fill", function(j, i){return cfg.color(series)})
                                    .style("fill-opacity", cfg.opacityArea)
                                    .on('mouseover', function (d){
                                                        z = "polygon."+d3.select(this).attr("class");
                                                        g.selectAll("polygon")
                                                        .transition(200)
                                                        .style("fill-opacity", 0.1); 
                                                        g.selectAll(z)
                                                        .transition(200)
                                                        .style("fill-opacity", .7);
                                                    })
                                    .on('mouseout', function(){
                                                        g.selectAll("polygon")
                                                        .transition(200)
                                                        .style("fill-opacity", cfg.opacityArea);
                                    });
                    series++;
                    });
                    series=0;


                    d.forEach(function(y, x){
                    g.selectAll(".nodes")
                        .data(y).enter()
                        .append("svg:circle")
                        .attr("class", "radar-chart-serie"+series)
                        .attr('r', cfg.radius)
                        .attr("alt", function(j){return Math.max(j.value, 0)})
                        .attr("cx", function(j, i){
                        dataValues.push([
                            cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
                            cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                        ]);
                        return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                        })
                        .attr("cy", function(j, i){
                        return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                        })
                        .attr("data-id", function(j){return j.axis})
                        .style("fill", cfg.color(series)).style("fill-opacity", .9)
                        .on('mouseover', function (d){
                                    newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                                    newY =  parseFloat(d3.select(this).attr('cy')) - 5;
                                    
                                    tooltip
                                        .attr('x', newX)
                                        .attr('y', newY)
                                        .text(Format(d.value))
                                        .transition(200)
                                        .style('opacity', 1);
                                        
                                    z = "polygon."+d3.select(this).attr("class");
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", 0.1); 
                                    g.selectAll(z)
                                        .transition(200)
                                        .style("fill-opacity", .7);
                                })
                        .on('mouseout', function(){
                                    tooltip
                                        .transition(200)
                                        .style('opacity', 0);
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", cfg.opacityArea);
                                })
                        .append("svg:title")
                        .text(function(j){return Math.max(j.value, 0)});

                    series++;
                    });
                    //Tooltip
                    tooltip = g.append('text')
                            .style('opacity', 0)
                            .style('font-family', 'sans-serif')
                            .style('font-size', '13px');


                }

                drawLineChart(exp);
                }
            };
        });

    app.directive('radarChart', function($parse, $window){
        return{
            restrict:'EA',
            template:"<svg width='550' height='200'></svg>",
            link: function(scope, elem, attrs){
                var exp = $parse(attrs.chartData);
                var d=exp(scope);
                console.log(d);
                var padding = 20;
                var pathClass="path";
                var xScale, yScale, xAxisGen, yAxisGen, lineFun;

                var d3 = $window.d3;
                var rawSvg=elem.find('svg');
                var svg = d3.select(rawSvg[0]);

                function drawLineChart() {
                    
                    var width = 550;
                    var height = 200;
                    var margin = {top: 20, right: 20, bottom: 30, left: 40};
                    var x = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(10, "%");



                      x.domain(d.map(function(d) { return d.hour; }));
                     y.domain([0, d3.max(d, function(d) { return d.sales; })]);


                      svg.append("g")
                          .attr("class", "x axis")
                          .attr("transform", "translate(0," + height + ")")
                          .call(xAxis);

                      svg.append("g")
                          .attr("class", "y axis")
                          .call(yAxis)
                        .append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 6)
                          .attr("dy", ".71em")
                          .style("text-anchor", "end")
                          .text("Frequency");

                      svg.selectAll(".bar")
                          .data(d)
                        .enter().append("rect")
                          .attr("class", "bar")
                          .attr("x", function(d) { return x(d.hour); })
                          .attr("width", x.rangeBand())
                          .attr("y", function(d) { return y(d.sales); })
                          .attr("height", function(d) { return height - y(d.sales); });

                    function type(d) {
                      d.sales= +d.sales;
                      return d;
                    }
                }

                drawLineChart();
                }
            };
        });

    app.directive('linearChart', function($parse, $window){
        return{
            restrict:'EA',
            template:"<svg width='550' height='200'></svg>",
            link: function(scope, elem, attrs){
                var exp = $parse(attrs.chartData);
                var salesDataToPlot=exp(scope);
                console.log(salesDataToPlot);
                var padding = 20;
                var pathClass="path";
                var xScale, yScale, xAxisGen, yAxisGen, lineFun;

                var d3 = $window.d3;
                var rawSvg=elem.find('svg');
                var svg = d3.select(rawSvg[0]);

                scope.$watchCollection(exp, function(newVal, oldVal){
                    salesDataToPlot=newVal;
                    redrawLineChart();
                });

                function setChartParameters(){

                    xScale = d3.scale.linear()
                        .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
                        .range([padding + 5, rawSvg.attr("width") - padding]);

                    yScale = d3.scale.linear()
                        .domain([0, d3.max(salesDataToPlot, function (d) {
                            return d.sales;
                        })])
                        .range([rawSvg.attr("height") - padding, 0]);

                    xAxisGen = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(salesDataToPlot.length - 1);

                    yAxisGen = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(5);

                    lineFun = d3.svg.line()
                        .x(function (d) {
                            return xScale(d.hour);
                        })
                        .y(function (d) {
                            return yScale(d.sales);
                        })
                        .interpolate("basis");
                }
                
                function drawLineChart() {

                    setChartParameters();

                    svg.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0,180)")
                        .call(xAxisGen);

                    svg.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(20,0)")
                        .call(yAxisGen);

                    svg.append("svg:path")
                        .attr({
                            d: lineFun(salesDataToPlot),
                            "stroke": "blue",
                            "stroke-width": 2,
                            "fill": "none",
                            "class": pathClass
                        });
                }

                function redrawLineChart() {

                    setChartParameters();

                    svg.selectAll("g.y.axis").call(yAxisGen);

                    svg.selectAll("g.x.axis").call(xAxisGen);

                    svg.selectAll("."+pathClass)
                        .attr({
                            d: lineFun(salesDataToPlot)
                        });
                }

                drawLineChart();
                }
            };
        });

})();
