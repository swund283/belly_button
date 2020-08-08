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

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

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
      var TopTenValues = results.sample_values.slice(0,10);
      var TopTenName = results.otu_ids.slice(0,10);
      console.log(TopTenName);
      console.log(TopTenValues);
    });
  }

  var trace = {
    x: [TopTenName],
    y: [TopTenValues],
    type: "bar"
   };
   var data = [trace];
   var layout = {
    title: "'Bar' Chart",
    xaxis: { title: "Names"},
    yaxis: { title: "Values"}
   };
   Plotly.newPlot("bar", data, layout);