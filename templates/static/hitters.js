

var IDs = [];

hitterNameTest = "Mike Trout"

fetch("/hitters_names")

  .then(function (response) {
    hitterName = d3.json(response).then(function (parsed_response) {
        var IDs = Object.values(parsed_response.Name);
        for(i=0; i < IDs.length; i++) {
            d3.select("#selDataset").append("option").text(IDs[i]);
        };
    });
    });

function init(){
  getSelection;
};
  

//call getSelection at the beginning on an initial value

d3.selectAll("#selDataset").on("change", getSelectionHitters);  
// var testSubject = d3.select("#selDataset").property("value");

// function which will take the value of the drop down, then create the 
// metadata table.  It also calls the functions to create the bar graph, bubble and gauge charts.

function getSelectionHitters() {
    // need to fetch our csv data using flask here
    dataset = d3.json("samples.json").then(function (sampleData) {
        var playerSelectedName = parseInt(d3.select("#selDataset").property("value"));

        //filter the dataset by the dropdown item
        var idData = sampleData.metadata.filter(m => m.id === playerSelectedName);
        
        // pull out the data from the dropdown item for the demographic information
        var avgData = idData.map(m => m.id);
        var opsData = idData.map(m => m.ethnicity);
        var rData = idData.map(m => m.gender);
        var rbiData = idData.map(m => m.age);
        var hrData = idData.map(m => m.location);
        var sbData = idData.map(m => m.bbtype);
        d3.select("#avgTable").text(`id: ${avgData}`);
        d3.select("#opsTable").text(`ethnicity: ${opsData}`);
        d3.select("#rTable").text(`gender: ${rData}`);
        d3.select("#rbiTable").text(`age: ${rbiData}`);
        d3.select("#hrTable").text(`location: ${hrData}`);
        d3.select("#sbTable").text(`bbtype: ${sbData}`);
       
        barGraph(playerSelectedName)
        // gaugeChart(testSubject)
    });
};

// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function barGraph(playerSelected){
    console.log(testSubjectId);
        
    // create an array of the values filtered by the drop-down selection
    dataset = d3.json("samples.json").then(function (sampleData) {
        let idValues = sampleData.samples.filter(m => +m.id === testSubjectId);
        console.log(idValues);

        let forValues = idValues[0]["sample_values"];
        let otuIds = idValues[0]["otu_ids"];
        let otuLabels = idValues[0]["otu_labels"];

        let top10Values = forValues.slice(0, 10).reverse();
        let top10Ids = otuIds.slice(0, 10).reverse().map(element => `OTU ${element}`);

        
        console.log(top10Values);
        console.log(top10Ids);

        // bar graph the results
        d3.json("samples.json").then((data) => {
            var trace1 = [{
                x: top10Values,
                y: top10Ids,
                type: "bar",
                name: "Cancer Survival",
                orientation: "h"
            }];
            Plotly.newPlot("bar", trace1);
        });
    });
};
    