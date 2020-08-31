function init() {
    var selector = d3.select("#selDataset");
   
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
         selector
           .append("option")
           .text(sample)
           .property("value", sample);
       });
   })}
   
   init(); 

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var sample_data = data.samples; 
    var sampleDataArray = sample_data.filter(sampleObj1 => sampleObj1.id == sample);
  //console.log(sampleDataArray); 

    var sampleBacteriaResults = sampleDataArray[0].sample_values.slice(0,11).reverse();
  console.log(sampleBacteriaResults);

    var OTUs = sampleDataArray.map(otu => otu.otu_ids);
    console.log(OTUs);

    var horizontalBar = [{
              x: sampleBacteriaResults,
              y: ("OTU" + OTUs.toString()),
              type: "bar",
              orientation: 'h'
            }];
    var horizontalLayout = {
        title: "Top 10 Bacterial Species (OTUs)"
      };
    Plotly.newPlot("bar", horizontalBar, horizontalLayout)
      });}




function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var results = Object.entries(result)
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text(results);
  });
}

optionChanged(940)