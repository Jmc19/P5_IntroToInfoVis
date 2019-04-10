var width = 500;
var height = 500;

var selectedId = 10000;
var selectedClass;

var selectedValueY = "Admission Rate";

/***************************************************************************
                            DATA SETUP

    We will need to make every column its own data if we think it is
    important (likely admission on, unless we want to cut some off)
****************************************************************************/

d3.csv("data/colleges.csv", function(data) {
    data.forEach(function(d) {
        d.pubPrivate = d['Control'];

        d.admission = Number(d['Admission Rate']);

        // d.act = Number(d['ACT Median']);
        // d.sat = Number(d['SAT Average']);

        d.undergrads = Number(d['Undergrad Population']);
        // d.partTime = Number(d['% Part-time Undergrads']);
        // d.fullTime = Number(1.0 - Number(d['% Part-time Undergrads']));
        d.over25 = Number(d['% Undergrads 25+ y.o.']);
        d.under25 = Number(1.0 - Number(d['% Undergrads 25+ y.o.']));

        d.avgAge = Number(d['Average Age of Entry']);

        d.avgFamilyIncome = Number(d['Average Family Income']);
        d.medFamilyIncome = Number(d['Median Family Income']);
        d.poverty = Number(d['Poverty Rate'])/100.0;

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
        // d.medianDebtGrad = Number(d['Median Debt on Graduation']);
        // d.medianDebtWithdraw = Number(d['Median Debt on Withdrawal']);

        // d.avgFacultySalary = Number(d['Average Faculty Salary']);
        // d.fullTimeFaculty = Number(d['% Full-time Faculty']);
        // d.partTimeFaculty = Number(1.0 - Number(d['% Full-time Faculty']));

        d.undergradsWithPell = Number(d['% Undergrads with Pell Grant']);
        d.undergradsNoPell = Number(1.0 - Number(d['% Undergrads with Pell Grant']));

        // d.completion150 = Number(d['Completion Rate 150% time']);
        // d.threeYearDefault = Number(d['3 Year Default Rate']);

        // d.retention = Number(d['Retention Rate (First Time Students)']);

        d.fedLoans = Number(d['% Federal Loans']);
        // d.pellGrant = Number(d['% Pell Grant Recipients']);

        d.unemployedAfter8 = Number(d['Number of Unemployed 8 years after entry']);
        d.employedAfter8 = Number(d['Number of Employed 8 years after entry']);

        d.meanEarningsAfter8 = Number(d['Mean Earnings 8 years After Entry']);
        // d.medEarningsAfter8 = Number(d['Median Earnings 8 years After Entry']);

        // d.highestDegree = Number(d['Highest Degree']);
    })

    var admissionExtent = d3.extent(data, function(row) { return row.admission; });
    // var actExtent = d3.extent(data, function(row) { return row.act; });
    // var satExtent = d3.extent(data,  function(row) { return row.sat;  });
    var undergradsExtent = d3.extent(data,  function(row) {return row.undergrads;   });
    // var partTimeExtent = d3.extent(data, function(row) { return row.partTime; });
    // var fullTimeExtent = d3.extent(data, function(row) { return row.fullTime; });
    var over25Extent = d3.extent(data, function(row) { return row.over25; });
    var under25Extent = d3.extent(data, function(row) { return row.under25; });
    var avgAgeExtent = d3.extent(data, function(row) { return row.avgAge; });
    var avgFamilyIncomeExtent = d3.extent(data, function(row) { return row.avgFamilyIncome; });
    var medFamilyIncomeExtent = d3.extent(data, function(row) { return row.medFamilyIncome; });
    var povertyExtent = d3.extent(data, function(row) { return row.poverty; });
    var whiteExtent = d3.extent(data, function(row) { return row.white; });
    var blackExtent = d3.extent(data, function(row) { return row.black; });
    var hispanicExtent = d3.extent(data, function(row) { return row.hispanic; });
    var asianExtent = d3.extent(data, function(row) { return row.asian; });
    var amerIndianExtent = d3.extent(data, function(row) { return row.amerIndian; });
    var pacificIslanderExtent = d3.extent(data, function(row) { return row.pacificIslander; });
    var biracialExtent = d3.extent(data, function(row) { return row.biracial; });
    var aliensExtent = d3.extent(data, function(row) { return row.aliens; });
    var avgCostExtent = d3.extent(data, function(row) { return row.avgCost; });
    var studentExpenditureExtent = d3.extent(data, function(row) { return row.studentExpenditure; });
    var medianDebtExtent = d3.extent(data, function(row) { return row.medianDebt; });
    // var medianDebtGradExtent = d3.extent(data, function(row) { return row.medianDebtGrad; });
    // var medianDebtWithdrawExtent = d3.extent(data, function(row) { return row.medianDebtWithdraw; });
    // var avgFacultySalaryExtent = d3.extent(data, function(row) { return row.avgFacultySalary; });
    // var fullTimeFacultyExtent = d3.extent(data, function(row) { return row.fullTimeFaculty; });
    // var partTimeFacultyExtent = d3.extent(data, function(row) { return row.partTimeFaculty; });
    var undergradsWithPellExtent = d3.extent(data, function(row) { return row.undergradsWithPell; });
    var undergradsNoPellExtent = d3.extent(data, function(row) { return row.undergradsNoPell; });
    // var completion150Extent = d3.extent(data, function(row) { return row.completion150; });
    // var threeYearDefaultExtent = d3.extent(data, function(row) { return row.threeYearDefault; });
    // var retentionExtent = d3.extent(data, function(row) { return row.retention; });
    var fedLoansExtent = d3.extent(data, function(row) { return row.fedLoans; });
    var pellGrantExtent = d3.extent(data, function(row) { return row.pellGrant; });
    var unemployedAfter8Extent = d3.extent(data, function(row) { return row.unemployedAfter8; });
    var employedAfter8Extent = d3.extent(data, function(row) { return row.employedAfter8; });
    var meanEarningsAfter8Extent = d3.extent(data, function(row) { return row.meanEarningsAfter8; });
    // var medEarningsAfter8Extent = d3.extent(data, function(row) { return row.medEarningsAfter8; });
    // var highestDegreeExtent = d3.extent(data, function(row) { return row.highestDegree; });

/****************************************************************************
                                DROPDOWN STUFF

                    ON CHANGE AS WELL - MOST IMPORTANT FUNCTION
****************************************************************************/
    var yOptions = ["Admission Rate", "Number of Undergraduates", "Percentage of Undergraduates Over 25", "Percentage of Undergraduates Under 25", "Average Age of Entry", "Average Family Income", "Median Family Income", "Poverty Rate", "Percent White", "Percent Black", "Percent Hispanic", "Percent Asian", "Percent American Indian", "Percent Pacific Islander", "Percent Biracial", "Percent Aliens", "Average Cost", "Student Expenditures", "Percent Undergraduates with Pell Grant", "Percent Undergraduates without Pell Grant", "Percentage of Undergraduates with a Federal Loan", "Number of Undergraduates Unemployed After 8 Years", "Number of Undergraduates Employed After 8 Years"];
    var dd = d3.select(wrapper) //?
            .append('p')
            .append('select')
            .attr('class', 'select')
            .on('change', onchange)
            .selectAll('option')
            .data(yOptions).enter()
            .append('option')
            .text(function (d) { return d; });

    function onchange() {
        selectedValueY = d3.select('select').property('value');

        if (selectedValueY === "Admission Rate") {
            yScale.domain(admissionExtent);
            yScale2.domain(admissionExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.admission); });
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.admission); });
        } else if (selectedValueY === "Number of Undergraduates") {
            yScale.domain(undergradsExtent);
            yScale2.domain(undergradsExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.undergrads); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.undergrads); })
        } else if (selectedValueY === "Percentage of Undergraduates Over 25") {
            yScale.domain(over25Extent);
            yScale2.domain(over25Extent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.over25); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.over25); })
        } else if (selectedValueY === "Percentage of Undergraduates Under 25") {
            yScale.domain(under25Extent);
            yScale2.domain(under25Extent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.under25); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.under25); })
        } else if (selectedValueY === "Average Age of Entry") {
            yScale.domain(avgAgeExtent);
            yScale2.domain(avgAgeExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.avgAge); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.avgAge); })
        } else if (selectedValueY === "Average Family Income") {
            yScale.domain(avgFamilyIncomeExtent);
            yScale2.domain(avgFamilyIncomeExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.avgFamilyIncome); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.avgFamilyIncome); })
        } else if (selectedValueY === "Median Family Income") {
            yScale.domain(medFamilyIncomeExtent);
            yScale2.domain(medFamilyIncomeExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.medFamilyIncome); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.medFamilyIncome); })
        } else if (selectedValueY === "Poverty Rate") {
            yScale.domain(povertyExtent);
            yScale2.domain(povertyExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.poverty); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.poverty); })
        } else if (selectedValueY === "Percent White") {
            yScale.domain(whiteExtent);
            yScale2.domain(whiteExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.white); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.white); })
        } else if (selectedValueY === "Percent Black") {
            yScale.domain(blackExtent);
            yScale2.domain(blackExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.black); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.black); })
        } else if (selectedValueY === "Percent Hispanic") {
            yScale.domain(hispanicExtent);
            yScale2.domain(hispanicExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.hispanic); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.hispanic); })
        } else if (selectedValueY === "Percent Asian") {
            yScale.domain(asianExtent);
            yScale2.domain(asianExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.asian); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.asian); })
        } else if (selectedValueY === "Percent American Indian") {
            yScale.domain(amerIndianExtent);
            yScale2.domain(amerIndianExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.amerIndian); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.amerIndian); })
        } else if (selectedValueY === "Percent Pacific Islander") {
            yScale.domain(pacificIslanderExtent);
            yScale2.domain(pacificIslanderExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.pacificIslander); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.pacificIslander); })
        } else if (selectedValueY === "Percent Biracial") {
            yScale.domain(biracialExtent);
            yScale2.domain(biracialExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.biracial); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.biracial); })
        } else if (selectedValueY === "Percent Aliens") {
            yScale.domain(aliensExtent);
            yScale2.domain(aliensExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.aliens); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.aliens); })
        } else if (selectedValueY === "Average Cost") {
            yScale.domain(avgCostExtent);
            yScale2.domain(avgCostExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.avgCost); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.avgCost); })
        } else if (selectedValueY === "Student Expenditures") {
            yScale.domain(studentExpenditureExtent);
            yScale2.domain(studentExpenditureExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.studentExpenditure); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.studentExpenditure); })
        } else if (selectedValueY === "Percent Undergraduates with Pell Grant") {
            yScale.domain(undergradsWithPellExtent);
            yScale2.domain(undergradsWithPellExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.undergradsWithPell); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.undergradsWithPell); })
        } else if (selectedValueY === "Percent Undergraduates without Pell Grant") {
            yScale.domain(undergradsNoPellExtent);
            yScale2.domain(undergradsNoPellExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.undergradsNoPell); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.undergradsNoPell); })
        } else if (selectedValueY === "Percentage of Undergraduates with a Federal Loan") {
            yScale.domain(fedLoansExtent);
            yScale2.domain(fedLoansExtent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.fedLoans); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.fedLoans); })
        } else if (selectedValueY === "Number of Undergraduates Unemployed After 8 Years") {
            yScale.domain(unemployedAfter8Extent);
            yScale2.domain(unemployedAfter8Extent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.unemployedAfter8); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.unemployedAfter8); })
        } else if (selectedValueY === "Number of Undergraduates Employed After 8 Years") {
            yScale.domain(employedAfter8Extent);
            yScale2.domain(employedAfter8Extent);
            chart1.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale(d.employedAfter8); })
            chart2.selectAll("circle").transition().duration(1000).attr("cy", function(d) { return yScale2(d.employedAfter8); })
        } else {
            console.log("Unexpected Event")
        }

        yAxis = d3.axisLeft().scale(yScale);
        yAxis2 = d3.axisLeft().scale(yScale2);

        yText1.text(selectedValueY);
        yText2.text(selectedValueY);

        y1.transition().duration(500).call(yAxis);
        y2.transition().duration(500).call(yAxis2);
    }

/****************************************************************************
                                AXES SETUP

*****************************************************************************/
    // // Axis setup
    var xScale = d3.scaleLinear().domain(medianDebtExtent).range([50, 470]);
    var yScale = d3.scaleLinear().domain(admissionExtent).range([470, 30]);

    var xScale2 = d3.scaleLinear().domain(meanEarningsAfter8Extent).range([50, 470]);
    var yScale2 = d3.scaleLinear().domain(admissionExtent).range([470, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var xAxis2 = d3.axisBottom().scale(xScale2);
    var yAxis2 = d3.axisLeft().scale(yScale2);

    console.log(data.columns.length);
    // Axis setup for Bar Chart
    //TODO: Look at domain and change accordingly, default domain is set
    //to the width and height respecitvely; this should be dynamic
    var xScaleBar1 = d3.scaleLinear().domain([0, width]).range([50, 470]);
    var yScaleBar1 = d3.scaleLinear().domain([0, height]).range([470,30]);

    //This should be the scales for the static bar chart
    var xScaleBar2 = d3.scaleBand()
                       .domain(d3.range(yOptions.length))
                       .rangeRound([50, 470])
                       .paddingInner(0.2);
    var yScaleBar2 = d3.scaleLinear().domain([0, 1]).range([470, 30]);

    //Assigns the Scales to an Axis
    var xAxisBar1 = d3.axisBottom().scale(xScaleBar1);
    var yAxisBar1 = d3.axisLeft().scale(yScaleBar1);

    var xAxisBar2 = d3.axisBottom().scale(xScaleBar2);
                       // .ticks(yOptions.length)
                       // .tickFormat(function(d, i) {return yOptions[i]});
    var yAxisBar2 = d3.axisLeft().scale(yScaleBar2);


    //Create SVGs for charts
    var chart1 = d3.select("#chart1")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);

    var chart2 = d3.select("#chart2")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);

    //TODO: Need to reposition the SVG elements to be below chart 1 and chart 2
    var chart3 = d3.select("#chart3")
                   .append("svg:svg")
                   .attr("width", width)
                   .attr("height", height);

    var chart4 = d3.select("#chart4")
                   .append("svg:svg")
                   .attr("width", width)
                   .attr("height", height);
                   // .style("border", "black")
                   // .style("border-style", "solid");

/*****************************************************************************
                            POINTS SETUP

    We'll need if/elses here as well unless there is a much easier way
    I am missing. However, once again, shouldn't be awful, just a whole
    bunch of grunt work.

                        WILL ALSO NEED BRUSHING?
*****************************************************************************/

	 // add scatterplot points
     var temp1= chart1.selectAll("circle")
	   .data(data)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return "i" + i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale(d.medianDebt); })
	   .attr("cy", function(d) { return yScale(d.admission); })
	   .attr("r", 3)
       .attr("class", function(d) { return d.pubPrivate;})
	   .on("click", function(d,i) {
            if (selectedId != 10000) {
                d3.select("#c" + selectedId).attr("class", selectedClass);
                d3.select("#i" + selectedId).attr("class", selectedClass);
            }

            d3.select("#c" + i).attr("class", "selected");
            d3.select("#i" + i).attr("class", "selected");
            selectedId = i;
            selectedClass = d.pubPrivate;

       });

    var temp2= chart2.selectAll("circle")
	   .data(data)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return "c" + i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale2(d.meanEarningsAfter8); })
	   .attr("cy", function(d) { return yScale2(d.admission); })
	   .attr("r", 3)
       .attr("class", function(d) { return d.pubPrivate;})
	   .on("click", function(d,i){
            if (selectedId != 10000) {
                d3.select("#c" + selectedId).attr("class", selectedClass);
                d3.select("#i" + selectedId).attr("class", selectedClass);
            }

            d3.select("#c" + i).attr("class", "selected");
            d3.select("#i" + i).attr("class", "selected");
            selectedId = i;
            selectedClass = d.pubPrivate;

       });


    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis) // call the axis generator
		.append("text")
		.attr("class", "text")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
        .style("fill", "black")
		.text("Median Debt");

    var y1 = chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis)

    var yText1 = y1.append("text")
		.attr("class", "text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
        .style("fill", "black")
		.text(selectedValueY);

    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis2)
		.append("text")
		.attr("class", "text")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
        .style("fill", "black")
		.text("Mean Earnings After 8 Years");

    var y2 = chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis2)

    var yText2 = y2.append("text")
		.attr("class", "text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
        .style("fill", "black")
		.text(selectedValueY);

    //Dynamic Bar Chart (Bottom Left most one)
    var xBar1 = chart3.append("g") // create a group node
                      .attr("transform", "translate(0,"+ (width -30)+ ")")
                      .call(xAxisBar1) // call the axis generator
                      .attr("x", width-16)
                      .attr("y", -6);
    var yBar1 = chart3.append("g")
                      .attr("transform", "translate(50,0)")
                      .call(yAxisBar1);
    //Static Bar Chart (Bottom Right most one)
    chart4.append("g")
          .attr("transform", "translate(0,"+ (width -30)+ ")")
          .call(xAxisBar2)
          .attr("x", width-16)
          .attr("y", -6);
    chart4.append("g")
          .attr("transform", "translate(50,0)")
          .call(yAxisBar2);



/**************************************************************************
                            BAR CHART STUFF

    We'll need to do the bar chart info ourselves, unfortunately.
**************************************************************************/
    var usedColumnHeaders = ["Admission Rate", "Number of Undergraduates",
    "Percentage of Undergraduates Over 25",
    "Percentage of Undergraduates Under 25",
    "Average Age of Entry", "Average Family Income",
    "Median Family Income", "Poverty Rate",
    "Percent White", "Percent Black", "Percent Hispanic",
    "Percent Asian", "Percent American Indian", "Percent Pacific Islander",
    "Percent Biracial", "Percent Aliens", "Average Cost",
    "Student Expenditures", "Percent Undergraduates with Pell Grant",
    "Percent Undergraduates without Pell Grant",
    "Percentage of Undergraduates with a Federal Loan",
    "Number of Undergraduates Unemployed After 8 Years",
    "Number of Undergraduates Employed After 8 Years"];

    var averageArray = [d3.mean(data, function(d) {return d.admission;}),
    d3.mean(data, function(d) {return d.undergrads;}),
    d3.mean(data, function(d) {return d.over25;}),
    d3.mean(data, function(d) {return d.under25;}),
    d3.mean(data, function(d) {return d.avgAge;}),
    d3.mean(data, function(d) {return d.avgFamilyIncome;}),
    d3.mean(data, function(d) {return d.medFamilyIncome;}),
    d3.mean(data, function(d) {return d.poverty;}),
    d3.mean(data, function(d) {return d.white;}),
    d3.mean(data, function(d) {return d.black;}),
    d3.mean(data, function(d) {return d.hispanic;}),
    d3.mean(data, function(d) {return d.asian;}),
    d3.mean(data, function(d) {return d.amerIndian;}),
    d3.mean(data, function(d) {return d.pacificIslander;}),
    d3.mean(data, function(d) {return d.biracial;}),
    d3.mean(data, function(d) {return d.aliens;}),
    d3.mean(data, function(d) {return d.avgCost;}),
    d3.mean(data, function(d) {return d.studentExpenditure;}),
    d3.mean(data, function(d) {return d.undergradsWithPell;}),
    d3.mean(data, function(d) {return d.undergradsNoPell;}),
    d3.mean(data, function(d) {return d.fedLoans;}),
    d3.mean(data, function(d) {return d.unemployedAfter8;}),
    d3.mean(data, function(d) {return d.employedAfter8;})
    ];
    console.log(averageArray.length);

    var barsChart4 = chart4.append("g");
    barsChart4.selectAll(".bar")
              .data(averageArray)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("width", xScaleBar2.bandwidth())
              .attr("height", function(d, i) {
                var normalizedNum = normalize(d, 0, 1, usedColumnHeaders[i]) - 0.07;
                console.log(normalizedNum);
                console.log(500 - yScaleBar2(normalizedNum));
                return ((500 - yScaleBar2(normalizedNum)));
              })
              .attr("x", function(d, i) {
                return xScaleBar2(i);
              })
              .attr("y", function(d, i) {
                var normalizedNum = normalize(d, 0, 1, usedColumnHeaders[i]);
                return yScaleBar2(normalizedNum);
              });

    function normalize(enteredValue, normalizedMin,
        normalizedMax, columnHeader) {
        var maxEntry;
        var minEntry;
        if (columnHeader == usedColumnHeaders[0]) {
            maxEntry = d3.max(data, function(d) {
                return d.admission;});
            minEntry = d3.min(data, function(d) {
                return d.admission;});
        } else if (columnHeader == usedColumnHeaders[1]) {
            maxEntry = d3.max(data, function(d) {
                return d.undergrads;});
            minEntry = d3.min(data, function(d) {
                return d.undergrads;});
        }  else if (columnHeader == usedColumnHeaders[2]) {
            maxEntry = d3.max(data, function(d) {
                return d.over25;});
            minEntry = d3.min(data, function(d) {
                return d.over25;});
        } else if (columnHeader == usedColumnHeaders[3]) {
            maxEntry = d3.max(data, function(d) {
                return d.under25;});
            minEntry = d3.min(data, function(d) {
                return d.under25;});
        } else if (columnHeader == usedColumnHeaders[4]) {
            maxEntry = d3.max(data, function(d) {
                return d.avgAge;});
            minEntry = d3.min(data, function(d) {
                return d.avgAge;});
        } else if (columnHeader == usedColumnHeaders[5]) {
            maxEntry = d3.max(data, function(d) {
                return d.avgFamilyIncome;});
            minEntry = d3.min(data, function(d) {
                return d.avgFamilyIncome;});
        } else if (columnHeader == usedColumnHeaders[6]) {
            maxEntry = d3.max(data, function(d) {
                return d.medFamilyIncome;});
            minEntry = d3.min(data, function(d) {
                return d.medFamilyIncome;});
        } else if (columnHeader == usedColumnHeaders[7]) {
            maxEntry = d3.max(data, function(d) {
                return d.poverty;});
            minEntry = d3.min(data, function(d) {
                return d.poverty;});
        }  else if (columnHeader == usedColumnHeaders[8]) {
            maxEntry = d3.max(data, function(d) {
                return d.white;});
            minEntry = d3.min(data, function(d) {
                return d.white;});
        } else if (columnHeader == usedColumnHeaders[9]) {
            maxEntry = d3.max(data, function(d) {
                return d.black;});
            minEntry = d3.min(data, function(d) {
                return d.black;});
        } else if (columnHeader == usedColumnHeaders[10]) {
            maxEntry = d3.max(data, function(d) {
                return d.hispanic;});
            minEntry = d3.min(data, function(d) {
                return d.hispanic;});
        } else if (columnHeader == usedColumnHeaders[11]) {
            maxEntry = d3.max(data, function(d) {
                return d.asian;});
            minEntry = d3.min(data, function(d) {
                return d.asian;});
        } else if (columnHeader == usedColumnHeaders[12]) {
            maxEntry = d3.max(data, function(d) {
                return d.amerIndian;});
            minEntry = d3.min(data, function(d) {
                return d.amerIndian;});
        } else if (columnHeader == usedColumnHeaders[13]) {
            maxEntry = d3.max(data, function(d) {
                return d.pacificIslander;});
            minEntry = d3.min(data, function(d) {
                return d.pacificIslander;});
        } else if (columnHeader == usedColumnHeaders[14]) {
            maxEntry = d3.max(data, function(d) {
                return d.biracial;});
            minEntry = d3.min(data, function(d) {
                return d.biracial;});
        } else if (columnHeader == usedColumnHeaders[15]) {
            maxEntry = d3.max(data, function(d) {
                return d.aliens;});
            minEntry = d3.min(data, function(d) {
                return d.aliens;});
        } else if (columnHeader == usedColumnHeaders[16]) {
            maxEntry = d3.max(data, function(d) {
                return d.avgCost;});
            minEntry = d3.min(data, function(d) {
                return d.avgCost;});
        } else if (columnHeader == usedColumnHeaders[17]) {
            maxEntry = d3.max(data, function(d) {
                return d.studentExpenditure;});
            minEntry = d3.min(data, function(d) {
                return d.studentExpenditure;});
        } else if (columnHeader == usedColumnHeaders[18]) {
            maxEntry = d3.max(data, function(d) {
                return d.undergradsWithPell;});
            minEntry = d3.min(data, function(d) {
                return d.undergradsWithPell;});
        } else if (columnHeader == usedColumnHeaders[19]) {
            maxEntry = d3.max(data, function(d) {
                return d.undergradsNoPell;});
            minEntry = d3.min(data, function(d) {
                return d.undergradsNoPell;});
        } else if (columnHeader == usedColumnHeaders[20]) {
            maxEntry = d3.max(data, function(d) {
                return d.fedLoans;});
            minEntry = d3.min(data, function(d) {
                return d.fedLoans;});
        } else if (columnHeader == usedColumnHeaders[21]) {
            maxEntry = d3.max(data, function(d) {
                return d.unemployedAfter8;});
            minEntry = d3.min(data, function(d) {
                return d.unemployedAfter8;});
        } else if (columnHeader == usedColumnHeaders[22]) {
            maxEntry = d3.max(data, function(d) {
                return d.employedAfter8;});
            minEntry = d3.min(data, function(d) {
                return d.employedAfter8;});
        }

        var mx = (enteredValue-minEntry)/(maxEntry-minEntry);
        var preshiftNormalized = mx*(normalizedMax-normalizedMin);
        var shiftedNormalized = preshiftNormalized + normalizedMin;

        return shiftedNormalized;
    }

});