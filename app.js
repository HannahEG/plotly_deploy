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
    // Build Horizontal Chart
    var sample_data = data.samples; 
    var sampleDataArray = sample_data.filter(sampleObj1 => sampleObj1.id == sample);

    var sampleBacteriaResults = sampleDataArray[0].sample_values.slice(0,11).reverse();
    var OTUs = sampleDataArray[0].otu_ids.slice(0,11);
    var OTUlabels = [sampleDataArray[0].otu_labels.slice(0,11)];

    var horizontalBar = [{
              x: sampleBacteriaResults,
              type: "bar",
              orientation: 'h',
              hoverinfo: OTUlabels
            }];
    var horizontalLayout = {
        title: "Top 10 Bacterial Species (OTUs)"
        // yaxis: {
        //   type: 'category',
        //   //title: OTUstring
        //}
      };
    Plotly.newPlot("bar", horizontalBar, horizontalLayout);

    
    // Build Bubble Chart
    var OTU1s = sampleDataArray[0].otu_ids.slice(0,71).reverse();
    var sampleBacteriaResults1 = sampleDataArray[0].sample_values.slice(0,71).reverse();

    var bubbleChart = {
      x: OTU1s,
      y: sampleBacteriaResults1,
      mode: 'markers',
      marker: {
        size: sampleBacteriaResults1,
        color: OTU1s
      }
    };
    var bubbleLayout = {
      title: 'Bubble Chart',
      showlegend: false,
      xaxis: {
        title: "OTU ID"
      },
      height: 600,
      width: 900
    };

    Plotly.newPlot('bubble', [bubbleChart], bubbleLayout);
  

  // Build gauge for belly button washing
    var wfreq = data.metadata;
    var filtered = wfreq.filter(sampleObj2 => sampleObj2.id == sample);
    var filteredWfreq = wfreq.filter(element => element !=
     null);
    var filterArray = filtered[0].wfreq

    console.log(filterArray)  

    var gaugeChart = [{
      domain: {x: [0,10], y: [0,10]},
      value: filterArray,
      title: { text: "Belly Button Wash Frequency"},
      type: "indicator",

      mode: "gauge+number"
    }];

    var gaugeLayout = {
      width: 600,
      height: 500,
      margin: {t:10, b:10}
    };

    Plotly.newPlot('gauge', gaugeChart, gaugeLayout);
  });
};

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
};

optionChanged(940);