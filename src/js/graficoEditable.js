var labelType, useGradients, nativeTextSupport, animate;

(function() {
    init();
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var json = {
        id: "190_0",
        name: "Primero de carrera",
        children: [
            {
            id: "306208_1",
            name: "Pearl Jam &amp; Cypress Hill",
            data: {
                relation: "<h4>Pearl Jam &amp; Cypress Hill</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: collaboration)</div></li><li>Cypress Hill <div>(relation: collaboration)</div></li></ul>"
            },
            children: [{
                id: "84_2",
                name: "Cypress Hill",
                data: {
                    relation: "<h4>Cypress Hill</h4><b>Connections:</b><ul><li>Pearl Jam &amp; Cypress Hill <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
            }]
        }, {
            id: "107877_3",
            name: "Neil Young &amp; Pearl Jam",
            data: {
                relation: "<h4>Neil Young &amp; Pearl Jam</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: collaboration)</div></li><li>Neil Young <div>(relation: collaboration)</div></li></ul>"
            },
            children: [{
                id: "964_4",
                name: "Neil Young",
                data: {
                    relation: "<h4>Neil Young</h4><b>Connections:</b><ul><li>Neil Young &amp; Pearl Jam <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
            }]
        
        }],
        data: {
            relation: "<h4>Pearl Jam</h4><b>Connections:</b><ul><li>Pearl Jam &amp; Cypress Hill <div>(relation: collaboration)</div></li><li>Neil Young &amp; Pearl Jam <div>(relation: collaboration)</div></li><li>Jeff Ament <div>(relation: member of band)</div></li><li>Stone Gossard <div>(relation: member of band)</div></li><li>Eddie Vedder <div>(relation: member of band)</div></li><li>Mike McCready <div>(relation: member of band)</div></li><li>Matt Cameron <div>(relation: member of band)</div></li><li>Dave Krusen <div>(relation: member of band)</div></li><li>Matt Chamberlain <div>(relation: member of band)</div></li><li>Dave Abbruzzese <div>(relation: member of band)</div></li><li>Jack Irons <div>(relation: member of band)</div></li></ul>"
        }
    };
    //end
    
    //init RGraph
    var rgraph = new $jit.RGraph({
        //Where to append the visualization
        injectInto: 'infovis',
        //Optional: create a background canvas that plots
        //concentric circles.
        background: {
          CanvasStyles: {
            strokeStyle: '#555'
          }
        },
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        Navigation: {
          enable: true,
          panning: true,
          zooming: 10
        },
        //Set Node and Edge styles.
        Node: {
            color: '#ddeeff'
        },
        
        Edge: {
          color: '#C17878',
          lineWidth:1.5
        },

        onBeforeCompute: function(node){
            Log.write("centering " + node.name + "...");
            //Add the relation list in the right column.
            //This list is taken from the data property of each JSON node.
            $jit.id('inner-details').innerHTML = node.data.relation;
        },
        
        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                rgraph.onClick(node.id, {
                    onComplete: function() {
                        Log.write("done");
                    }
                });
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ccc";
            
            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#494949";
            
            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data
    rgraph.loadJSON(json);
    //trigger small animation
    rgraph.graph.eachNode(function(n) {
      var pos = n.getPos();
      pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
      modes:['polar'],
      duration: 2000
    });
    //end
    //append information about the root relations in the right column
    $jit.id('inner-details').innerHTML = rgraph.graph.getNode(rgraph.root).data.relation;
}