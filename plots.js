d3.selectAll("body").on("change", updatePage);

function updatePage() {
  var dropdownMenu = d3.selectAll("#selectOption").node();
  var dropdownMenuID = dropdownMenu.id;
  var selectedOption = dropdownMenu.value;

  console.log(dropdownMenuID);
  console.log(selectedOption);
};

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

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("id : " + result.id);
      PANEL.append("h6").text("ethnicity : " + result.ethnicity);
      PANEL.append("h6").text("gender : " + result.gender);
      PANEL.append("h6").text("age : " + result.age);
      PANEL.append("h6").text("location : " + result.location);
      PANEL.append("h6").text("bbtype : " + result.bbtype);
      PANEL.append("h6").text("wfreq : " + result.wfreq);
    });

  }

  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultingArray = samples.filter(sampleObj => sampleObj.id == sample);
      var results = resultingArray[0];
      var otu_ids = results.otu_ids;
      var sample_values = results.sample_values;
      var otu_labels = results.otu_labels;
      var TopTenValues = results.sample_values.slice(0,10);
      var TopTenName = results.otu_ids.slice(0,10);      
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var freq = result.wfreq


//bar
      var trace = {
        x: TopTenValues,
        orientation: 'h',
        type: "bar"
       };

       var data = [trace];

       var layout = {
        title: "'Bar' Chart",
        xaxis:{
          title: "Values",
          lables: otu_ids
      },
      yaxis:{
        title: "Names",
        autorange: 'reverse',
        side:'left'
      } 
       };
       Plotly.newPlot("bar", data, layout);

//gauge
       var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: freq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number+delta",
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 1], color: "lightgray" },
              { range: [1, 2], color: "gray" },
              { range: [2, 3], color: "lightyellow" },
              { range: [3, 4], color: "yellow" },
              { range: [4, 5], color: "lightgreen" },
              { range: [5 , 6], color: "green" },
              { range: [6, 7], color: "lightgreen" },
              { range: [7, 8], color: "lightgreen" },
              { range: [8, 9], color: "lightgreen" },
              { range: [9, 10], color: "lightgreen" }
            ],
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
      
//bubble
      var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        height: 600,
        width: 1300
      };
      
      Plotly.newPlot('bubble', data, layout);

    });
  }

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}


 