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
    // buildBubbleChart(newSample);
}

// function buildBubbleChart(sample) {
//   d3.json("samples.json").then((data) => {
//     var bubbleChart = {
//       x: []
//       y: []
//       mode: 'markers',
//       marker: {
//         size: []
//       } 
//     };
    
//     var bubbleLayout = {
//       title: 'Insert',
//       showlegend: false,
//       height: 600,
//       width: 600
//     };

//     Plotly.newPlot('bubble', [bubbleChart], bubbleLayout)
//   })
// };

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var sample_data = data.samples; 
    var sampleDataArray = sample_data.filter(sampleObj1 => sampleObj1.id == sample);
  //console.log(sampleDataArray); 

    var sampleBacteriaResults = sampleDataArray[0].sample_values.slice(0,11).reverse();
  console.log(sampleBacteriaResults);

    var OTUs = [sampleDataArray[0].otu_ids.slice(0,11)];
    var OTUstring = OTUs.forEach(otu => console.log(otu))
    var OTUlabels = sampleDataArray[0].otu_labels//.slice(0,11);
console.log(OTUlabels)
    var horizontalBar = [{
              x: sampleBacteriaResults,
              y: OTUstring,
              type: "bar",
              orientation: 'h',
              text: [OTUstring],
              hoverinfo: OTUlabels
            }];
    var horizontalLayout = {
        title: "Top 10 Bacterial Species (OTUs)"
      };
    Plotly.newPlot("bar", horizontalBar, horizontalLayout)

    var bubbleChart = {
      x: OTUs,
      y: sampleBacteriaResults,
      mode: 'markers',
      marker: {
        size: sampleBacteriaResults,
        color: OTUs
      }
      //type: 'scatter'
    };
    
    var bubbleLayout = {
      title: 'Insert',
      showlegend: false,
      height: 600,
      width: 600
    };

    Plotly.newPlot('bubble', [bubbleChart], bubbleLayout)

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