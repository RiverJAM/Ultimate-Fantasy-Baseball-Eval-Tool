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

fetch("/pitchersdropdown").then(function (response) {
  console.log("Test");
  if (response.status !== 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }
  response.json().then(function (pitchers_list) {
      // console.log(pitchers_list)
      var IDs = Object.values(pitchers_list);
      for (i = 0; i < IDs.length; i++) {
        d3.select("#selDataset").append("option").text(IDs[i]["name"]);
        d3.select("#selDataset2").append("option").text(IDs[i]["name"]);
      }
      
    fetch("/pitchersData").then(function (res) {
      res.json().then(function (data) {
        pitcher_data = data;
        // console.log(pitcher_data)
      })
    })
        
    getSelectionPitchers();
      
      // getSelectionPitchers2();
  });
  }).catch(function (error) {
	console.log(error);
});
 

//call getSelection at the beginning on an initial value

d3.selectAll("#selDataset").on("change", getSelectionPitchers);
d3.selectAll("#selDataset2").on("change", getSelectionPitchers);
// fetch("/pitchersdata").then(function (res) {
//   res.json().then(function (data) {
//     pitcher_data = data;
//   })
// });
// var testSubject = d3.select("#selDataset").property("value");

// function which will take the value of the drop down, then create the
// metadata table.  It also calls the functions to create the bar graph, bubble and gauge charts.

function getSelectionPitchers() {
  // need to fetch our csv data using flask here
  
    var playerSelectedName = (
      d3.select("#selDataset").property("value") 
    );
    
    //filter the dataset by the dropdown item
    var fantasyPitcherData_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelectedName);

    // pull out the data from the dropdown item for the demographic information
    var wData_2018 = fantasyPitcherData_2018.map((m) => m.win_2018);
    console.log(wData_2018)
    var lData_2018 = fantasyPitcherData_2018.map((m) => m.loss_2018);
    var soData_2018 = fantasyPitcherData_2018.map((m) => m.k_2018);
    var eraData_2018 = fantasyPitcherData_2018.map((m) => m.era_2018);
    var whipData_2018 = fantasyPitcherData_2018.map((m) => m.whip_2018);
    var saveData_2018 = fantasyPitcherData_2018.map((m) => m.save_2018);
    var holdData_2018 = fantasyPitcherData_2018.map((m) => m.hold_2018);
    var kpercentData_2018 = fantasyPitcherData_2018.map((m) => m.kper_2018);
    var bbpercentData_2018 = fantasyPitcherData_2018.map((m) => m.bbper_2018);
    var xFIPData_2018 = fantasyPitcherData_2018.map((m) => m.xFIP_2018);
    var sieraData_2018 = fantasyPitcherData_2018.map((m) => m.siera_2018);
    var babip_2018 = fantasyPitcherData_2018.map((m) => m.babip_2018);

    d3.select("#wTable_2018").text(`${wData_2018}`);
    d3.select("#lTable_2018").text(`${lData_2018}`);
    d3.select("#soTable_2018").text(`${soData_2018}`);
    d3.select("#eraTable_2018").text(`${eraData_2018}`);
    d3.select("#whipTable_2018").text(`${whipData_2018}`);
    d3.select("#saveTable_2018").text(`${saveData_2018}`);
    d3.select("#holdTable_2018").text(`${holdData_2018}`);
    d3.select("#kperTable_2018").text(`${kpercentData_2018}`);
    d3.select("#bbperTable_2018").text(`${bbpercentData_2018}`);
    d3.select("#xFIPTable_2018").text(`${xFIPData_2018}`);
    d3.select("#sieraTable_2018").text(`${sieraData_2018}`);
    d3.select("#babipTable_2018").text(`${babip_2018}`);

    var fantasyPitcherData_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelectedName);
    // console.log(fantasyPitcherData_2019)
    // console.log("Test2")
    // pull out the data from the dropdown item for the demographic information
    var wData_2019 = fantasyPitcherData_2019.map((m) => m.win_2019);
    var lData_2019 = fantasyPitcherData_2019.map((m) => m.loss_2019);
    var soData_2019 = fantasyPitcherData_2019.map((m) => m.k_2019);
    var eraData_2019 = fantasyPitcherData_2019.map((m) => m.era_2019);
    var whipData_2019 = fantasyPitcherData_2019.map((m) => m.whip_2019);
    var saveData_2019 = fantasyPitcherData_2019.map((m) => m.save_2019);
    var holdData_2019 = fantasyPitcherData_2019.map((m) => m.hold_2019);
    var kpercentData_2019 = fantasyPitcherData_2019.map((m) => m.kper_2019);
    var bbpercentData_2019 = fantasyPitcherData_2019.map((m) => m.bbper_2019);
    var xFIPData_2019 = fantasyPitcherData_2019.map((m) => m.xFIP_2019);
    var sieraData_2019 = fantasyPitcherData_2019.map((m) => m.siera_2019);
    var babip_2019 = fantasyPitcherData_2019.map((m) => m.babip_2019);

    d3.select("#wTable_2019").text(`${wData_2019}`);
    d3.select("#lTable_2019").text(`${lData_2019}`);
    d3.select("#soTable_2019").text(`${soData_2019}`);
    d3.select("#eraTable_2019").text(`${eraData_2019}`);
    d3.select("#whipTable_2019").text(`${whipData_2019}`);
    d3.select("#saveTable_2019").text(`${saveData_2019}`);
    d3.select("#holdTable_2019").text(`${holdData_2019}`);
    d3.select("#kperTable_2019").text(`${kpercentData_2019}`);
    d3.select("#bbperTable_2019").text(`${bbpercentData_2019}`);
    d3.select("#xFIPTable_2019").text(`${xFIPData_2019}`);
    d3.select("#sieraTable_2019").text(`${sieraData_2019}`);
    d3.select("#babipTable_2019").text(`${babip_2019}`);

    var fantasyPitcherData_2020 = pitcher_data.filter((m) => m.name_2020 === playerSelectedName);
    // console.log(fantasyPitcherData_2020)
    // console.log("Test2")
    // pull out the data from the dropdown item for the demographic information
    var wData_2020 = fantasyPitcherData_2020.map((m) => m.win_2020);
    var lData_2020 = fantasyPitcherData_2020.map((m) => m.loss_2020);
    var soData_2020 = fantasyPitcherData_2020.map((m) => m.k_2020);
    var eraData_2020 = fantasyPitcherData_2020.map((m) => m.era_2020);
    var whipData_2020 = fantasyPitcherData_2020.map((m) => m.whip_2020);
    var saveData_2020 = fantasyPitcherData_2020.map((m) => m.save_2020);
    var holdData_2020 = fantasyPitcherData_2020.map((m) => m.hold_2020);
    var kpercentData_2020 = fantasyPitcherData_2020.map((m) => m.kper_2020);
    var bbpercentData_2020 = fantasyPitcherData_2020.map((m) => m.bbper_2020);
    var xFIPData_2020 = fantasyPitcherData_2020.map((m) => m.xFIP_2020);
    var sieraData_2020 = fantasyPitcherData_2020.map((m) => m.siera_2020);
    var babip_2020 = fantasyPitcherData_2020.map((m) => m.babip_2020);

    d3.select("#wTable_2020").text(`${wData_2020}`);
    d3.select("#lTable_2020").text(`${lData_2020}`);
    d3.select("#soTable_2020").text(`${soData_2020}`);
    d3.select("#eraTable_2020").text(`${eraData_2020}`);
    d3.select("#whipTable_2020").text(`${whipData_2020}`);
    d3.select("#saveTable_2020").text(`${saveData_2020}`);
    d3.select("#holdTable_2020").text(`${holdData_2020}`);
    d3.select("#kperTable_2020").text(`${kpercentData_2020}`);
    d3.select("#bbperTable_2020").text(`${bbpercentData_2020}`);
    d3.select("#xFIPTable_2020").text(`${xFIPData_2020}`);
    d3.select("#sieraTable_2020").text(`${sieraData_2020}`);
    d3.select("#babipTable_2020").text(`${babip_2020}`);


    fbVelo(playerSelectedName);
    brVelo(playerSelectedName);
    chVelo(playerSelectedName);

    fbGraph(playerSelectedName);
    brGraph(playerSelectedName);
    chGraph(playerSelectedName);
    // gaugeChart(testSubject)
  
    // need to fetch our csv data using flask here
    
    var playerSelectedName2 = (
      d3.select("#selDataset2").property("value") 
    );

    //filter the dataset by the dropdown item for the second player
    var fantasyPitcherData_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelectedName2);
    console.log(fantasyPitcherData_2018_2)
    console.log("Test2")
    // pull out the data from the dropdown item for the demographic information
    var wData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.win_2018);
    console.log(wData_2018_2)
    var lData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.loss_2018);
    var soData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.k_2018);
    var eraData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.era_2018);
    var whipData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.whip_2018);
    var saveData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.save_2018);
    var holdData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.hold_2018);
    var kpercentData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.kper_2018);
    var bbpercentData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.bbper_2018);
    var xFIPData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.xFIP_2018);
    var sieraData_2018_2 = fantasyPitcherData_2018_2.map((m) => m.siera_2018);
    var babip_2018_2 = fantasyPitcherData_2018_2.map((m) => m.babip_2018);

    d3.select("#wTable_2018_2").text(`${wData_2018_2}`);
    d3.select("#lTable_2018_2").text(`${lData_2018_2}`);
    d3.select("#soTable_2018_2").text(`${soData_2018_2}`);
    d3.select("#eraTable_2018_2").text(`${eraData_2018_2}`);
    d3.select("#whipTable_2018_2").text(`${whipData_2018_2}`);
    d3.select("#saveTable_2018_2").text(`${saveData_2018_2}`);
    d3.select("#holdTable_2018_2").text(`${holdData_2018_2}`);
    d3.select("#kperTable_2018_2").text(`${kpercentData_2018_2}`);
    d3.select("#bbperTable_2018_2").text(`${bbpercentData_2018_2}`);
    d3.select("#xFIPTable_2018_2").text(`${xFIPData_2018_2}`);
    d3.select("#sieraTable_2018_2").text(`${sieraData_2018_2}`);
    d3.select("#babipTable_2018_2").text(`${babip_2018_2}`);

    var fantasyPitcherData_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelectedName2);
    console.log(fantasyPitcherData_2019_2)
    console.log("Test2")
    // pull out the data from the dropdown item for the demographic information
    var wData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.win_2019);
    console.log(wData_2019_2)
    var lData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.loss_2019);
    var soData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.k_2019);
    var eraData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.era_2019);
    var whipData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.whip_2019);
    var saveData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.save_2019);
    var holdData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.hold_2019);
    var kpercentData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.kper_2019);
    var bbpercentData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.bbper_2019);
    var xFIPData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.xFIP_2019);
    var sieraData_2019_2 = fantasyPitcherData_2019_2.map((m) => m.siera_2019);
    var babip_2019_2 = fantasyPitcherData_2019_2.map((m) => m.babip_2019);

    d3.select("#wTable_2019_2").text(`${wData_2019_2}`);
    d3.select("#lTable_2019_2").text(`${lData_2019_2}`);
    d3.select("#soTable_2019_2").text(`${soData_2019_2}`);
    d3.select("#eraTable_2019_2").text(`${eraData_2019_2}`);
    d3.select("#whipTable_2019_2").text(`${whipData_2019_2}`);
    d3.select("#saveTable_2019_2").text(`${saveData_2019_2}`);
    d3.select("#holdTable_2019_2").text(`${holdData_2019_2}`);
    d3.select("#kperTable_2019_2").text(`${kpercentData_2019_2}`);
    d3.select("#bbperTable_2019_2").text(`${bbpercentData_2019_2}`);
    d3.select("#xFIPTable_2019_2").text(`${xFIPData_2019_2}`);
    d3.select("#sieraTable_2019_2").text(`${sieraData_2019_2}`);
    d3.select("#babipTable_2019_2").text(`${babip_2019_2}`);

    var fantasyPitcherData_2020_2 = pitcher_data.filter((m) => m.name_2020 === playerSelectedName2);
    console.log(fantasyPitcherData_2020_2)
    console.log("Test2")
    // pull out the data from the dropdown item for the demographic information
    var wData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.win_2020);
    console.log(wData_2020_2)
    var lData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.loss_2020);
    var soData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.k_2020);
    var eraData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.era_2020);
    var whipData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.whip_2020);
    var saveData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.save_2020);
    var holdData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.hold_2020);
    var kpercentData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.kper_2020);
    var bbpercentData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.bbper_2020);
    var xFIPData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.xFIP_2020);
    var sieraData_2020_2 = fantasyPitcherData_2020_2.map((m) => m.siera_2020);
    var babip_2020_2 = fantasyPitcherData_2020_2.map((m) => m.babip_2020);

    d3.select("#wTable_2020_2").text(`${wData_2020_2}`);
    d3.select("#lTable_2020_2").text(`${lData_2020_2}`);
    d3.select("#soTable_2020_2").text(`${soData_2020_2}`);
    d3.select("#eraTable_2020_2").text(`${eraData_2020_2}`);
    d3.select("#whipTable_2020_2").text(`${whipData_2020_2}`);
    d3.select("#saveTable_2020_2").text(`${saveData_2020_2}`);
    d3.select("#holdTable_2020_2").text(`${holdData_2020_2}`);
    d3.select("#kperTable_2020_2").text(`${kpercentData_2020_2}`);
    d3.select("#bbperTable_2020_2").text(`${bbpercentData_2020_2}`);
    d3.select("#xFIPTable_2020_2").text(`${xFIPData_2020_2}`);
    d3.select("#sieraTable_2020_2").text(`${sieraData_2020_2}`);
    d3.select("#babipTable_2020_2").text(`${babip_2020_2}`);

    fbVelo2(playerSelectedName2);
  
    fbGraph2(playerSelectedName2);
    brGraph2(playerSelectedName2);
    chGraph2(playerSelectedName2);

      // gaugeChart(testSubject)
};
  
function fbVelo(playerSelected) {
  
  // pitch velocity graphs
    let FFVelos_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let FFVelo_2018 = FFVelos_2018.map((m) => m.fb_velo_2018);
    let FFVelos_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let FFVelo_2019 = FFVelos_2019.map((m) => m.fb_velo_2019);
    let FFVelos_2020= pitcher_data.filter((m) => m.name_2020=== playerSelected);
    let FFVelo_2020= FFVelos_2020.map((m) => m.fb_velo_2020);
    FFVelos = [FFVelo_2018[0], FFVelo_2019[0], FFVelo_2020[0], 93.7]
    console.log(FFVelos)

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: FFVelos,
      type: "bar",
      hoverinfo: 'none',
      marker:{
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
      },
      text: FFVelos.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {title: "FB velo", yaxis: {range: [85, 100]}}
  Plotly.newPlot("ffVeloBar", trace1, layout);


  let CtVelos_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
  let CtVelo_2018 = CtVelos_2018.map((m) => m.ct_velo_2018);
  let CtVelos_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
  let CtVelo_2019 = CtVelos_2019.map((m) => m.ct_velo_2019);
  let CtVelos_2020= pitcher_data.filter((m) => m.name_2020=== playerSelected);
  let CtVelo_2020= CtVelos_2020.map((m) => m.ct_velo_2020);
  CtVelos = [CtVelo_2018[0], CtVelo_2019[0], CtVelo_2020[0], 88.4]
  console.log(CtVelos)

// bar graph the results
var trace1 = [
  {
    x: ["2018", "2019", "2020", "League Average"],
    y: CtVelos,
    type: "bar",
    hoverinfo: 'none',
    marker:{
      color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
    },
    text: CtVelos.map(String),
    textposition: 'auto',
  },
];
var layout = {title: "CT velo", yaxis: {range: [80, 100]}}
Plotly.newPlot("ctVeloBar", trace1, layout);
  
  console.log(playerSelected);
};



function brVelo(playerSelected) {
  
  // pitch velocity graphs
    let cbVelos_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let cbVelo_2018 = cbVelos_2018.map((m) => m.cb_velo_2018);
    let cbVelos_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let cbVelo_2019 = cbVelos_2019.map((m) => m.cb_velo_2019);
    let cbVelos_2020= pitcher_data.filter((m) => m.name_2020=== playerSelected);
    let cbVelo_2020= cbVelos_2020.map((m) => m.cb_velo_2020);
    cbVelos = [cbVelo_2018[0], cbVelo_2019[0], cbVelo_2020[0], 79.5]
    console.log(cbVelos)

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: cbVelos,
      type: "bar",
      hoverinfo: 'none',
      marker:{
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
      },
      text: cbVelos.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {title: "CB velo", yaxis: {range: [70, 95]}}
  Plotly.newPlot("cbVeloBar", trace1, layout);


  let slVelos_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
  let slVelo_2018 = slVelos_2018.map((m) => m.sl_velo_2018);
  let slVelos_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
  let slVelo_2019 = slVelos_2019.map((m) => m.sl_velo_2019);
  let slVelos_2020= pitcher_data.filter((m) => m.name_2020=== playerSelected);
  let slVelo_2020= slVelos_2020.map((m) => m.sl_velo_2020);
  slVelos = [slVelo_2018[0], slVelo_2019[0], slVelo_2020[0], 84.5]
  console.log(slVelos)

// bar graph the results
var trace1 = [
  {
    x: ["2018", "2019", "2020", "League Average"],
    y: slVelos,
    type: "bar",
    hoverinfo: 'none',
    marker:{
      color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
    },
    text: slVelos.map(String),
    textposition: 'auto',
  },
];
var layout = {title: "SL velo", yaxis: {range: [70, 95]}}
Plotly.newPlot("slVeloBar", trace1, layout);
  
  console.log(playerSelected);
};


function chVelo(playerSelected) {
  
  // pitch velocity graphs
    let chVelos_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let chVelo_2018 = chVelos_2018.map((m) => m.ch_velo_2018);
    let chVelos_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let chVelo_2019 = chVelos_2019.map((m) => m.ch_velo_2019);
    let chVelos_2020= pitcher_data.filter((m) => m.name_2020=== playerSelected);
    let chVelo_2020= chVelos_2020.map((m) => m.ch_velo_2020);
    chVelos = [chVelo_2018[0], chVelo_2019[0], chVelo_2020[0], 93.7]
    console.log(chVelos)

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: chVelos,
      type: "bar",
      hoverinfo: 'none',
      marker:{
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
      },
      text: chVelos.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {title: "CH velo", yaxis: {range: [85, 100]}}
  Plotly.newPlot("chVeloBar", trace1, layout);



};

function fbVelo2(playerSelected2) {
  
  // pitch velocity graphs
    let FFVelos_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelected2);
    let FFVelo_2018_2 = FFVelos_2018_2.map((m) => m.fb_velo_2018);
    let FFVelos_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelected2);
    let FFVelo_2019_2 = FFVelos_2019_2.map((m) => m.fb_velo_2019);
    let FFVelos_2020_2= pitcher_data.filter((m) => m.name_2020=== playerSelected2);
    let FFVelo_2020_2= FFVelos_2020_2.map((m) => m.fb_velo_2020);
    FFVelos = [FFVelo_2018_2[0], FFVelo_2019_2[0], FFVelo_2020_2[0], 93.7]
    console.log(FFVelos)

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: FFVelos,
      type: "bar",
      hoverinfo: 'none',
      marker:{
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
      },
      text: FFVelos.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {title: "FB velo", yaxis: {range: [85, 100]}}
  Plotly.newPlot("ffVeloBar", trace1, layout);


  let CtVelos_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelected2);
  let CtVelo_2018_2 = CtVelos_2018_2.map((m) => m.ct_velo_2018);
  let CtVelos_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelected2);
  let CtVelo_2019_2 = CtVelos_2019_2.map((m) => m.ct_velo_2019);
  let CtVelos_2020_2= pitcher_data.filter((m) => m.name_2020=== playerSelected2);
  let CtVelo_2020_2= CtVelos_2020_2.map((m) => m.ct_velo_2020);
  CtVelos = [CtVelo_2018_2[0], CtVelo_2019_2[0], CtVelo_2020_2[0], 88.4]
  console.log(CtVelos)

// bar graph the results
var trace1 = [
  {
    x: ["2018", "2019", "2020", "League Average"],
    y: CtVelos,
    type: "bar",
    hoverinfo: 'none',
    marker:{
      color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
    },
    text: CtVelos.map(String),
    textposition: 'auto',
  },
];
var layout = {title: "CT velo", yaxis: {range: [80, 100]}}
Plotly.newPlot("ctVeloBar", trace1, layout);
  
  console.log(playerSelected);
};


// functions which creates the bar graphs.  
function fbGraph(playerSelected) {
  
  // pitch value graphs
  // create an array of the values filtered by the drop-down selection

    let FFValues_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let FFValue_2018 = FFValues_2018.map((m) => m.wfb_c_2018);
    let FFValues_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let FFValue_2019 = FFValues_2019.map((m) => m.wfb_c_2019);
    let FFValues_2020= pitcher_data.filter((m) => m.name_2020=== playerSelected);
    let FFValue_2020= FFValues_2020.map((m) => m.wfb_c_2020);
    FFGraphValues = [FFValue_2018[0], FFValue_2019[0], FFValue_2020[0], -.2]

    // bar graph the results
    var trace1 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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

    let CtValues_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let CtValue_2018 = CtValues_2018.map((m) => m.wct_c_2018);
    let CtValues_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let CtValue_2019 = CtValues_2019.map((m) => m.wct_c_2019);
    let CtValues_2020 = pitcher_data.filter((m) => m.name_2020 === playerSelected);
    let CtValue_2020 = CtValues_2020.map((m) => m.wct_c_2020);
    Cutters = [CtValue_2018[0], CtValue_2019[0], CtValue_2020[0], .16]
    console.log(Cutters)

    // bar graph the results
    var trace2 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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

    let cbValues_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let cbValue_2018 = cbValues_2018.map((m) => m.wcb_c_2018);
    let cbValues_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let cbValue_2019 = cbValues_2019.map((m) => m.wcb_c_2019);
    let cbValues_2020 = pitcher_data.filter((m) => m.name_2020 === playerSelected);
    let cbValue_2020 = cbValues_2020.map((m) => m.wcb_c_2020);
    curveBalls = [cbValue_2018[0], cbValue_2019[0], cbValue_2020[0], -.02]

    // bar graph the results
    var trace1 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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


    let slValues_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let slValue_2018 = slValues_2018.map((m) => m.wsl_c_2018);
    let slValues_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let slValue_2019 = slValues_2019.map((m) => m.wsl_c_2019);
    let slValues_2020 = pitcher_data.filter((m) => m.name_2020 === playerSelected);
    let slValue_2020 = slValues_2020.map((m) => m.wsl_c_2020);
    sliders = [slValue_2018[0],slValue_2019[0], slValue_2020[0], 0.4]

    // bar graph the results
    var trace2 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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

    let chValues_2018 = pitcher_data.filter((m) => m.name_2018 === playerSelected);
    let chValue_2018 = chValues_2018.map((m) => m.wch_c_2018);
    let chValues_2019 = pitcher_data.filter((m) => m.name_2019 === playerSelected);
    let chValue_2019 = chValues_2019.map((m) => m.wch_c_2019);
    let chValues_2020 = pitcher_data.filter((m) => m.name_2020 === playerSelected);
    let chValue_2020 = chValues_2020.map((m) => m.wch_c_2020);
    let changeups = [chValue_2018[0], chValue_2019[0], chValue_2020[0], 0.2]

    // bar graph the results
    var trace1 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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
function fbGraph2(playerSelected2) {
  // console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let FFValues_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelected2);
    let FFValue_2018_2 = FFValues_2018_2.map((m) => m.wfb_c_2018);
    let FFValues_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelected2);
    let FFValue_2019_2 = FFValues_2019_2.map((m) => m.wfb_c_2019);
    let FFValues_2020_2 = pitcher_data.filter((m) => m.name_2020 === playerSelected2);
    let FFValue_2020_2 = FFValues_2020_2.map((m) => m.wfb_c_2020);
    FFGraphValues2 = [FFValue_2018_2[0], FFValue_2019_2[0], FFValue_2020_2[0], -.2]

    // bar graph the results
    var trace1 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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
    let CtValues_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelected2);
    let CtValue_2018_2 = CtValues_2018_2.map((m) => m.wct_c_2018);
    let CtValues_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelected2);
    let CtValue_2019_2 = CtValues_2019_2.map((m) => m.wct_c_2019);
    let CtValues_2020_2 = pitcher_data.filter((m) => m.name_2020 === playerSelected2);
    let CtValue_2020_2 = CtValues_2020_2.map((m) => m.wct_c_2020);
    Cutters2 = [CtValue_2018_2[0], CtValue_2019_2[0], CtValue_2020_2[0], .16]


    var trace2 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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
function brGraph2(playerSelected2) {
  console.log(playerSelected2);
    
    //Curveball2 graph
    let cbValues_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelected2);
    let cbValue_2018_2 = cbValues_2018_2.map((m) => m.wcb_c_2018);
    let cbValues_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelected2);
    let cbValue_2019_2 = cbValues_2019_2.map((m) => m.wcb_c_2019);
    let cbValues_2020_2 = pitcher_data.filter((m) => m.name_2020 === playerSelected2);
    let cbValue_2020_2 = cbValues_2020_2.map((m) => m.wcb_c_2020);
    curveBalls2 = [cbValue_2018_2[0], cbValue_2019_2[0], cbValue_2020_2[0], -.02]

    var trace1 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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
    let slValues_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelected2);
    let slValue_2018_2 = slValues_2018_2.map((m) => m.wsl_c_2018);
    let slValues_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelected2);
    let slValue_2019_2 = slValues_2019_2.map((m) => m.wsl_c_2019);
    let slValues_2020_2 = pitcher_data.filter((m) => m.name_2020 === playerSelected2);
    let slValue_2020_2 = slValues_2020_2.map((m) => m.wsl_c_2020);
    sliders2 = [slValue_2018_2[0], slValue_2019_2[0], slValue_2020_2[0], 0.4]

    // bar graph the results
    var trace2 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
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

function chGraph2(playerSelected2) {
    console.log(playerSelected2);

  // create an array of the values filtered by the drop-down selection

    let chValues_2018_2 = pitcher_data.filter((m) => m.name_2018 === playerSelected2);
    let cbValue_2018_2 = chValues_2018_2.map((m) => m.wch_c_2018);
    let chValues_2019_2 = pitcher_data.filter((m) => m.name_2019 === playerSelected2);
    let cbValue_2019_2 = chValues_2019_2.map((m) => m.wch_c_2019);
    let chValues_2020_2 = pitcher_data.filter((m) => m.name_2020 === playerSelected2);
    let cbValue_2020_2 = chValues_2020_2.map((m) => m.wch_c_2020);
    let changeups2 = [cbValue_2018_2[0], cbValue_2019_2[0], cbValue_2020_2[0], 0.2];

    // bar graph the results
    var trace1 = [
      {
        x: ["2018", "2019", "2020", "League Average"],
        y: changeups2,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: changeups2.map(String),
        textposition: 'auto'
      }
    ];
    var layout = {title: "Changeup Value", yaxis: {range: [-3, 4]}};
    Plotly.newPlot("chBar2", trace1, layout);
};