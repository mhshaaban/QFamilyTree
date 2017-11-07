///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////

var margin = {top: 50, right: 50, bottom: 50, left: 50};

var width = 800 - margin.left - margin.right;
var height = 800 - margin.top - margin.bottom;

			
var svg = d3.select("#chart").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

///////////////////////////////////////////////////////////////////////////
/////////////////////////// Initialize force //////////////////////////////
///////////////////////////////////////////////////////////////////////////

  var color = d3.scale.ordinal()
		.range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852"])
		.domain(["Non-Mamlūks","Awlād al-Nās","Ayyūbids","Early Mamlūks","Amirs", "Baybars","Qalāwūnids","Qalāwūnid Princes & Princesses","Qalāwūnid Royal Wives"]);
    
  var nodeRadius = 6;
  var networkData = JSON.parse(JSON.stringify(graph));
  
  var graphNodes = (networkData.nodes);
  var graphLinks = (networkData.links);
  
  var linkedByIndex = {};
	graphLinks.forEach(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

  function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }

  var force = d3.layout.force()
      .size([width, height])
      .nodes(graphNodes)
      .links(graphLinks)
      .gravity(.05)
      .charge(-60)
      .linkDistance(40)
      .on("tick", normalNetwork);

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Initialize Tooltip ///////////////////////////
///////////////////////////////////////////////////////////////////////////
  
	var tip = d3.tip()
  		.attr('class', 'd3-tip')
  		.offset([-10, 0])
  		.html(function(d) {
    		return "<strong>Person:</strong> <span style='color:red'>" + d.name + "</span>";
  		}) 
  	
	svg.call(tip);
///////////////////////////////////////////////////////////////////////////
/////////////////////////// Initialize containers /////////////////////////
///////////////////////////////////////////////////////////////////////////	

    //Create a wrapper for the network
    var networkWrapper = svg.append("g")
		  .attr("class", "networkWrapper");

///////////////////////////////////////////////////////////////////////////
///////////////////////////// Initialize Links ////////////////////////////
///////////////////////////////////////////////////////////////////////////	

    //Container for all the links
    var linkWrapper = networkWrapper.append("g")
        .attr("class", "linkWrapper");

    //Create the link lines
   var link = linkWrapper.selectAll(".link")
        .data(graphLinks)
        .enter().append("line")
        .attr("class", "link");

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Initialize Nodes /////////////////////////////
///////////////////////////////////////////////////////////////////////////

    //Container for all the links
    var nodeWrapper = networkWrapper.append("g")
        .attr("class", "nodeWrapper");

    //Create the node circles - first a wrapper for each node
    var node = nodeWrapper.selectAll(".node")
        .data(graphNodes)
        .enter().append("g")
	.attr("class", "node")
	.call(force.drag);

	node.append("circle")
	.attr("id", function(d) { return d.id; })
        .style("fill", function(d) { return color(d.group); })
        .attr("r", nodeRadius)
	.on('mouseover', tip.show)
      	.on('mouseout', tip.hide);
	
     var nodeLabel = node.append("text")
		.attr("dx", 12)
      		.attr("dy", ".35em")
                .style("fill", "#000000")
                .text(function(d) {  return d.name;  })
		.style("opacity", 0);

function normalNetwork() {
    node
        .attr('transform', function(d) { 
    	d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x));
    	d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y)); 
    	return 'translate(' + d.x + ',' + d.y + ')'; 
    });

    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
}
