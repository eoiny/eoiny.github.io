function createViz() {
  d3.csv("data/test.csv", type, function (error, data) {
    if (error) throw error;

    dataViz(data)
  });
}

function dataViz(data) {
  //console.log(data)

  //setup tooltip div & nav rect
  var tooltip = d3.select("#tooltip")
    .style("opacity", 0);



  //content for annotations
  var annotations = [{
      key: 1986,
      xPos: "08-25",
      yPos: 68,
      note: "■ Spéirling Charley, 25-26ú Lúnasa"
    },
    //{key:1987, xPos : "01-05", yPos : 40, note: "■ Heavy Snowfall, Jan"},
    {
      key: 1987,
      xPos: "10-21",
      yPos: 40,
      note: "■ Tuilte ó thuaidh, 21ú Deire Fómhair"
    },
    // {key:1988, xPos : "02-09", yPos : 40, note: "■ Gaoth fórsa stoirme, 9 Feb"},
    // {key:1989, xPos : "10-28", yPos : 40, note: "■ Heavy rainfall in the west, 27-28 Oct"},
    {
      key: 1990,
      xPos: "02-10",
      yPos: 40,
      note: "■ Stoirmeachaí, báisteach trom, Feabhra"
    },
    // {key:1991, xPos : "01-05", yPos : 40, note: "■ Wind storm, 5 Jan"},
    {
      key: 1993,
      xPos: "06-11",
      yPos: 40,
      note: "■ Tuilte BÁC/Cill Dara, 11 Meitheamh"
    },
    // {key:1995, xPos : "03-17", yPos : 40, note: "■ Tornado in Meath, 17 Mar"},
    {
      key: 1995,
      xPos: "07-12",
      yPos: 40,
      note: "■ An Samhradh is teocha sna taifid"
    },
    {
      key: 1997,
      xPos: "08-06",
      yPos: 40,
      note: "■ Tuilte san oirdheisceart, 3-6ú Lúnasa"
    },
    {
      key: 1997,
      xPos: "12-24",
      yPos: 40,
      note: "■ Stoirm gaoithe"
    },
    {
      key: 1997,
      xPos: "12-24",
      yPos: 50,
      note: "24ú Nollaig"
    },
    {
      key: 1998,
      xPos: "12-26",
      yPos: 40,
      note: "■ Gaoithe fórsa"
    },
    {
      key: 1998,
      xPos: "12-26",
      yPos: 50,
      note: "speirlinge, 26ú Nollag"
    },
    {
      key: 2000,
      xPos: "11-05",
      yPos: 40,
      note: "■ Tuilte damanta, 5ú Samhain"
    },
    {
      key: 2002,
      xPos: "02-01",
      yPos: 40,
      note: "■ Tulite ar chóstaí an oirthear & deiscirt, 1ú Feabra"
    },
    {
      key: 2002,
      xPos: "11-14",
      yPos: 40,
      note: "■ Droch tuilte san oirthar, 14ú Samhain"
    },
    {
      key: 2003,
      xPos: "09-19",
      yPos: 40,
      note: "■ Sciorradh taluún i bPoll an tSómais"
    },
    {
      key: 2006,
      xPos: "07-18",
      yPos: 40,
      note: "■ An samhradh is teocha, tirime"
    },
    {
      key: 2008,
      xPos: "07-15",
      yPos: 40,
      note: "■ Droch tuillte,fliuchras dhon tsamhradh"
    },
    {
      key: 2009,
      xPos: "11-05",
      yPos: 40,
      note: "■ Tuilte Samhana"
    },
    {
      key: 2010,
      xPos: "11-15",
      yPos: 40,
      note: "■ Tréimhse fuacht crua,"
    },
    {
      key: 2010,
      xPos: "11-15",
      yPos: 50,
      note: "Samhain-Nollag"
    },
    {
      key: 2011,
      xPos: "10-24",
      yPos: 40,
      note: "■ Báisteach trom i mBÁC, 24ú Deire Fómhar"
    },
    {
      key: 2014,
      xPos: "02-12",
      yPos: 40,
      note: "■ Darwin, 12 Feabhra"
    },
    {
      key: 2015,
      xPos: "11-15",
      yPos: 42,
      note: "■ Abigail, 7-15 Samhain"
    },
    {
      key: 2015,
      xPos: "11-16",
      yPos: 53,
      note: "■ Barney, 16-18 Samhain"
    },
    {
      key: 2015,
      xPos: "11-26",
      yPos: 65,
      note: "■ Clodagh, 26-30 Samhain"
    },
    {
      key: 2015,
      xPos: "12-03",
      yPos: 76,
      note: "■ Desmond, 3-8 Nollag"
    },
    {
      key: 2015,
      xPos: "12-22",
      yPos: 87,
      note: "■ Eva, 22-25 Nollag"
    },
    {
      key: 2015,
      xPos: "12-28",
      yPos: 98,
      note: "■ Frank, 28 Nollag"
    },
    {
      key: 2016,
      xPos: "01-29",
      yPos: 27,
      note: "■ Gertrude, 29 Eanair"
    },
    {
      key: 2016,
      xPos: "02-01",
      yPos: 39,
      note: "■ Henry, 1-2 Feabhra"
    },
    {
      key: 2016,
      xPos: "02-08",
      yPos: 50,
      note: "■ Imogen, 8 Feabhra"
    }
    //{key:2016, xPos : "03-01", yPos : 50, note: "■ Storm Jake, 1-4 Mar"},
    //{key:2016, xPos : "03-05", yPos : 70, note: "■ Storm Katie, 25-28 Mar"}
  ];


  var annotationsPerYear = d3.nest()
    .key(function (d) {
      return d.key;
    })
    .entries(annotations);

  // Parse the date / time
  var formatDate = d3.time.format("%d-%b"),
    formatMth = d3.time.format("%m-%d"),
    formatYear = d3.time.format("%Y");

  var bisect = d3.bisector(function (d) {
    return d.xPos;
  }).left;


  data.forEach(function (d) {
    d.xPos = formatMth(d.date);
    d.notes = (annotationsPerYear);
  });

  var margin = {
      top: 0,
      right: 10,
      bottom: 0,
      left: 10
    },
    width = 960 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;


  //this works as an x domain with range bands
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
  var y = d3.scale.linear().range([0, height]);

  var months = [{
      "val": "01-01",
      "key": "Jan",
      "mi": "Ean"
    },
    {
      "val": "02-01",
      "key": "Feb",
      "mi": "Fea"
    },
    {
      "val": "03-01",
      "key": "Mar",
      "mi": "Már"
    },
    {
      "val": "04-01",
      "key": "Apr",
      "mi": "Aib"
    },
    {
      "val": "05-01",
      "key": "May",
      "mi": "Beál"
    },
    {
      "val": "06-01",
      "key": "Jun",
      "mi": "Mei"
    },
    {
      "val": "07-01",
      "key": "Jul",
      "mi": "Iúil"
    },
    {
      "val": "08-01",
      "key": "Aug",
      "mi": "Lún"
    },
    {
      "val": "09-01",
      "key": "Sep",
      "mi": "Meán"
    },
    {
      "val": "10-01",
      "key": "Oct",
      "mi": "D. Fómh"
    },
    {
      "val": "11-01",
      "key": "Nov",
      "mi": "Samh"
    },
    {
      "val": "12-01",
      "key": "Dec",
      "mi": "Noll"
    }
  ];


  var dataPerYear = d3.nest()
    .key(function (d) {
      return formatYear(d.date);
    })
    .entries(data);

  //https://stackoverflow.com/questions/36581894/how-do-i-account-for-leap-years-when-mapping-to-an-ordinal-scale-in-d3
  var leapYearDays = []; // will be populated with all dates
  var currentDate = new Date(2016, 0, 1); // the date we'll be incrementing
  var safety = 0; // helps prevent infinite looping during development



  while (safety < 400 && currentDate.getFullYear() == 2016) {
    leapYearDays.push(formatMth(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
    safety++;
  }


  // x.domain(leapYearDays.map(function(d) { return d; }));
  x.domain(leapYearDays);
  //x.domain(data.map(function(d) { return d.xPos; }));
  y.domain([0, d3.max(data, function (d) {
    return d.rain;
  })]);

  //x.domain.push("02-29");
  //console.log(x.domain())

  //console.log(d3.max(data, function(d) { return d.rain+","+ d.date; }))

  var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues(["02-01", "03-01", "04-01", "05-01", "06-01", "07-01", "08-01", "09-01", "10-01", "11-01", "12-01"])
    .tickSize(height + 60, 0, 0)
    .tickFormat("")
    .orient("top");


  var svg = d3.select("#chart").selectAll("svg")
    .data(dataPerYear)
    .enter().append("svg")
    .attr("class", "charts")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .style("opacity", 0)
    .transition()
    .duration(2000)
    .style("opacity", 1);


  svg.append("text")
    .attr("class", "year")
    .attr("transform", "rotate(-90)")
    .attr("y", 100)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d.key;
    });

  //https://stackoverflow.com/questions/36481775/how-to-add-an-array-of-annotations-to-a-d3-barchart/36483818#36483818
  //thanks @meetamit
  svg.selectAll(".annotation")
    .data(function (d) {
      return annotations.filter(function (a) {
        return a.key == d.key;
      });
    })
    .enter()
    .append("text")
    .attr("class", "annotation").attr("transform", "translate(3,0)")
    .style("text-anchor", "start")
    .attr("x", function (d) {
      return x(d.xPos);
    })
    .attr("y", function (d) {
      return d.yPos;
    })
    .text(function (d) {
      return d.note;
    });



  svg.selectAll(".bar")
    .data(function (d) {
      return d.values;
    })
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return x(formatMth(d.date));
    })
    .attr("y", 0)
    .attr("width", x.rangeBand())
    .attr("height", 0)
    .transition()
    .duration(1000)
    .ease("quad")
    .attr("height", function (d) {
      return y(d.rain);
    });


  var focus = svg.append("g");
  focus.style("display", "none");

  // append the rect at the intersection
  focus.append("rect")
    .attr("class", function (d) {
      return "y" + d.key;
    })
    .style("opacity", 0.5)
    .style("fill", "none")
    .attr("width", x.rangeBand())
    .attr("height", height);


  // append the rectangle to capture mouse
  svg.append("rect")
    .attr("width", width + margin.left + margin.right)
    //.attr("width",x.rangeBand()*366)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", function (d, i) {
      return i;
    })
    .attr("chartID", function (d, i) {
      return i;
    })
    .attr("yearID", function (d) {
      return d.key;
    })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("mousemove", mousemove);

  //months at the top of page
  console.log(margin.left)
  var header = d3.select("#header")
    .append("svg")
    .attr("class", "label")
    .attr("width", width + margin.left + margin.right)
    .attr("height", 50)
    .append("g")
    .attr("transform", "translate(" + 3 + "," + margin.top + ")");



  header.selectAll("text")
    .append("text")
    .data(months)
    .enter()
    .append("text")
    .attr("y", 2)
    .attr("x", function (d) {
      return x(d.val);
    })
    .style("text-anchor", "middle")
    .attr("transform", "translate(1,6)")
    .text(function (d) {
      return d.mi;
    });


  header.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .style("opacity", 0)
    .transition()
    .duration(2000)
    .style("opacity", 1);



  function mousemove() {
    if (d3.mouse(this)[0] > x("01-01") && d3.mouse(this)[0] <= x("12-31")) {

      //use this for inverting ordinal scale https://stackoverflow.com/questions/20758373/inversion-with-ordinal-scale (sepans in the comments)
      var chartID = d3.select(this);
      var keyID = chartID.attr("chartID");
      var yearID = chartID.attr("yearID");
      var id = document.getElementById(keyID);

      //for using getBoundingClientRect() http://help.dottoro.com/ljvmcrrn.php
      var yPosPerChart = parseInt(id.getBoundingClientRect().top + 20);

      var domain = x.domain(),
        xpos = d3.mouse(this)[0],
        range = x.range();

      //console.log(x("01-01"));
      if (xpos < x("01-01")) xpos = x("01-01");

      //console.log((function(d) { return d.xPos; })());


      var x0 = domain[d3.bisect(range, xpos) - 1],
        i = bisect(dataPerYear[keyID].values, x0),
        d0 = dataPerYear[keyID].values[i - 1],
        d1 = dataPerYear[keyID].values[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      if (x0 == "12-31") {
        d = dataPerYear[keyID].values[364];
      }

      if (x0 == "01-01") {
        d = dataPerYear[keyID].values[0];
      }


      tooltip.transition()
        .duration(50)
        .style("opacity", .9);


      var toolMsg;

      if (d.rain == 0) {
        toolMsg = "Níor chaith sé aon braon báistí ar <i>" + formatDate(d.date) + "," + yearID + "</i>.";
      } else {
        toolMsg = "Chaith sé <b>" + d.rain + "mm</b> báistí, ar <i>" + formatDate(d.date) + "," + yearID + "</i>.";
      };



      //console.log(toolMsg);
      //tooltip.html("Chaith sé <b>" + d.rain + "mm</b> báistí, ar <i>" + formatDate(d.date) + "," + yearID + "</i>.")
      //tooltip.html("<b>" + d.rain + "mm</b> recorded on <i>" + formatDate(d.date) + "," + yearID + "</i>.")
      tooltip.html(toolMsg)
        .style("left", (d3.event.pageX) + 10 + "px")
        .style("top", (d3.event.pageY) + 10 + "px");

      //detect yPos
      //.style("top", yPosPerChart + "px");


      focus.style("display", null);

      focus.select("rect.y" + yearID)
        .attr("transform",
          "translate(" + x(formatMth(d.date)) + ",0)")
        .style("fill", "pink");

    }
  }

  function mouseover() {
    // console.log(d3.mouse(this)[0])
    if (d3.mouse(this)[0] > x("01-01") && d3.mouse(this)[0] <= x("12-31")) {
      tooltip.style("opacity", .9);
    }
  }

  function mouseout() {
    tooltip.style("opacity", 0);

    focus.select("rect")
      .style("fill", "none");

    focus.style("display", "none");
  }
}

function type(d) {
  //var format = d3.time.format("%d-%b-%Y");
  var format = d3.time.format("%d-%b-%y");
  d.rain = +d.rain;
  d.date = format.parse(d.date);
  return d;
}