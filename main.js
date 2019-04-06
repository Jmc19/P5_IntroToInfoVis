var width =500;
var height= 500;

var selectedId = 1000;

/***************************************************************************
                            DATA SETUP

    We will need to make every column its own data if we think it is
    important (likely admission on, unless we want to cut some off)
****************************************************************************/

d3.csv("data/colleges.csv", function(data) {
    data.forEach(function(d) {
        d.admission = Number(d['Admission Rate']);

        d.act = Number(d['ACT Median']);
        d.sat = Number(d['SAT Average']);

        d.undergrads = Number(d['Undergrad Population']);
        d.partTime = Number(d['% Part-time Undergrads']);
        d.fullTime = Number(1.0 - Number(d['% Part-time Undergrads']));
        d.over25 = Number(d['% Undergrads 25+ y.o.']);
        d.under25 = Number(1.0 - Number(d['% Undergrads 25+ y.o.']));

        d.avgAge = Number(d['Average Age of Entry']);

        d.avgFamilyIncome = Number(d['Average Family Income']);
        d.medFamilyIncome = Number(d['Median Family Income']);
        d.poverty = Number(d['Poverty Rate']/100.0);

        d.white = Number(d['% White']);
        d.black = Number(d['% Black']);
        d.hispanic = Number(d['% Hispanic']);
        d.asian = Number(d['% Asian']);
        d.amerIndian = Number(d['% American Indian']);
        d.pacificIslander = Number(d['% Pacific Islander']);
        d.biracial = Number(d['% Biracial']);

        d.aliens = Number(d['% Nonresident Aliens']);

        d.avgCost = Number(d['Average Cost']);
        d.studentExpenditure = Number(d['Expenditure Per Student']);
        d.medianDebt = Number(d['Median Debt']);
        d.medianDebtGrad = Number(d['Median Debt on Graduation']);
        d.medianDebtWithdraw = Number(d['Median Debt on Withdrawal']);

        d.avgFacultySalary = Number(d['Average Faculty Salary']);
        d.fullTimeFaculty = Number(d['% Full-time Faculty']);
        d.partTimeFaculty = Number(1.0 - Number(d['% Full-time Faculty']));

        d.undergradsWithPell = Number(d['% Undergrads with Pell Grant']);
        d.undergradsNoPell = Number(1.0 - Number(d['% Undergrads with Pell Grant']));

        d.completion150 = Number(d['Completion Rate 150% time']);
        d.threeYearDefault = Number(d['3 Year Default Rate']);

        d.retention = Number(d['Retention Rate (First Time Students)']);

        d.fedLoans = Number(d['% Federal Loans']);
        d.pellGrant = Number(d['% Pell Grant Recipients']);

        d.unemployedAfter8 = Number(d['Number of Unemployed 8 years after entry']);
        d.employedAfter8 = Number(d['Number of Employed 8 years after entry']);

        d.meanEarningsAfter8 = Number(d['Mean Earnings 8 years After Entry']);
        d.medEarningsAfter8 = Number(d['Median Earnings 8 years After Entry']);

        d.highestDegree = Number(d['Highest Degree']);
    })
    console.log(data);
 //    var satmExtent = d3.extent(csv, function(row) { return row.SATM; });
 //    var satvExtent = d3.extent(csv, function(row) { return row.SATV; });
 //    var actExtent = d3.extent(csv,  function(row) { return row.ACT;  });
 //    var gpaExtent = d3.extent(csv,  function(row) {return row.GPA;   });


 //    var satExtents = {
	// "SATM": satmExtent,
	// "SATV": satvExtent

    });


/****************************************************************************
                                AXES SETUP

    We will need a whole bunch of if/else based on what is selected, but
    this shouldn't be too bad, just grunt work
*****************************************************************************/
    // // Axis setup
    // var xScale = d3.scaleLinear().domain(satmExtent).range([50, 470]);
    // var yScale = d3.scaleLinear().domain(satvExtent).range([470, 30]);

    // var xScale2 = d3.scaleLinear().domain(actExtent).range([50, 470]);
    // var yScale2 = d3.scaleLinear().domain(gpaExtent).range([470, 30]);

    // var xAxis = d3.axisBottom().scale(xScale);
    // var yAxis = d3.axisLeft().scale(yScale);

    // var xAxis2 = d3.axisBottom().scale(xScale2);
    // var yAxis2 = d3.axisLeft().scale(yScale2);

    // //Create SVGs for charts
    // var chart1 = d3.select("#chart1")
	   //              .append("svg:svg")
	   //              .attr("width",width)
	   //              .attr("height",height);


    // var chart2 = d3.select("#chart2")
	   //              .append("svg:svg")
	   //              .attr("width",width)
	   //              .attr("height",height);

/*****************************************************************************
                            POINTS SETUP

    We'll need if/elses here as well unless there is a much easier way
    I am missing. However, once again, shouldn't be awful, just a whole
    bunch of grunt work.
*****************************************************************************/

	 //add scatterplot points
 //     var temp1= chart1.selectAll("circle")
	//    .data(csv)
	//    .enter()
	//    .append("circle")
	//    .attr("id",function(d,i) {return "i" + i;} )
	//    .attr("stroke", "black")
 //       .attr("class", "unselected")
	//    .attr("cx", function(d) { return xScale(d.SATM); })
	//    .attr("cy", function(d) { return yScale(d.SATV); })
	//    .attr("r", 5)
	//    .on("click", function(d,i){
 //            var SATMTable = document.getElementById("satm");
 //            SATMTable.innerHTML = "";
 //            SATMTable.append("" + d.SATM);

 //            var SATVTable = document.getElementById("satv");
 //            SATVTable.innerHTML = "";
 //            SATVTable.append("" + d.SATV);

 //            var ACTTable = document.getElementById("act");
 //            ACTTable.innerHTML = "";
 //            ACTTable.append("" + d.ACT);

 //            var GPATable = document.getElementById("gpa");
 //            GPATable.innerHTML = "";
 //            GPATable.append("" + d.GPA);


 //            d3.select("#c" + selectedId).attr("class", "unselected");
 //            d3.select("#i" + selectedId).attr("class", "unselected");

 //            d3.select("#c" + i).attr("class", "selected");
 //            d3.select("#i" + i).attr("class", "selected");
 //            selectedId = i;

 //       });

 //    var temp2= chart2.selectAll("circle")
	//    .data(csv)
	//    .enter()
	//    .append("circle")
	//    .attr("id",function(d,i) {return "c" + i;} )
	//    .attr("stroke", "black")
 //       .attr("class", "unselected")
	//    .attr("cx", function(d) { return xScale2(d.ACT); })
	//    .attr("cy", function(d) { return yScale2(d.GPA); })
	//    .attr("r", 5)
	//    .on("click", function(d,i) {
 //            var SATMTable = document.getElementById("satm");
 //            SATMTable.innerHTML = "";
 //            SATMTable.append("" + d.SATM);

 //            var SATVTable = document.getElementById("satv");
 //            SATVTable.innerHTML = "";
 //            SATVTable.append("" + d.SATV);

 //            var ACTTable = document.getElementById("act");
 //            ACTTable.innerHTML = "";
 //            ACTTable.append("" + d.ACT);

 //            var GPATable = document.getElementById("gpa");
 //            GPATable.innerHTML = "";
 //            GPATable.append("" + d.GPA);


 //            d3.select("#c" + selectedId).attr("class", "unselected");
 //            d3.select("#i" + selectedId).attr("class", "unselected");

 //            d3.select("#i" + i).attr("class", "selected");
 //            d3.select("#c" + i).attr("class", "selected");
 //            selectedId = i;
 //       });


 //    chart1 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(0,"+ (width -30)+ ")")
	// 	.call(xAxis) // call the axis generator
	// 	.append("text")
	// 	.attr("class", "label")
	// 	.attr("x", width-16)
	// 	.attr("y", -6)
	// 	.style("text-anchor", "end")
 //        .style("fill", "black")
	// 	.text("SATM");

 //    chart1 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(50, 0)")
	// 	.call(yAxis)
	// 	.append("text")
	// 	.attr("class", "label")
	// 	.attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	.attr("dy", ".71em")
	// 	.style("text-anchor", "end")
 //        .style("fill", "black")
	// 	.text("SATV");

 //    chart2 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(0,"+ (width -30)+ ")")
	// 	.call(xAxis2)
	// 	.append("text")
	// 	.attr("class", "label")
	// 	.attr("x", width-16)
	// 	.attr("y", -6)
	// 	.style("text-anchor", "end")
 //        .style("fill", "black")
	// 	.text("ACT");

 //    chart2 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(50, 0)")
	// 	.call(yAxis2)
	// 	.append("text")
	// 	.attr("class", "label")
	// 	.attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	.attr("dy", ".71em")
	// 	.style("text-anchor", "end")
 //        .style("fill", "black")
	// 	.text("GPA");
	// });

/**************************************************************************
                            BAR CHART STUFF

    We'll need to do the bar chart info ourselves, unfortunately.
**************************************************************************/