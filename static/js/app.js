var json_data; 

function metadata(name){
    var currentMetadata = json_data.metadata.filter(item=>item.id==name)[0]
    var selector = d3.select("#sample-metadata")
    selector.html("")
    for (const [key, value] of Object.entries(currentMetadata)) {
        selector.append("p").text(`${key}: ${value}`);
      }
   
}

function charts(name){
// console.log("charts: "+ name)
var barData = [{
    type: 'bar',
    x: [20, 14, 23],
    y: ['giraffes', 'orangutans', 'monkeys'],
    orientation: 'h'
  }];
  
  Plotly.newPlot('bar', barData);
  
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      opacity: [1, 0.8, 0.6, 0.4],
      size: [40, 60, 80, 100]
    }
  };
  
  var bubbleData = [trace1];
  
  var bubbleLayout = {
    title: 'Marker Size and Color',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}

function optionChanged(new_name){
metadata(new_name);
charts(new_name);
};

function dropdown(names){
var selector = d3.select("#selDataset");
names.forEach(name => {
    selector
        .append("option")
        .text(name);
});

optionChanged(names[0]);
}

d3.json("./samples.json").then(function(response){
    // console.log(response);
json_data = response;
dropdown(json_data.names)
});