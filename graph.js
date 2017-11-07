///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////

var margin = {left: 0, top: 0, right: 0, bottom: 0},
	width = 800 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom;

			
var svg = d3.select("#chart").append("svg")
	.attr("width", width)
    	.attr("height", height);
      
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
  
  var force = d3.layout.force()
      .size([width, height])
      .nodes(graphNodes)
      .links(graphLinks)

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Initialize Tooltip ///////////////////////////
///////////////////////////////////////////////////////////////////////////
  
	var showToolTip = function (d){
		//Define and show the tooltip
		$(this).popover({
			placement: 'auto top',
			container: 'body',
			trigger: 'manual',
			viewport:'#tooltip',
			html : true,
			content: function() { 
				return "<span style='font-size: 11px; text-align: center;'>" + d.name + "</span>"; }
		});
		
		
		$(this).popover('show');
		
	};
	
	var hideToolTip = function(){
		$('.popover').each(function() {
			$(this).remove();
		}); 
	};  
  
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
	.on("mouseover",showToolTip)
	.on("mouseout",hideToolTip)
        .style("fill", function(d) { return color(d.group); })
        .attr("r", nodeRadius);
	
     var nodeLabel = node.append("text")
		.attr("dx", 12)
      		.attr("dy", ".35em")
                .style("fill", "#000000")
                .text(function(d) {  return d.name;  })
		.style("opacity", 0);
