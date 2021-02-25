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

    // getSelectionHitters()
  });
}).catch(function (error) {
  console.log(error);
});

fetch("/hittersdata").then(function (res) {
  console.log(res)
  res.json().then(function (data) {
    hitter_data = data;
    // hitter_data.push(data)
    // console.log(hitter_data)
  })
}).catch(function (error) {
  console.log(error);
});

getSelectionHitters()

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
  var playerSelectedName2 = (
    d3.select("#selDataset2").property("value")
  );


  //filter the dataset by the dropdown item
  var fantasyData_2018 = hitter_data.filter((m) => m.name_2018 === playerSelectedName);
  // pull out the data from the dropdown item for the basic hitting information

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

  var fantasyData_2019 = hitter_data.filter((m) => m.name_2019 === playerSelectedName);
  // pull out the data from the dropdown item for the basic hitting information

  var avgData_2019 = fantasyData_2019.map((m) => m.avg_2019);
  var opsData_2019 = fantasyData_2019.map((m) => m.ops_2019);
  var rData_2019 = fantasyData_2019.map((m) => m.r_2019);
  var rbiData_2019 = fantasyData_2019.map((m) => m.rbi_2019);
  var hrData_2019 = fantasyData_2019.map((m) => m.hr_2019);
  var sbData_2019 = fantasyData_2019.map((m) => m.sb_2019);
  d3.select("#avgTable_2019").text(`${avgData_2019}`);
  d3.select("#opsTable_2019").text(`${opsData_2019}`);
  d3.select("#rTable_2019").text(`${rData_2019}`);
  d3.select("#rbiTable_2019").text(`${rbiData_2019}`);
  d3.select("#hrTable_2019").text(`${hrData_2019}`);
  d3.select("#sbTable_2019").text(`${sbData_2019}`);

  var fantasyData_2020 = hitter_data.filter((m) => m.name_2020 === playerSelectedName);
  // pull out the data from the dropdown item for the basic hitting information

  var avgData_2020 = fantasyData_2020.map((m) => m.avg_2020);
  var opsData_2020 = fantasyData_2020.map((m) => m.ops_2020);
  var rData_2020 = fantasyData_2020.map((m) => m.r_2020);
  var rbiData_2020 = fantasyData_2020.map((m) => m.rbi_2020);
  var hrData_2020 = fantasyData_2020.map((m) => m.hr_2020);
  var sbData_2020 = fantasyData_2020.map((m) => m.sb_2020);
  d3.select("#avgTable_2020").text(`${avgData_2020}`);
  d3.select("#opsTable_2020").text(`${opsData_2020}`);
  d3.select("#rTable_2020").text(`${rData_2020}`);
  d3.select("#rbiTable_2020").text(`${rbiData_2020}`);
  d3.select("#hrTable_2020").text(`${hrData_2020}`);
  d3.select("#sbTable_2020").text(`${sbData_2020}`);



  // tables for the extended data, 
  //filter the dataset by the dropdown item
  var fantasyData_2018 = hitter_data.filter((m) => m.name_2018 === playerSelectedName);
  // pull out the data from the dropdown item for the basic hitting information

  var paData_2018 = fantasyData_2018.map((m) => m.pa_2018);
  var kData_2018 = ((fantasyData_2018.map((m) => m.kpercen_2018)) * 100).toFixed(2);
  var bbData_2018 = ((fantasyData_2018.map((m) => m.bbpercen_2018)) * 100).toFixed(2);
  var iffbData_2018 = ((fantasyData_2018.map((m) => m.iffbpercen_2018)) * 100).toFixed(2);
  d3.select("#paTable_2018").text(`${paData_2018}`);
  d3.select("#kTable_2018").text(`${kData_2018}`);
  d3.select("#bbTable_2018").text(`${bbData_2018}`);
  d3.select("#iffbTable_2018").text(`${iffbData_2018}`);


  var fantasyData_2019 = hitter_data.filter((m) => m.name_2019 === playerSelectedName);
  // pull out the data from the dropdown item for the basic hitting information

  var paData_2019 = fantasyData_2019.map((m) => m.pa_2019);
  var kData_2019 = ((fantasyData_2019.map((m) => m.kpercen_2019)) * 100).toFixed(2);
  var bbData_2019 = ((fantasyData_2019.map((m) => m.bbpercen_2019)) * 100).toFixed(2);
  var iffbData_2019 = (parseFloat(fantasyData_2019.map((m) => m.iffbpercen_2019) * 100)).toFixed(2);
  d3.select("#paTable_2019").text(`${paData_2019}`);
  d3.select("#kTable_2019").text(`${kData_2019}`);
  d3.select("#bbTable_2019").text(`${bbData_2019}`);
  d3.select("#iffbTable_2019").text(`${iffbData_2019}`);

  var fantasyData_2020 = hitter_data.filter((m) => m.name_2020 === playerSelectedName);
  // pull out the data from the dropdown item for the basic hitting information

  var paData_2020 = fantasyData_2020.map((m) => m.pa_2020);
  var kData_2020 = ((fantasyData_2020.map((m) => m.kpercen_2020)) * 100).toFixed(2);
  var bbData_2020 = ((fantasyData_2020.map((m) => m.bbpercen_2020)) * 100).toFixed(2);
  var iffbData_2020 = ((fantasyData_2020.map((m) => m.iffbpercen_2020)) * 100).toFixed(2);
  d3.select("#paTable_2020").text(`${paData_2020}`);
  d3.select("#kTable_2020").text(`${kData_2020}`);
  d3.select("#bbTable_2020").text(`${bbData_2020}`);
  d3.select("#iffbTable_2020").text(`${iffbData_2020}`);

  

  // tables for the extended data, 
  //filter the dataset by the dropdown item
  var fantasyData_2018_2 = hitter_data.filter((m) => m.name_2018 === playerSelectedName2);
  // pull out the data from the dropdown item for the basic hitting information

  var paData_2018_2 = fantasyData_2018_2.map((m) => m.pa_2018);
  var kData_2018_2 = ((fantasyData_2018_2.map((m) => m.kpercen_2018)) * 100).toFixed(2);
  var bbData_2018_2 = ((fantasyData_2018_2.map((m) => m.bbpercen_2018)) * 100).toFixed(2);
  var iffbData_2018_2 = ((fantasyData_2018_2.map((m) => m.iffbpercen_2018)) * 100).toFixed(2);
  d3.select("#paTable_2018_2").text(`${paData_2018_2}`);
  d3.select("#kTable_2018_2").text(`${kData_2018_2}`);
  d3.select("#bbTable_2018_2").text(`${bbData_2018_2}`);
  d3.select("#iffbTable_2018_2").text(`${iffbData_2018_2}`);


  var fantasyData_2019_2 = hitter_data.filter((m) => m.name_2019 === playerSelectedName2);
  // pull out the data from the dropdown item for the basic hitting information

  var paData_2019_2 = fantasyData_2019_2.map((m) => m.pa_2019);
  var kData_2019_2 = ((fantasyData_2019_2.map((m) => m.kpercen_2019)) * 100).toFixed(2);
  var bbData_2019_2 = ((fantasyData_2019_2.map((m) => m.bbpercen_2019)) * 100).toFixed(2);
  var iffbData_2019_2 = ((fantasyData_2019_2.map((m) => m.iffbpercen_2019) * 100)).toFixed(2);
  d3.select("#paTable_2019_2").text(`${paData_2019_2}`);
  d3.select("#kTable_2019_2").text(`${kData_2019_2}`);
  d3.select("#bbTable_2019_2").text(`${bbData_2019_2}`);
  d3.select("#iffbTable_2019_2").text(`${iffbData_2019_2}`);

  var fantasyData_2020_2 = hitter_data.filter((m) => m.name_2020 === playerSelectedName2);
  // pull out the data from the dropdown item for the basic hitting information

  var paData_2020_2 = fantasyData_2020_2.map((m) => m.pa_2020);
  var kData_2020_2 = ((fantasyData_2020_2.map((m) => m.kpercen_2020)) * 100).toFixed(2);
  var bbData_2020_2 = ((fantasyData_2020_2.map((m) => m.bbpercen_2020)) * 100).toFixed(2);
  var iffbData_2020_2 = ((fantasyData_2020_2.map((m) => m.iffbpercen_2020)) * 100).toFixed(2);
  d3.select("#paTable_2020_2").text(`${paData_2020_2}`);
  d3.select("#kTable_2020_2").text(`${kData_2020_2}`);
  d3.select("#bbTable_2020_2").text(`${bbData_2020_2}`);
  d3.select("#iffbTable_2020_2").text(`${iffbData_2020_2}`);

  statcastGraph(playerSelectedName);
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

  var fantasyData_2019_2 = hitter_data.filter((m) => m.name_2019 === playerSelectedName2);
  // pull out the data from the dropdown item for the demographic information

  var avgData_2019_2 = fantasyData_2019_2.map((m) => m.avg_2019);
  var opsData_2019_2 = fantasyData_2019_2.map((m) => m.ops_2019);
  var rData_2019_2 = fantasyData_2019_2.map((m) => m.r_2019);
  var rbiData_2019_2 = fantasyData_2019_2.map((m) => m.rbi_2019);
  var hrData_2019_2 = fantasyData_2019_2.map((m) => m.hr_2019);
  var sbData_2019_2 = fantasyData_2019_2.map((m) => m.sb_2019);
  d3.select("#avgTable_2019_2").text(`${avgData_2019_2}`);
  d3.select("#opsTable_2019_2").text(`${opsData_2019_2}`);
  d3.select("#rTable_2019_2").text(`${rData_2019_2}`);
  d3.select("#rbiTable_2019_2").text(`${rbiData_2019_2}`);
  d3.select("#hrTable_2019_2").text(`${hrData_2019_2}`);
  d3.select("#sbTable_2019_2").text(`${sbData_2019_2}`);

  var fantasyData_2020_2 = hitter_data.filter((m) => m.name_2020 === playerSelectedName2);
  // pull out the data from the dropdown item for the demographic information

  var avgData_2020_2 = fantasyData_2020_2.map((m) => m.avg_2020);
  var opsData_2020_2 = fantasyData_2020_2.map((m) => m.ops_2020);
  var rData_2020_2 = fantasyData_2020_2.map((m) => m.r_2020);
  var rbiData_2020_2 = fantasyData_2020_2.map((m) => m.rbi_2020);
  var hrData_2020_2 = fantasyData_2020_2.map((m) => m.hr_2020);
  var sbData_2020_2 = fantasyData_2020_2.map((m) => m.sb_2020);
  d3.select("#avgTable_2020_2").text(`${avgData_2020_2}`);
  d3.select("#opsTable_2020_2").text(`${opsData_2020_2}`);
  d3.select("#rTable_2020_2").text(`${rData_2020_2}`);
  d3.select("#rbiTable_2020_2").text(`${rbiData_2020_2}`);
  d3.select("#hrTable_2020_2").text(`${hrData_2020_2}`);
  d3.select("#sbTable_2020_2").text(`${sbData_2020_2}`);

  statcastGraph2(playerSelectedName2)
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


function statcastGraph(playerSelected) {

  // create an array of the values filtered by the drop-down selection

  let barrelValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected);
  let barrel_2018 = barrelValue_2018.map((m) => m.barrel_percen_2018);
  let barrelValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected);
  let barrel_2019 = barrelValue_2019.map((m) => m.barrel_percen_2019);
  let barrelValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected);
  let barrel_2020 = barrelValue_2020.map((m) => m.barrel_percen_2020);
  barrelValues = [barrel_2018[0], barrel_2019[0], barrel_2020[0], .075];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: barrelValues,
      type: "bar",
      hoverinfo: 'none',
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)'],
      },
      text: barrelValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {
    title: "Barrel %", yaxis: {
      range: [0, .15]
    }
  }
  Plotly.newPlot("barrelsBar", trace1, layout);

  // Max EV data for the first hitter
  let evValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected);
  let EV_2018 = evValue_2018.map((m) => m.maxev_2018);
  let evValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected);
  let EV_2019 = evValue_2019.map((m) => m.maxev_2019);
  let evValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected);
  let EV_2020 = evValue_2020.map((m) => m.maxev_2020);
  evValues = [EV_2018[0], EV_2019[0], EV_2020[0], .075];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: evValues,
      type: "bar",
      hoverinfo: 'none',
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)'],
      },
      text: evValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {
    title: "Max. Exit Velocity", yaxis: {
      range: [95, 120]
    }
  }
  Plotly.newPlot("EVBar", trace1, layout);


  // Hard Hit percentage data for the first hitter
  let hhValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected);
  let hh_2018 = hhValue_2018.map((m) => m.hardhitpercen_2018);
  let hhValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected);
  let hh_2019 = hhValue_2019.map((m) => m.hardhitpercen_2019);
  let hhValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected);
  let hh_2020 = hhValue_2020.map((m) => m.hardhitpercen_2020);
  hhValues = [hh_2018[0], hh_2019[0], hh_2020[0], .075];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: hhValues,
      type: "bar",
      hoverinfo: 'none',
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)'],
      },
      text: hhValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {
    title: "Hard Hit %", yaxis: {
      range: [.25, .75]
    }
  }
  Plotly.newPlot("hardHitBar", trace1, layout);

};

// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function OGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

  let o_swingValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected);
  let OSwing_2018 = o_swingValue_2018.map((m) => m.o_swing_2018);
  let o_swingValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected);
  let OSwing_2019 = o_swingValue_2019.map((m) => m.o_swing_2019);
  let o_swingValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected);
  let OSwing_2020 = o_swingValue_2020.map((m) => m.o_swing_2020);
  OSwingValues = [OSwing_2018[0], OSwing_2019[0], OSwing_2020[0], .316];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
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
  let o_contactValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected);
  let OContact_2018 = o_contactValue_2018.map((m) => m.o_contact_2018);
  let o_contactValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected);
  let OContact_2019 = o_contactValue_2019.map((m) => m.o_contact_2019);
  let o_contactValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected);
  let OContact_2020 = o_contactValue_2020.map((m) => m.o_contact_2020);
  OContactValues = [OContact_2018[0], OContact_2019[0], OContact_2020[0], .627];

  // bar graph the results
  var trace2 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
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

  let z_swingValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected);
  let ZSwing_2018 = z_swingValue_2018.map((m) => m.z_swing_2018);
  let z_swingValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected);
  let ZSwing_2019 = z_swingValue_2019.map((m) => m.z_swing_2019);
  let z_swingValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected);
  let ZSwing_2020 = z_swingValue_2020.map((m) => m.z_swing_2020);
  ZSwingValues = [ZSwing_2018[0], ZSwing_2019[0], ZSwing_2020[0], .685];

  // bar graph Z-swing results first player
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
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
  let z_contactValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected);
  let Zcontact_2018 = z_contactValue_2018.map((m) => m.z_contact_2018);
  let z_contactValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected);
  let Zcontact_2019 = z_contactValue_2019.map((m) => m.z_contact_2019);
  let z_contactValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected);
  let Zcontact_2020 = z_contactValue_2020.map((m) => m.z_contact_2020);
  ZcontactValues = [Zcontact_2018[0], Zcontact_2019[0], Zcontact_2020[0], .849];

  // bar graph the z-contact results
  var trace2 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: ZcontactValues,
      type: "bar",
      marker: {
        color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
      },
      text: ZcontactValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout2 = { title: "Z-Contact %", yaxis: { range: [0, 1] } }
  Plotly.newPlot("Zbar2", trace2, layout2);

};


function statcastGraph2(playerSelected2) {

  // create an array of the values filtered by the drop-down selection

  let barrelValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected2);
  let barrel_2018 = barrelValue_2018.map((m) => m.barrel_percen_2018);
  let barrelValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected2);
  let barrel_2019 = barrelValue_2019.map((m) => m.barrel_percen_2019);
  let barrelValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected2);
  let barrel_2020 = barrelValue_2020.map((m) => m.barrel_percen_2020);
  barrelValues = [barrel_2018[0], barrel_2019[0], barrel_2020[0], .075];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: barrelValues,
      type: "bar",
      hoverinfo: 'none',
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)'],
      },
      text: barrelValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {
    title: "Barrel %", yaxis: {
      range: [0, .15]
    }
  }
  Plotly.newPlot("barrelsBar2", trace1, layout);

  // Max EV data for the first hitter
  let evValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected2);
  let EV_2018 = evValue_2018.map((m) => m.maxev_2018);
  let evValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected2);
  let EV_2019 = evValue_2019.map((m) => m.maxev_2019);
  let evValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected2);
  let EV_2020 = evValue_2020.map((m) => m.maxev_2020);
  evValues = [EV_2018[0], EV_2019[0], EV_2020[0], .075];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: evValues,
      type: "bar",
      hoverinfo: 'none',
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)'],
      },
      text: evValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {
    title: "Max. Exit Velocity", yaxis: {
      range: [95, 120]
    }
  }
  Plotly.newPlot("EVBar2", trace1, layout);


  // Hard Hit percentage data for the first hitter
  let hhValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected2);
  let hh_2018 = hhValue_2018.map((m) => m.hardhitpercen_2018);
  let hhValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected2);
  let hh_2019 = hhValue_2019.map((m) => m.hardhitpercen_2019);
  let hhValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected2);
  let hh_2020 = hhValue_2020.map((m) => m.hardhitpercen_2020);
  hhValues = [hh_2018[0], hh_2019[0], hh_2020[0], .075];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
      y: hhValues,
      type: "bar",
      hoverinfo: 'none',
      marker: {
        color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)'],
      },
      text: hhValues.map(String),
      textposition: 'auto',
    },
  ];
  var layout = {
    title: "Hard Hit %", yaxis: {
      range: [.25, .75]
    }
  }
  Plotly.newPlot("hardHitBar2", trace1, layout);

};

// second player o-swing graph
function OGraph2(playerSelected2) {
  console.log(playerSelected2);

  // create an array of the values filtered by the drop-down selection
  // for o-swing
  let o_swingValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected2);
  let OSwing_2018 = o_swingValue_2018.map((m) => m.o_swing_2018);
  let o_swingValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected2);
  let OSwing_2019 = o_swingValue_2019.map((m) => m.o_swing_2019);
  let o_swingValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected2);
  let OSwing_2020 = o_swingValue_2020.map((m) => m.o_swing_2020);
  OSwingValues = [OSwing_2018[0], OSwing_2019[0], OSwing_2020[0], .316];

  // bar graph the o-swing results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
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
  let o_contactValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected2);
  let OContact_2018 = o_contactValue_2018.map((m) => m.o_contact_2018);
  let o_contactValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected2);
  let OContact_2019 = o_contactValue_2019.map((m) => m.o_contact_2019);
  let o_contactValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected2);
  let OContact_2020 = o_contactValue_2020.map((m) => m.o_contact_2020);
  OContactValues = [OContact_2018[0], OContact_2019[0], OContact_2020[0], .627];

  // bar graph the o-swing results
  var trace2 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
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

function ZGraph2(playerSelected2) {
  console.log(playerSelected2);

  // create an array of the values filtered by the drop-down selection

  let z_swingValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected2);
  let ZSwing_2018 = z_swingValue_2018.map((m) => m.z_swing_2018);
  let z_swingValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected2);
  let ZSwing_2019 = z_swingValue_2019.map((m) => m.z_swing_2019);
  let z_swingValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected2);
  let ZSwing_2020 = z_swingValue_2020.map((m) => m.z_swing_2020);
  ZSwingValues = [ZSwing_2018[0], ZSwing_2019[0], ZSwing_2020[0], .685];

  // bar graph the results
  var trace1 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
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
  let z_contactValue_2018 = hitter_data.filter((m) => m.name_2018 === playerSelected2);
  let Zcontact_2018 = z_contactValue_2018.map((m) => m.z_contact_2018);
  let z_contactValue_2019 = hitter_data.filter((m) => m.name_2019 === playerSelected2);
  let Zcontact_2019 = z_contactValue_2019.map((m) => m.z_contact_2019);
  let z_contactValue_2020 = hitter_data.filter((m) => m.name_2020 === playerSelected2);
  let Zcontact_2020 = z_contactValue_2020.map((m) => m.z_contact_2020);
  ZContactValues2 = [Zcontact_2018[0], Zcontact_2019[0], Zcontact_2020[0], .849];

  // bar graph the results
  var trace2 = [
    {
      x: ["2018", "2019", "2020", "League Average"],
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

