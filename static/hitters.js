var IDs = [];
var hitter_data = [];

var firstGranim = new Granim({
  element: "#first",
  name: "first-gradient",
  direction: "diagonal",
  position: ["center", "center"],
  opacity: [1, 1],
  image: {
    source: "https://i.pinimg.com/originals/83/10/ed/8310ed989af7431d7234bede1442cfae.jpg",
    stretchMode: ["stretch", "stretch"],
    blendingMode: "overlay"
  },
  states: {
    "default-state": {
      gradients: [["#8BC34A", "#FF9800"], ["#FF0000", "#000000"]]
    }
  }
});



fetch("/hittersdropdown").then(function (response) {
  // console.log("Test");
  if (response.status !== 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }
  response.json().then(function (hitters_list) {
  
    var IDs = Object.values(hitters_list);
    for (i = 0; i < IDs.length; i++) {
      d3.select("#selDataset").append("option").text(IDs[i]["name"]);
      d3.select("#selDataset2").append("option").text(IDs[i]["name"]);
    }

    getSelectionHitters()
    fetch("/hittersdata").then(function (res) {
      res.json().then(function (data) {
        hitter_data = data;
        // console.log(data)
        
      }
      )
    }).catch(function (error) {
      console.log(error);
    });


  });
}).catch(function (error) {
  console.log(error);
});

//call getSelection at the beginning on an initial value

d3.selectAll("#selDataset").on("change", getSelectionHitters);
d3.selectAll("#selDataset2").on("change", getSelectionHitters);
// var testSubject = d3.select("#selDataset").property("value");

// function which will take the value of the drop down, then create the
// metadata table.  It also calls the functions to create the bar graph, bubble and gauge charts.

function getSelectionHitters() {
  // need to fetch our csv data using flask here

  var playerSelectedName = (
    d3.select("#selDataset").property("value")
  );

  //filter the dataset by the dropdown item
  var fantasyData_2018 = hitter_data.filter((m) => m.name_2018 === playerSelectedName);
  // pull out the data from the dropdown item for the demographic information

  var avgData_2018 = fantasyData_2018.map((m) => m.avg_2018);
  var opsData_2018 = fantasyData_2018.map((m) => m.ops_2018);
  var rData_2018 = fantasyData_2018.map((m) => m.r_2018);
  var rbiData_2018 = fantasyData_2018.map((m) => m.rbi_2018);
  var hrData_2018 = fantasyData_2018.map((m) => m.hr_2018);
  var sbData_2018 = fantasyData_2018.map((m) => m.sb_2018);
  d3.select("#avgTable_2018").text(`${avgData_2018}`);
  d3.select("#opsTable_2018").text(`${opsData_2018}`);
  d3.select("#rTable_2018").text(`${rData_2018}`);
  d3.select("#rbiTable_2018").text(`${rbiData_2018}`);
  d3.select("#hrTable_2018").text(`${hrData_2018}`);
  d3.select("#sbTable_2018").text(`${sbData_2018}`);



  OGraph(playerSelectedName);
  ZGraph(playerSelectedName);

  var playerSelectedName2 = (
    d3.select("#selDataset2").property("value")
  );

  //filter the dataset by the dropdown item
  var fantasyData_2018_2 = hitter_data.filter((m) => m.name_2018 === playerSelectedName2);
  console.log(fantasyData_2018_2)
  // pull out the data from the dropdown item for the demographic information

  var avgData_2018_2 = fantasyData_2018_2.map((m) => m.avg_2018);
  var opsData_2018_2 = fantasyData_2018_2.map((m) => m.ops_2018);
  var rData_2018_2 = fantasyData_2018_2.map((m) => m.r_2018);
  var rbiData_2018_2 = fantasyData_2018_2.map((m) => m.rbi_2018);
  var hrData_2018_2 = fantasyData_2018_2.map((m) => m.hr_2018);
  var sbData_2018_2 = fantasyData_2018_2.map((m) => m.sb_2018);
  d3.select("#avgTable_2018_2").text(`${avgData_2018_2}`);
  d3.select("#opsTable_2018_2").text(`${opsData_2018_2}`);
  d3.select("#rTable_2018_2").text(`${rData_2018_2}`);
  d3.select("#rbiTable_2018_2").text(`${rbiData_2018_2}`);
  d3.select("#hrTable_2018_2").text(`${hrData_2018_2}`);
  d3.select("#sbTable_2018_2").text(`${sbData_2018_2}`);

  OGraph2(playerSelectedName2);
  ZGraph2(playerSelectedName2);
  // gaugeChart(testSubject)22


  // console.log("What is going on?");
  // var avgDif = avgData - avgData2;
  // var opsDif = opsData - opsData2;
  // var rDif = rData - rData2;
  // var rbiDif = rbiData - rbiData2;
  // var hrDif = hrData - hrData2;
  // var sbDif = sbData - sbData2;
  // d3.select("#avgDIF").text(`${avgDif}`);
  // d3.select("#opsDIF").text(`${opsDif}`);
  // d3.select("#rDIF").text(`${rDif}`);
  // d3.select("#rbiDIF").text(`${rbiDif} `);
  // d3.select("#hrDIF").text(` ${hrDif}`);
  // d3.select("#sbDIF").text(` ${sbDif}`);

};


// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function OGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

  let swingValues = hitter_data.filter((m) => m.name === playerSelected);
  console.log(swingValues)
  let playerOSwingValues = swingValues.map((m) => m.o_swing);
  OSwingValues = [playerOSwingValues[0], .320]
  console.log(OSwingValues)

  // bar graph the results
  var trace1 = [
    {
      x: [playerSelected, "League Average"],
      y: OSwingValues,
      type: "bar",
      hoverinfo: 'none',
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)'],
      },
      text: OSwingValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {
    title: "O-Swing %", yaxis: {
      range: [0, 1]
    }
  }
  Plotly.newPlot("Obar", trace1, layout);

  // O-contact data for the first hitter
  let o_contactValues = hitter_data.filter((m) => m.name === playerSelected);
  console.log(o_contactValues)
  let playerOContactValues = o_contactValues.map((m) => m.o_contact);
  OContactValues = [playerOContactValues[0], .630]
  console.log(OContactValues)

  // bar graph the results
  var trace2 = [
    {
      x: [playerSelected, "League Average"],
      y: OContactValues,
      type: "bar",
      marker: {
        color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
      },
      text: OContactValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout2 = { title: "O-Contact %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Obar2", trace2, layout2);

};

// function which creates teh bar graph for Z-values.  
function ZGraph(playerSelected) {
  console.log(playerSelected);

  // first player z-swing data

  let z_swingValues = hitter_data.filter((m) => m.name === playerSelected);
  let playerZSwingValues = z_swingValues.map((m) => m.z_swing);
  ZSwingValues = [playerZSwingValues[0], .690]

  // bar graph Z-swing results first player
  var trace1 = [
    {
      x: [playerSelected, "League Average"],
      y: ZSwingValues,
      type: "bar",
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)']
      },
      text: ZSwingValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = { title: "Z-Swing %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Zbar", trace1, layout);

  // Z-contact values for first player
  let z_contactValues = hitter_data.filter((m) => m.name === playerSelected);
  let playerZContactValues = z_contactValues.map((m) => m.z_contact);
  ZContactValues = [playerZContactValues[0], .630]

  // bar graph the z-contact results
  var trace2 = [
    {
      x: [playerSelected, "League Average"],
      y: ZContactValues,
      type: "bar",
      marker: {
        color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
      },
      text: ZContactValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout2 = { title: "Z-Contact %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Zbar2", trace2, layout2);

};


// second player o-swing graph
function OGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection
  // for o-swing
  let swingValues = hitter_data.filter((m) => m.name === playerSelected);
  console.log(swingValues)
  let playerOSwingValues = swingValues.map((m) => m.o_swing);
  OSwingValues = [playerOSwingValues[0], .320]
  console.log(OSwingValues)

  // bar graph the o-swing results
  var trace1 = [
    {
      x: [playerSelected, "League Average"],
      y: OSwingValues,
      type: "bar",
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)']
      },
      text: OSwingValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = { title: "O-Swing %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Obar3", trace1, layout);

  // o-contact data for second player
  let o_contactValues = hitter_data.filter((m) => m.name === playerSelected);
  console.log(o_contactValues)
  let playerOContactValues = o_contactValues.map((m) => m.o_contact);
  OContactValues = [playerOContactValues[0], .630]
  console.log(OContactValues)

  // bar graph the o-swing results
  var trace2 = [
    {
      x: [playerSelected, "League Average"],
      y: OContactValues,
      type: "bar",
      marker: {
        color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
      },
      text: OContactValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout2 = { title: "O-Contact %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Obar4", trace2, layout2);

};

function ZGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

  let z_swingValues = hitter_data.filter((m) => m.name === playerSelected);
  console.log(z_swingValues)
  let playerZSwingValues = z_swingValues.map((m) => m.z_swing);
  ZSwingValues = [playerZSwingValues[0], .690]
  console.log(ZSwingValues)

  // bar graph the results
  var trace1 = [
    {
      x: [playerSelected, "League Average"],
      y: ZSwingValues,
      type: "bar",
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)']
      },
      text: ZSwingValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = { title: "Z-Swing %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Zbar3", trace1, layout);

  // Z-contact values for second player
  let z_contactValues2 = hitter_data.filter((m) => m.name === playerSelected);
  console.log(z_contactValues2)
  let playerZContactValues2 = z_contactValues2.map((m) => m.z_contact);
  ZContactValues2 = [playerZContactValues2[0], .630]
  console.log(ZContactValues2)

  // bar graph the results
  var trace2 = [
    {
      x: [playerSelected, "League Average"],
      y: ZContactValues2,
      type: "bar",
      marker: {
        color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
      },
      text: ZContactValues2.map(String),
      textposition: 'auto',
    },
  ];
  var layout2 = { title: "Z-Contact %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Zbar4", trace2, layout2);

};

