function getSelectionhitters() {
    // need to fetch our csv data using flask here
    dataset = d3.json("samples.json").then(function (sampleData) {
        var testSubject = parseInt(d3.select("#selDataset").property("value"));

        //filter the dataset by the dropdown item
        var idData = sampleData.metadata.filter(m => m.id === testSubject);
        
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
       
        barGraph(testSubject)
        gaugeChart(testSubject)
    });