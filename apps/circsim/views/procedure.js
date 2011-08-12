/*globals Circsim*/

sc_require("views/procedure_messages");
sc_require("lib/grid_patch");

Circsim.contentViews.procedureView = SC.SplitView.design({  
  layerId: 'procedure',
  layout: { left: 0, top: 0, right: 10, bottom: 15 },
  layoutDirection: SC.LAYOUT_VERTICAL,
  canCollapseViews: NO,
  defaultThickness: 220,
  topLeftMinThickness: 220, 
  dividerThickness: 0,
  autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
    
  topLeftView: SC.View.design({
    tagName: "div",
    layerId: "procedure-info",
    childViews: "procedureTitle procedureInstructions".w(),
    
    procedureTitle: SC.LabelView.design({
      layout: {top: 10, right: 0, left: 10},
      tagName: "h1",
      layerId: "procedure-title",
      valueBinding: "Circsim.procedureController.title"            
    }),
    
    procedureInstructions: SC.LabelView.design({
      layout: {top: 52, right: 10, left: 10, bottom: 0},
      tagName: "div",
      layerId: "procedure-instructions",
      valueBinding: "Circsim.procedureController.instructions"
    })
  }),
  
  dividerView: SC.View,
  
  bottomRightView: SC.View.design({
    tagName: "div",
    layerId: "procedure-interaction",
    childViews: "split".w(),
    layout: { left: 10, top: 0, right: 0, bottom: 0 },
    
    split: SC.SplitView.design({
      canCollapseViews: NO,
      defaultThickness: 500,
      topLeftMaxThickness: 500,
      dividerThickness: 0,
      layoutDirection: SC.LAYOUT_HORIZONTAL,
          
      topLeftView: SC.View.extend({
        layout: { left: 0, top: 0, right: 0, bottom: 0 },
        backgroundColor: "#EBEBEB",
        childViews: "predictionTable".w(),
        predictionTable: SC.GridView.design({
          layout: {right: 0, bottom: 0, top: 0, left: 0},
          insertionOrientation: SC.VERTICAL_ORIENTATION,
          columnWidth:160,
          rowHeight: 53.75,
          contentBinding: "Circsim.cellsController.allCells",           
          selectionBinding: "Circsim.cellController.content", 
          // target: "Circsim.statechart",
          // action: "evaluateClick",
          // actOnSelect: YES,
          exampleView: Circsim.CellView.design({
            backgroundColor: "white",
            classNames: "cell"
          })
        })
      }),

      dividerView: SC.View,

      bottomRightView: SC.View.extend({
        layout: { left: 0, top: 0, right: 0, bottom: 0 },
        backgroundColor: "#EBEBEB"
      })
      
    })
  })  
});

