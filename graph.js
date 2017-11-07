///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////

var margin = {left: 30, top: 20, right: 20, bottom: 20},
	width = 800 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom;

			
var svg = d3.select("#graph").append("svg")
			.attr("width", (width + margin.left + margin.right))
			.attr("height", (height + margin.top + margin.bottom));
			
var wrapper = svg.append("g").attr("class", "chordWrapper")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
///////////////////////////////////////////////////////////////////////////
/////////////////////////// Initialize force //////////////////////////////
///////////////////////////////////////////////////////////////////////////

  var color = d3.scale.ordinal()
		.range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852"])
		.domain(["Non-Mamlūks","Awlād al-Nās","Ayyūbids","Early Mamlūks","Amirs", "Baybars","Qalāwūnids","Qalāwūnid Princes & Princesses","Qalāwūnid Royal Wives"]);
    
  nodeRadius = 6;
  networkData = JSON.parse(JSON.stringify(graph));
  
  nodes = (networkData.nodes);
  links = (networkData.links);
  
  d3.layout.force()
      .size([width, height])
      .nodes(nodes)
      .links(links)

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
    link = linkWrapper.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link");

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Initialize Nodes /////////////////////////////
///////////////////////////////////////////////////////////////////////////

    //Container for all the links
    var nodeWrapper = networkWrapper.append("g")
        .attr("class", "nodeWrapper");

    //Create the node circles - first a wrapper for each node
    node = nodeWrapper.selectAll(".node")
        .data(nodes)
        .enter().append("g")
	.attr("class", "node")
	.call(force.drag);
	
	node.append("circle")
	.attr("id", function(d) { return d.id; })
	.on("mouseover",showToolTip)
	.on("mouseout",hideToolTip)
        .style("fill", function(d) { return color(d.group); })
        .attr("r", nodeRadius);
	
	nodeLabel = node.append("text")
		.attr("dx", 12)
      		.attr("dy", ".35em")
                .style("fill", "#000000")
                .text(function(d) {  return d.name;  })
		.style("opacity", 0);
