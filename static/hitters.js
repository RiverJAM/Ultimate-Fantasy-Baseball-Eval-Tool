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

fetch("/hittersdata").then(function (response) {
  console.log("Test");
  if (response.status !== 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }
  response.json().then(function (data) {
      hitter_data = data;
      var IDs = Object.values(data);
      for (i = 0; i < IDs.length; i++) {
        d3.select("#selDataset").append("option").text(IDs[i]["name"]);
        d3.select("#selDataset2").append("option").text(IDs[i]["name"]);
      }
      getSelectionHitters();
      getSelectionHitters2();
  });
  }).catch(function (error) {
	console.log(error);
}); 

//call getSelection at the beginning on an initial value

d3.selectAll("#selDataset").on("change", getSelectionHitters);
d3.selectAll("#selDataset2").on("change", getSelectionHitters2);
// var testSubject = d3.select("#selDataset").property("value");

// function which will take the value of the drop down, then create the
// metadata table.  It also calls the functions to create the bar graph, bubble and gauge charts.

function getSelectionHitters() {
  // need to fetch our csv data using flask here
  
    var playerSelectedName = (
      d3.select("#selDataset").property("value") 
    );

    //filter the dataset by the dropdown item
    var fantasyData = hitter_data.filter((m) => m.name === playerSelectedName);
      console.log(fantasyData)
    // pull out the data from the dropdown item for the demographic information
    var avgData = fantasyData.map((m) => m.avg);
    var opsData = fantasyData.map((m) => m.ops);
    var rData = fantasyData.map((m) => m.r);
    var rbiData = fantasyData.map((m) => m.rbi);
    var hrData = fantasyData.map((m) => m.hr);
    var sbData = fantasyData.map((m) => m.sb);
    d3.select("#avgTable").text(`${avgData}`);
    d3.select("#opsTable").text(`${opsData}`);
    d3.select("#rTable").text(`${rData}`);
    d3.select("#rbiTable").text(`${rbiData}`);
    d3.select("#hrTable").text(`${hrData}`);
    d3.select("#sbTable").text(`${sbData}`);

    OGraph(playerSelectedName);
    ZGraph(playerSelectedName);
    // gaugeChart(testSubject)
  };

  function getSelectionHitters2() {
    // need to fetch our csv data using flask here
    
      var playerSelectedName2 = (
        d3.select("#selDataset2").property("value") 
      );
  
      //filter the dataset by the dropdown item
      var fantasyData2 = hitter_data.filter((m) => m.name === playerSelectedName2);
        console.log(fantasyData2)
      // pull out the data from the dropdown item for the demographic information
      var avgData = fantasyData2.map((m) => m.avg);
      var opsData = fantasyData2.map((m) => m.ops);
      var rData = fantasyData2.map((m) => m.r);
      var rbiData = fantasyData2.map((m) => m.rbi);
      var hrData = fantasyData2.map((m) => m.hr);
      var sbData = fantasyData2.map((m) => m.sb);
      d3.select("#avgTable2").text(`${avgData}`);
      d3.select("#opsTable2").text(`${opsData}`);
      d3.select("#rTable2").text(`${rData}`);
      d3.select("#rbiTable2").text(`${rbiData}`);
      d3.select("#hrTable2").text(`${hrData}`);
      d3.select("#sbTable2").text(`${sbData}`);
  
      OGraph2(playerSelectedName2);
      ZGraph2(playerSelectedName2);
      // gaugeChart(testSubject)
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
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
        },
        text: OSwingValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "O-Swing %", yaxis: {
                range: [0, 1]
                }}
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
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: OContactValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "O-Contact %", yaxis: {range: [0, 1]}}
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
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: ZSwingValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "Z-Swing %", yaxis: {range: [0, 1]}}
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
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: ZContactValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Z-Contact %", yaxis: {range: [0, 1]}}
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
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: OSwingValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "O-Swing %", yaxis: {range: [0, 1]}}
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
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: OContactValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "O-Contact %", yaxis: {range: [0, 1]}}
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
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: ZSwingValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "Z-Swing %", yaxis: {range: [0, 1]}}
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
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: ZContactValues2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Z-Contact %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Zbar4", trace2, layout2);
  
};

