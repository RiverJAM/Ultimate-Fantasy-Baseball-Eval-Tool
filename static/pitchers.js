var IDs = [];
var pitcher_data = [];

var firstGranim = new Granim({
  element: "#first",
  name: "first-gradient",
  direction: "diagonal",
  position: ["center", "center"],
  opacity: [1, 1],
  image: {
    source: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/U.S._Cellular_Field_%2830972191694%29.jpg/1280px-U.S._Cellular_Field_%2830972191694%29.jpg",
    stretchMode: ["stretch", "stretch"],
    blendingMode: "overlay"
  },
  states: {
    "default-state": {
      gradients: [["#8BC34A", "#FF9800"], ["#FF0000", "#000000"]]
    }
  }
});

fetch("/pitchersData").then(function (response) {
  console.log("Test");
  if (response.status !== 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }
  response.json().then(function (data) {
      pitcher_data = data
      console.log(data)
      var IDs = Object.values(data);
      for (i = 0; i < IDs.length; i++) {
        d3.select("#selDataset").append("option").text(data[i]["name"]);
        d3.select("#selDataset2").append("option").text(data[i]["name"]);
      }
      getSelectionPitchers();
      getSelectionPitchers2();
  });
  }).catch(function (error) {
	console.log(error);
}); 

//call getSelection at the beginning on an initial value

d3.selectAll("#selDataset").on("change", getSelectionPitchers);
d3.selectAll("#selDataset2").on("change", getSelectionPitchers2);
// var testSubject = d3.select("#selDataset").property("value");

// function which will take the value of the drop down, then create the
// metadata table.  It also calls the functions to create the bar graph, bubble and gauge charts.

function getSelectionPitchers() {
  // need to fetch our csv data using flask here
  
    var playerSelectedName = (
      d3.select("#selDataset").property("value") 
    );

    //filter the dataset by the dropdown item
    var fantasyPitcherData = pitcher_data.filter((m) => m.name === playerSelectedName);
      console.log(fantasyPitcherData)
    // pull out the data from the dropdown item for the demographic information
    var wData = fantasyPitcherData.map((m) => m.win);
    var lData = fantasyPitcherData.map((m) => m.loss);
    var soData = fantasyPitcherData.map((m) => m.k);
    var eraData = fantasyPitcherData.map((m) => m.era);
    var whipData = fantasyPitcherData.map((m) => m.whip);
    var saveData = fantasyPitcherData.map((m) => m.save);
    var holdData = fantasyPitcherData.map((m) => m.hold);
    var kpercentData = fantasyPitcherData.map((m) => m.kper);
    var bbpercentData = fantasyPitcherData.map((m) => m.bbper);
    d3.select("#wTable").text(`${wData}`);
    d3.select("#lTable").text(`${lData}`);
    d3.select("#soTable").text(`${soData}`);
    d3.select("#eraTable").text(`${eraData}`);
    d3.select("#whipTable").text(`${whipData}`);
    d3.select("#saveTable").text(`${saveData}`);
    d3.select("#holdTable").text(`${holdData}`);
    d3.select("#kperTable").text(`${kpercentData}`);
    d3.select("#bbperTable").text(`${bbpercentData}`);

    fbGraph(playerSelectedName);
    brGraph(playerSelectedName);
    chGraph(playerSelectedName);
    // gaugeChart(testSubject)
  };

  function getSelectionPitchers2() {
    // need to fetch our csv data using flask here
    
      var playerSelectedName2 = (
        d3.select("#selDataset2").property("value") 
      );
  
      //filter the dataset by the dropdown item
      var fantasyPitcherData2 = pitcher_data.filter((m) => m.name === playerSelectedName2);
        console.log(fantasyPitcherData2)
      // pull out the data from the dropdown item for the demographic information
      var wData = fantasyPitcherData2.map((m) => m.win);
    var lData = fantasyPitcherData2.map((m) => m.loss);
    var soData = fantasyPitcherData2.map((m) => m.k);
    var eraData = fantasyPitcherData2.map((m) => m.era);
    var whipData = fantasyPitcherData2.map((m) => m.whip);
    var saveData = fantasyPitcherData2.map((m) => m.save);
    var holdData = fantasyPitcherData2.map((m) => m.hold);
    var kpercentData = fantasyPitcherData2.map((m) => m.kper);
    var bbpercentData = fantasyPitcherData2.map((m) => m.bbper);
    d3.select("#wTable2").text(`${wData}`);
    d3.select("#lTable2").text(`${lData}`);
    d3.select("#soTable2").text(`${soData}`);
    d3.select("#eraTable2").text(`${eraData}`);
    d3.select("#whipTable2").text(`${whipData}`);
    d3.select("#saveTable2").text(`${saveData}`);
    d3.select("#holdTable2").text(`${holdData}`);
    d3.select("#kperTable2").text(`${kpercentData}`);
    d3.select("#bbperTable2").text(`${bbpercentData}`);
  
      fbGraph2(playerSelectedName2);
      brGraph2(playerSelectedName2);
      chGraph2(playerSelectedName2);

      // gaugeChart(testSubject)
    };


// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function fbGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let FFValues = pitcher_data.filter((m) => m.name === playerSelected);
    let FFValue = FFValues.map((m) => m.wfb_c);
    FFGraphValues = [FFValue[0], -.2]

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: FFGraphValues,
        type: "bar",
        hoverinfo: 'none',
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
        },
        text: FFGraphValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "FB value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("ffBar", trace1, layout);

    let CtValues = pitcher_data.filter((m) => m.name === playerSelected);
    console.log(CtValues)
    let CtValue = CtValues.map((m) => m.wct_c);
    Cutters = [CtValue[0], .16]
    console.log(Cutters)

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: Cutters,
        hoverinfo: 'none',
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: Cutters.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Cutter Value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("ctBar", trace2, layout2);
  
};

// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function brGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let cbValues = pitcher_data.filter((m) => m.name === playerSelected);
    let cbValue = cbValues.map((m) => m.wcb_c);
    curveBalls = [cbValue[0], -.02]

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: curveBalls,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: curveBalls.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "CB Value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("cbBar", trace1, layout);

    let slValues = pitcher_data.filter((m) => m.name === playerSelected);
    let slValue = slValues.map((m) => m.wsl_c);
    sliders = [slValue[0], 0.4]

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: sliders,
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: sliders.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Slider Value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("slBar", trace2, layout2);
  
};

function chGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let chValues = pitcher_data.filter((m) => m.name === playerSelected);
    let chValue = chValues.map((m) => m.wch_c);
    let changeups = [chValue[0], 0.2]

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: changeups,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: changeups.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "CH Value", yaxis: {range: [-3, 4], }}
    Plotly.newPlot("chBar", trace1, layout);

  };

// Second player graphs, fastballs
function fbGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let FFValues2 = pitcher_data.filter((m) => m.name === playerSelected);
    let FFValue2 = FFValues2.map((m) => m.wfb_c);
    FFGraphValues2 = [FFValue2[0], -.2]

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: FFGraphValues2,
        type: "bar",
        hoverinfo: 'none',
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
        },
        text: FFGraphValues2.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "Fastball Value", yaxis: {range: [-3,4]}}
    Plotly.newPlot("ffBar2", trace1, layout);

    
    // Cutter Graph
    let CtValues2 = pitcher_data.filter((m) => m.name === playerSelected);
    console.log(CtValues2)
    let CtValue2 = CtValues2.map((m) => m.ct_c);
    Cutters2 = [CtValue2[0], .16]
    console.log(Cutters2)

    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: Cutters2,
        hoverinfo: 'none',
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: Cutters2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Cutter Value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("ctBar2", trace2, layout2);
  
};

//Graphs of breaking balls, curveball and slider
function brGraph2(playerSelected) {
  console.log(playerSelected);
    
    //Curveball2 graph
    let cbValues2 = pitcher_data.filter((m) => m.name === playerSelected);
    let cbValue2 = cbValues2.map((m) => m.cb_c);
    curveBalls2 = [cbValue2[0], -.02]

    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: curveBalls2,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: curveBalls2.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "Curveball Value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("cbBar2", trace1, layout);


    // Slider2 Graph
    let slValues2 = pitcher_data.filter((m) => m.name === playerSelected);
    let slValue2 = slValues2.map((m) => m.wsl_c);
    sliders2 = [slValue2[0], 0.4]

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: sliders2,
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: sliders2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Slider Value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("slBar2", trace2, layout2);
  
};

function chGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let chValues2 = pitcher_data.filter((m) => m.name === playerSelected);
    let cbValue2 = chValues2.map((m) => m.wch_c);
    let changeups2 = [cbValue2[0], 0.2]

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: changeups2,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: changeups2.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "Changeup Value", yaxis: {range: [-3, 4]}}
    Plotly.newPlot("chBar2", trace1, layout);

  };