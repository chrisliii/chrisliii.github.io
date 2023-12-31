// scene button variables
var buttonOneOn;
var buttonTwoOn;
var buttonThreeOn;
var buttonFourOn;

// SVG sizing
const margin = {top: 50, right: 70, bottom: 50, left: 80};
const width = 500;
const height = 500;

// main SVG
var Svg;

function updateButton(buttonNum) {
    if (buttonNum === 1) {
        buttonOneOn = true;
        buttonTwoOn = false;
        buttonThreeOn = false;
        buttonFourOn = false;
        document.getElementById("button_one").style.backgroundColor = "#42a7f5";
        document.getElementById("button_two").style.backgroundColor = null;
        document.getElementById("button_three").style.backgroundColor = null;
        document.getElementById("button_four").style.backgroundColor = null;
    } else if (buttonNum === 2) {
        buttonOneOn = false;
        buttonTwoOn = true;
        buttonThreeOn = false;
        buttonFourOn = false;
        document.getElementById("button_one").style.backgroundColor = null;
        document.getElementById("button_two").style.backgroundColor = "#42a7f5";
        document.getElementById("button_three").style.backgroundColor = null;
        document.getElementById("button_four").style.backgroundColor = null;
    } else if (buttonNum === 3) {
        buttonOneOn = false;
        buttonTwoOn = false;
        buttonThreeOn = true;
        buttonFourOn = false;
        document.getElementById("button_one").style.backgroundColor = null;
        document.getElementById("button_two").style.backgroundColor = null;
        document.getElementById("button_three").style.backgroundColor = "#42a7f5";
        document.getElementById("button_four").style.backgroundColor = null;
    } else if (buttonNum === 4) {
        buttonOneOn = false;
        buttonTwoOn = false;
        buttonThreeOn = false;
        buttonFourOn = true;
        document.getElementById("button_one").style.backgroundColor = null;
        document.getElementById("button_two").style.backgroundColor = null;
        document.getElementById("button_three").style.backgroundColor = null;
        document.getElementById("button_four").style.backgroundColor = "#42a7f5";
    }
}

function clearPage() {
    document.getElementById("main_chart").innerHTML = "";
    document.getElementById("main_description").innerHTML = "";
    document.getElementById("axis_dropdown").innerHTML = "";
    document.getElementById("region_checkbox").innerHTML = "";
    document.getElementById("explore_instruction").innerHTML = "";
}

function clearChart() {
    document.getElementById("main_chart").innerHTML = "";
}

function loadOverview() {
    clearPage();

    document.getElementById("main_description").innerHTML = "<p>\n" +
        "According to studies, the vaccination campaign substantially mitigates COVID-19 outbreaks by reducing incidence, hospitalizations, and deaths in the United States. Here, the visualization project is to study the impact of vaccination on protecting US states against COVID-19.\n" +
        "</p>\n" +
        "<p>\n" +
        "The scatter plot shows the incident rate (cases per 100k) versus doses administrated (per 100k) for each state. A circle represents a state. We expect a higher vaccination rate leads to a lower incident rate. For identifying patterns and exceptions, please proceed to the next scene\n" +
        "<button type=\"button\" onclick=\"if (buttonTwoOn===false) {updateButton(2); loadPattern();}\">2. Identify Patterns and Exceptions</button>\n" +
        "</p>";

    //svg
    Svg = d3.select("#main_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        //.attr("viewBox", "0 0 100% 100%")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var X = d3.scaleLinear()
        .domain([130000, 290000])
        .range([0, width]);
    Svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(X));

    // Add Y axis
    var Y = d3.scaleLinear()
        .domain([20000, 43000])
        .range([height, 0]);
    Svg.append("g")
        .call(d3.axisLeft(Y));

    d3.csv("data_by_state.csv", function (data) {
        Svg.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return X(parseInt(d.Admin_Per_100K));
            })
            .attr("cy", function (d) {
                return Y(parseInt(d.Incident_Rate));
            })
            .attr("r", 4)
            .style("stroke", "#6aaa96")
            .style("stroke-width", 3)
            .style("fill", "none")
    })

    //X label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 250)
        .attr("y", height + 40)
        .text("Doses Administrated Per 100K");

    //Y label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", -250)
        .attr("y", -60)
        .attr("transform", "rotate(-90)")
        .text("Incident Rate - Cases Per 100K");
}

// scene 2
function loadPattern() {
    clearPage();

    document.getElementById("main_description").innerHTML = "<p>\n" +
        "As the trend line indicates, there is a correlation between the vaccination rate and the incident rate. However, an apparent anomaly is " +
        "<button type=\"button\" onclick=\"loadOverviewExceptions();\">Rhode Island</button>" +
        "(click for annotation), which has a high vaccination rate but still the highest incident rate.\n" +
        "</p>\n" +
        "<p>\n" +
        "Can we explain the anomaly with regions of states? Or can we see more patterns with regions? For viewing patterns for each region, please proceed to the next scene\n" +
        "<button type=\"button\" onclick=\"if (buttonThreeOn===false) {updateButton(3); loadRegionView();}\">3. View Regional Patterns</button>\n" +
        "<p>";

    //svg
    Svg = d3.select("#main_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        //.attr("viewBox", "0 0 100% 100%")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var X = d3.scaleLinear()
        .domain([130000, 290000])
        .range([0, width]);
    Svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(X));

    // Add Y axis
    var Y = d3.scaleLinear()
        .domain([20000, 43000])
        .range([height, 0]);
    Svg.append("g")
        .call(d3.axisLeft(Y));

    d3.csv("data_by_state.csv", function (data) {
        // Add dots
        Svg.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return X(parseInt(d.Admin_Per_100K));
            })
            .attr("cy", function (d) {
                return Y(parseInt(d.Incident_Rate));
            })
            .attr("r", 4)
            .style("stroke", "#6aaa96")
            .style("stroke-width", 3)
            .style("fill", "none")
    })

    // X label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 250)
        .attr("y", height + 40)
        .text("Doses Administrated Per 100K");

    //Y label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", -250)
        .attr("y", -60)
        .attr("transform", "rotate(-90)")
        .text("Incident Rate - Cases Per 100K");

    loadOverviewTrend(X, Y);
}

function loadOverviewTrend(X, Y) {
    var Annot = [
        {
            type: d3.annotationLabel,
            note: {
                //label: "Y = -0.0495 X + 40,398",
                title: "All States",
                wrap: 200
            },
            x: X(140000),
            y: Y(33468),
            dy: Y(26538) - Y(33468),
            dx: X(280000) - X(140000)
        }].map(function (d) {
        d.color = "#6aaa96";
        return d
    })

    var makeAnnot = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(Annot)

    Svg.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnot)
}

function loadOverviewExceptions() {
    var Annot = [
        {
            type: d3.annotationCalloutCircle,
            note: {
                //label: "Rhode Island",
                title: "Rhode Island",
                wrap: 120
            },
            //radius for circle
            subject: {
                radius: 20
            },
            x: 365,
            y: 24,
            dy: 40,
            dx: 40
        }].map(function (d) {
        d.color = "#e67f83";
        return d
    })

    var makeAnnot = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(Annot)

    Svg.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnot)
}


function loadRegionView() {
    clearPage();

    document.getElementById("main_description").innerHTML = "<p>\n" +
        "Each state is colored based on census regions - <span style=\"color: #ffa600\">West</span>, " +
        "<span style=\"color: #61ad44\">South</span>, " +
        "<span style=\"color: #00918e\">Northeast</span>, " +
        "<span style=\"color: #346888\">Midwest</span>. For the Northeast, West, and South, " +
        "there are still patterns that a higher vaccination rate leads to a lower incident rate, " +
        "but not Midwest. In addition, the anomaly of <button type=\"button\" onclick=\"loadOverviewExceptions();\">Rhode Island</button>" +
        "(click for annotation) is still unexplained. Can we find the explanation by further exploring the dataset?\n" +
        "</p>\n" +
        "<p>\n" +
        "To explore the dataset independently and identify other patterns, please proceed to the next scene\n" +
        "<button type=\"button\" onclick=\"if (buttonFourOn===false) {updateButton(4); loadExploration();}\">4. Explore the Dataset</button>\n" +
        "</p>";

    //svg
    Svg = d3.select("#main_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        //.attr("viewBox", "0 0 100% 100%")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var X = d3.scaleLinear()
        .domain([130000, 290000])
        .range([0, width]);
    Svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(X));

    // Add Y axis
    var Y = d3.scaleLinear()
        .domain([20000, 43000])
        .range([height, 0]);
    Svg.append("g")
        .call(d3.axisLeft(Y));

    d3.csv("data_by_state.csv", function (data) {
        // Add dots
        Svg.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return X(parseInt(d.Admin_Per_100K));
            })
            .attr("cy", function (d) {
                return Y(parseInt(d.Incident_Rate));
            })
            .attr("r", 4)
            .style("stroke", function (d) {
                return d.Color;
            })
            .style("stroke-width", 3)
            .style("fill", "none")
    })

    // X label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 250)
        .attr("y", height + 40)
        .text("Doses Administrated Per 100K");

    //Y label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", -250)
        .attr("y", -60)
        .attr("transform", "rotate(-90)")
        .text("Incident Rate - Cases Per 100K");

    var Annot = [
        {
            type: d3.annotationLabel,
            note: {
                //label: "Y = -0.0656 X + 43,134",
                title: "West",
                wrap: 200
            },
            x: X(140000),
            y: Y(33950),
            dy: Y(24766) - Y(33950),
            dx: X(300000) - X(140000),
            color: "#ffa600"
        }, {
            type: d3.annotationLabel,
            note: {
                //label: "Y = -0.0755 X + 45,107",
                title: "South",
                wrap: 200
            },
            x: X(140000),
            y: Y(34537),
            dy: Y(22457) - Y(34537),
            dx: X(300000) - X(140000),
            color: "#61ad44"
        }, {
            type: d3.annotationLabel,
            note: {
                //label: "Y = -0.0510 X + 41,966",
                title: "Northeast",
                wrap: 200
            },
            x: X(140000),
            y: Y(34826),
            dy: Y(26666) - Y(34826),
            dx: X(300000) - X(140000),
            color: "#00918e"
        }, {
            type: d3.annotationLabel,
            note: {
                //label: "Y = 0.0125 X + 28,322",
                title: "Midwest",
                wrap: 200
            },
            x: X(140000),
            y: Y(30072),
            dy: Y(32072) - Y(30072),
            dx: X(300000) - X(140000),
            color: "#346888"
        }]

    var makeAnnot = d3.annotation()
        .type(d3.annotationLabel)
        .annotations(Annot)

    Svg.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnot)
}


function loadExploration() {
    clearPage();

    document.getElementById("main_description").innerHTML = "</p>Explore by changing axis, selecting region(s), zooming, or panning\n" +
        "<p>";
    document.getElementById("axis_dropdown").innerHTML = "X Asix: " +
        "    <select class=\"dropdown\" id=\"x_dropdown\">\n" +
        "        <option value=\"Admin_Per_100K\">Doses Administrated Per 100K</option>\n" +
        "        <option value=\"Admin_Per_100k_65Plus\">Doses Administrated Per 100K for 65 Plus</option>\n" +
        "    </select>\n" +
        "&nbsp &nbsp Y Asix: " +
        "    <select class=\"dropdown\" id=\"y_dropdown\">\n" +
        "        <option value=\"Incident_Rate\">Incident Rate</option>\n" +
        "        <option value=\"Case_Fatality_Ratio\">Case Fatality Ratio</option>\n" +
        "    </select>"

    // dropdown listener
    d3.selectAll(".dropdown").on("change", function (d) {
        var xAxisValue = d3.select("#x_dropdown").property("value");
        var yAxisValue = d3.select("#y_dropdown").property("value");
        if (xAxisValue === "Admin_Per_100K" && yAxisValue === "Incident_Rate") {
            updateExploration(130000, 290000, 20000, 43000, xAxisValue, yAxisValue,
                "Doses Administrated Per 100K", "Incident Rate - Cases Per 100K");
        } else if (xAxisValue === "Admin_Per_100k_65Plus" && yAxisValue === "Incident_Rate") {
            updateExploration(250000, 440000, 20000, 43000, xAxisValue, yAxisValue,
                "Doses Administrated Per 100K for Aged 65 Plus", "Incident Rate - Cases Per 100K");
        } else if (xAxisValue === "Admin_Per_100K" && yAxisValue === "Case_Fatality_Ratio") {
            updateExploration(130000, 290000, 0.45, 1.45, xAxisValue, yAxisValue,
                "Doses Administrated Per 100K", "Case Fatality Rate (%)");
        } else if (xAxisValue === "Admin_Per_100k_65Plus" && yAxisValue === "Case_Fatality_Ratio") {
            updateExploration(250000, 440000, 0.45, 1.45, xAxisValue, yAxisValue,
                "Doses Administrated Per 100K for Aged 65 Plus", "Case Fatality Rate (%)");
        }
    });

    // initial plot
    var xAxisValue = d3.select("#x_dropdown").property("value");
    var yAxisValue = d3.select("#y_dropdown").property("value");
    updateExploration(130000, 290000, 20000, 43000, xAxisValue, yAxisValue,
        "Doses Administrated Per 100K", "Incident Rate - Cases Per 100K");
}


function updateExploration(xDomainL, xDomainH, yDomainL, yDomainH, xAxisValue, yAxisValue, xLabel, yLabel) {
    clearChart();

    document.getElementById("region_checkbox").innerHTML = "Select Region(s): " +
        "    &nbsp <input type=\"checkbox\" class=\"checkbox\" value=\"Northeast\" checked><label><span style=\"color: #00918e\">Northeast</span></label>\n" +
        "    &nbsp <input type=\"checkbox\" class=\"checkbox\" value=\"Midwest\" checked><label><span style=\"color: #346888\">Midwest</span></label>\n" +
        "    &nbsp <input type=\"checkbox\" class=\"checkbox\" value=\"South\" checked><label><span style=\"color: #61ad44\">South</span></label>\n" +
        "    &nbsp <input type=\"checkbox\" class=\"checkbox\" value=\"West\" checked><label><span style=\"color: #ffa600\">West</span></label>";

    document.getElementById("explore_instruction").innerHTML = "Zoom: scroll wheel (zoom in/out) or double click (zoom in) " +
        "&nbsp &nbsp Change View (Panning): drag to move"

    //svg
    Svg = d3.select("#main_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //.attr("viewBox", "0 0 100% 100%")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var x = d3.scaleLinear()
        .domain([xDomainL, xDomainH])
        .range([0, width]);
    var xAxis = Svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([yDomainL, yDomainH])
        .range([height, 0]);
    var yAxis = Svg.append("g")
        .call(d3.axisLeft(y));

    // X label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 250)
        .attr("y", height + 40)
        .text(xLabel);

    //Y label
    Svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", -250)
        .attr("y", -60)
        .attr("transform", "rotate(-90)")
        .text(yLabel);

    // clip - ensure no drawing out of area
    var clip = Svg.append("defs").append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    // element holder
    var scatter = Svg.append('g')
        .attr("clip-path", "url(#clip)")

    d3.csv("data_by_state.csv", function (data) {
        scatter.append('g')
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) {
                return d.Region
            })
            .attr("cx", function (d) {
                return x(parseInt(d[xAxisValue]));
            })
            .attr("cy", function (d) {
                return y(parseFloat(d[yAxisValue]));
            })
            .attr("r", 4)
            .style("stroke", function (d) {
                return d.Color;
            })
            .style("stroke-width", 3)
            .style("fill", "none")

        scatter.append("g")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", function (d) {
                return d.Region
            })
            .attr("dx", 6)
            .attr("dy", "0.35em")
            .attr("x", function (d) {
                return x(parseInt(d[xAxisValue]));
            })
            .attr("y", function (d) {
                return y(parseFloat(d[yAxisValue]));
            })
            .text(function (d) {
                return d.State;
            })
            .attr("font-size", 10)
            .attr("fill", "#555555");
    })

    // zoom control - with scale
    var zoom = d3.zoom()
        .scaleExtent([.5, 10])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomChart);

    // zoom event listener
    Svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(zoom);

    // A function that updates the chart when the user zoom and thus new boundaries are available
    function zoomChart() {

        // new scale
        var newX = d3.event.transform.rescaleX(x);
        var newY = d3.event.transform.rescaleY(y);

        // update axis
        xAxis.call(d3.axisBottom(newX))
        yAxis.call(d3.axisLeft(newY))

        // update circle position
        scatter
            .selectAll("circle")
            .attr('cx', function (d) {
                return newX(parseInt(d[xAxisValue]))
            })
            .attr('cy', function (d) {
                return newY(parseFloat(d[yAxisValue]))
            });
        // update test position
        scatter
            .selectAll("text")
            .attr('x', function (d) {
                return newX(parseInt(d[xAxisValue]))
            })
            .attr('y', function (d) {
                return newY(parseFloat(d[yAxisValue]))
            });
    }

    function filterChart() {
        d3.selectAll(".checkbox").each(function (d) {
            cb = d3.select(this);
            value = cb.property("value");

            if (cb.property("checked")) {
                Svg.selectAll("." + value)
                    .transition()
                    .duration(300)
                    .style("opacity", 1)
                    .attr("r", 4)
            } else {
                Svg.selectAll("." + value)
                    .transition()
                    .duration(300)
                    .style("opacity", 0)
                    .attr("r", 0)
            }
        })
    }

    // checkbox listener
    d3.selectAll(".checkbox").on("change", function (d) {
        filterChart();
    });
}