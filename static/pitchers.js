var IDs = [];
var hitter_data = [];
var pitcher_data = [];

fetch("/pitchers").then(function (response) {
  console.log("Test");
  if (response.status !== 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }
  response.json().then(function (data) {
      pitcher_data = data;
      var IDs = Object.values(data);
      for (i = 0; i < IDs.length; i++) {
        d3.select("#selDataset").append("option").text(IDs[i][0]);
        d3.select("#selDataset2").append("option").text(IDs[i][0]);
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
    var fantasyPitcherData = pitcher_data.filter((m) => m[0] === playerSelectedName);
      console.log(fantasyPitcherData)
    // pull out the data from the dropdown item for the demographic information
    var wData = fantasyPitcherData.map((m) => m[7]);
    var lData = fantasyPitcherData.map((m) => m[8]);
    var soData = fantasyPitcherData.map((m) => m[9]);
    var eraData = fantasyPitcherData.map((m) => m[10]);
    var whipData = fantasyPitcherData.map((m) => m[11]);
    var saveData = fantasyPitcherData.map((m) => m[12]);
    var holdData = fantasyPitcherData.map((m) => m[13]);
    d3.select("#wTable").text(`Wins: ${wData}`);
    d3.select("#lTable").text(`Losses: ${lData}`);
    d3.select("#soTable").text(`K's: ${soData}`);
    d3.select("#eraTable").text(`ERA: ${eraData}`);
    d3.select("#whipTable").text(`WHIP: ${whipData}`);
    d3.select("#saveTable").text(`Saves: ${saveData}`);
    d3.select("#holdTable").text(`Holds: ${holdData}`);

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
      var fantasyPitcherData2 = pitcher_data.filter((m) => m[0] === playerSelectedName2);
        console.log(fantasyPitcherData2)
      // pull out the data from the dropdown item for the demographic information
      var wData = fantasyPitcherData2.map((m) => m[7]);
    var lData = fantasyPitcherData2.map((m) => m[8]);
    var soData = fantasyPitcherData2.map((m) => m[9]);
    var eraData = fantasyPitcherData2.map((m) => m[10]);
    var whipData = fantasyPitcherData2.map((m) => m[11]);
    var saveData = fantasyPitcherData2.map((m) => m[12]);
    var holdData = fantasyPitcherData2.map((m) => m[13]);
    d3.select("#wTable2").text(`Wins: ${wData}`);
    d3.select("#lTable2").text(`Losses: ${lData}`);
    d3.select("#soTable2").text(`K's: ${soData}`);
    d3.select("#eraTable2").text(`ERA: ${eraData}`);
    d3.select("#whipTable2").text(`WHIP: ${whipData}`);
    d3.select("#saveTable2").text(`Saves: ${saveData}`);
    d3.select("#holdTable2").text(`Holds: ${holdData}`);
  
      fbGraph2(playerSelectedName2);
      brGraph2(playerSelectedName2);
      chGraph2(playerSelectedName2);

      // gaugeChart(testSubject)
    };


// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function fbGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let FFValues = pitcher_data.filter((m) => m[0] === playerSelected);
    let FFValue = FFValues.map((m) => m[1]);
    FFGraphValues = [FFValue[0], 93.6]

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
    var layout = {title: "FB Velo", yaxis: {range: [85, 100]}}
    Plotly.newPlot("ffBar", trace1, layout);

    let SiValues = pitcher_data.filter((m) => m[0] === playerSelected);
    console.log(SiValues)
    let SiValue = SiValues.map((m) => m[3]);
    Sinkers = [SiValue[0], 92.6]
    console.log(Sinkers)

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: Sinkers,
        hoverinfo: 'none',
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: Sinkers.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Sinker Velo", yaxis: {range: [85, 100]}}
    Plotly.newPlot("siBar", trace2, layout2);
  
};

// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function brGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let cbValues = pitcher_data.filter((m) => m[0] === playerSelected);
    let cbValue = cbValues.map((m) => m[6]);
    curveBalls = [cbValue[0], 79.2]

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
    var layout = {title: "Curveball Velo", yaxis: {range: [70, 90]}}
    Plotly.newPlot("cbBar", trace1, layout);

    let slValues = pitcher_data.filter((m) => m[0] === playerSelected);
    let slValue = slValues.map((m) => m[6]);
    sliders = [slValue[0], 84.8]

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
    var layout2 = {title: "Slider Velo", yaxis: {range: [70, 95]}}
    Plotly.newPlot("slBar", trace2, layout2);
  
};

function chGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let chValues = pitcher_data.filter((m) => m[0] === playerSelected);
    let chValue = chValues.map((m) => m[4]);
    let changeups = [chValue[0], 84.8]

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
    var layout = {title: "Changeup Velo", yaxis: {range: [65, 95]}}
    Plotly.newPlot("chBar", trace1, layout);

  };

// Second player graphs, fastballs
function fbGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let FFValues2 = pitcher_data.filter((m) => m[0] === playerSelected);
    let FFValue2 = FFValues2.map((m) => m[1]);
    FFGraphValues2 = [FFValue2[0], 93.6]

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
    var layout = {title: "FB Velo", yaxis: {range: [85, 100]}}
    Plotly.newPlot("ffBar2", trace1, layout);

    let SiValues2 = pitcher_data.filter((m) => m[0] === playerSelected);
    console.log(SiValues2)
    let SiValue2 = SiValues2.map((m) => m[3]);
    Sinkers2 = [SiValue2[0], 92.6]
    console.log(Sinkers2)

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: Sinkers2,
        hoverinfo: 'none',
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: Sinkers2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Sinker Velo", yaxis: {range: [85, 100]}}
    Plotly.newPlot("siBar2", trace2, layout2);
  
};

function brGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let cbValues2 = pitcher_data.filter((m) => m[0] === playerSelected);
    let cbValue2 = cbValues2.map((m) => m[6]);
    curveBalls2 = [cbValue2[0], 79.2]

    // bar graph the results
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
    var layout = {title: "Curveball Velo", yaxis: {range: [70, 90]}}
    Plotly.newPlot("cbBar2", trace1, layout);

    let slValues2 = pitcher_data.filter((m) => m[0] === playerSelected);
    let slValue2 = slValues2.map((m) => m[6]);
    sliders2 = [slValue2[0], 84.8]

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
    var layout2 = {title: "Slider Velo", yaxis: {range: [70, 95]}}
    Plotly.newPlot("slBar2", trace2, layout2);
  
};

function chGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let chValues2 = pitcher_data.filter((m) => m[0] === playerSelected);
    let cbValue2 = chValues2.map((m) => m[4]);
    let changeups2 = [cbValue2[0], 84.8]

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
    var layout = {title: "Changeup Velo", yaxis: {range: [65, 95]}}
    Plotly.newPlot("chBar2", trace1, layout);

  };