/*globals Circsim*/

sc_require("views/procedure_messages");
sc_require("views/pv");
sc_require("views/row_view");
sc_require("lib/grid_patch");

Circsim.contentViews.procedureView = SC.View.design({
  layerId: 'procedure',
  layout: { left: 0, top: 0, right: 0, bottom: 0, minWidth: 800},
  childViews: "procedureTitle procedureToolbar procedureContent".w(),
  procedureTitle: SC.LabelView.design({
    layout: {top: 0, right: 10, left: 10, height: 20, centerY: 0},
    tagName: "h1",
    layerId: "procedure-title",
    valueBinding: "Circsim.procedureController.title"
  }),
  
  procedureToolbar: SC.View.design({
    layout: {top: 40, right: 10, left: 10, height: 40},
    tagName: "div",
    layerId: "procedure-toolbar",
    backgroundColor: "#777",
    childViews: "nextButton".w(),
    nextButton: SC.ButtonView.design({
      layout: {centerY: -5, right: 10, width: 100, height: 20},
      tagName: "div",
      layerId: "next-button",
      backgroundColor: "#EBEBEB",
      title: "Next",
      target: "Circsim.statechart",
      action: "next"      
    })
  }),
  
  procedureContent: SC.View.design({
    layout: {top: 80, right: 10, left: 10, bottom: 0},
    tagName: "div",
    layerId: "procedure-content",
    childViews: "pvView predictionTableView messagesView".w(),
    pvView: SC.View.design({
      layout: {top: 0, left: 0, height: 50, width: 480},
      tagName: "div",
      layerId: "pv-view",
      backgroundColor: "#999",
      childViews: "pvLabel pvSelection pvSubmit".w(),
        
        pvLabel: SC.LabelView.design({
          layout: {top: 15, width: 150, height: 20, left: 10},
          value: "Select the primary variable:"
        }),
        
        pvSelection: SC.SelectView.design({
          layout: {top: 15, width: 200, height: 20, left: 165},
          backgroundColor: "#DDD", 
          itemsBinding: "Circsim.procedureController.rows",
          valueBinding: "Circsim.pvSelectionController.content"
        }),
        
        pvSubmit: SC.ButtonView.design({
          layout: {top: 15, width: 60, height: 80, left: 375},
          title: "Submit PV",
          target: "Circsim.statechart",
          action: "selectedPV"
        })
    }),
    
    predictionTableView: SC.View.design({
      layout: {top: 50, left: 0, bottom: 0, width: 470},
      tagName: "div",
      layerId: "prediction-table-view",
      backgroundColor: "white",
      childViews: "gridView headerView rowTitleView".w(),
      
      headerView: Circsim.GridHeaderView.design({
        layout: {right: 0, left: 90, top: 0, height: 50 }
      }),
      
      rowTitleView: Circsim.RowView.design({
        layout: {left: 0, width: 90, top: 50, bottom: 0}
      }),
      
      gridView: SC.GridView.design({
        layout: {right: 0, top: 50, left: 90},
        insertionOrientation: SC.VERTICAL_ORIENTATION,
        columnWidth:120,
        rowHeight: 50,
        contentBinding: "Circsim.cellsController.allCells",           
        target: "Circsim.statechart",
        action: "clickedOnCell",
        actOnSelect: YES,
        exampleView: Circsim.CellView.design({
          backgroundColor: "white",
          classNames: "cell"
        })
      })
    }),
    
    messagesView: SC.LabelView.design({
      layout: {top: 0, left: 480, bottom: 0, right: 0},
      tagName: "div",
      layerId: "messages-view",
      backgroundColor: "#DCDCDC",
      valueBinding: "Circsim.messageController.content"
    })
  })
  
    
});





// layerId: 'procedure',
// layout: { left: 0, top: 0, right: 0, bottom: 0 },
// layoutDirection: SC.LAYOUT_VERTICAL,
// canCollapseViews: NO,
// defaultThickness: 120,
// topLeftMinThickness: 120, 
// dividerThickness: 0,
// autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
//   
// topLeftView: SC.View.design({
//   tagName: "div",
//   layerId: "procedure-info",
//   childViews: "procedureTitle procedureInstructions pvSelection pvSubmit".w(),
//   
//   procedureTitle: SC.LabelView.design({
//     layout: {top: 10, right: 0, left: 10},
//     tagName: "h1",
//     layerId: "procedure-title",
//     valueBinding: "Circsim.procedureController.title"            
//   }),
//   
//   procedureInstructions: SC.LabelView.design({
//     layout: {top: 52, right: 10, left: 10},
//     tagName: "div",
//     layerId: "procedure-instructions",
//     valueBinding: "Circsim.instructionsController.content"
//   }),
//   
//   pvSelection: SC.SelectView.design({
//     layout: {top: 90, width: 100, height: 20, left: 0},
//     backgroundColor: "#DDD", 
//     itemsBinding: "Circsim.procedureController.rows",
//     valueBinding: "Circsim.pvSelectionController.content"
//   }),
//   
//   pvSubmit: SC.ButtonView.design({
//     layout: {top: 90, width: 50, height: 80, left: 120},
//     title: "Submit PV",
//     target: "Circsim.statechart",
//     action: "selectedPV"
//   })
// 
// 
// }),
// 
// dividerView: SC.View,
// 
// bottomRightView: SC.View.design({
//   tagName: "div",
//   layerId: "procedure-interaction",
//   childViews: "split".w(),
//   layout: { left: 0, top: 0, right: 0, bottom: 0 },    
//   split: SC.SplitView.design({
//     canCollapseViews: NO,
//     defaultThickness: 500,
//     topLeftMaxThickness: 500,
//     dividerThickness: 0,
//     layoutDirection: SC.LAYOUT_HORIZONTAL,
//         
//     topLeftView: SC.View.extend({
//       layout: { left: 0, top: 0, right: 0, bottom: 0 },
//       backgroundColor: "#EBEBEB",
//       childViews: "predictionTable evaluateButton".w(),
//       predictionTable: SC.GridView.design({
//         layout: {right: 0, bottom: 20, top: 0, left: 0},
//         insertionOrientation: SC.VERTICAL_ORIENTATION,
//         columnWidth:160,
//         rowHeight: 50,
//         contentBinding: "Circsim.cellsController.allCells",           
//         target: "Circsim.statechart",
//         action: "clickedOnCell",
//         actOnSelect: YES,
//         exampleView: Circsim.CellView.design({
//           backgroundColor: "white",
//           classNames: "cell"
//         })
//       }),
//       
//       evaluateButton: SC.ButtonView.design({
//         layout: {bottom: 0, right: 0, width: 150, height: 20},
//         title: "Submit",
//         target: "Circsim.statechart",
//         action: "submitForEvaluation"
//       })
//     }),
// 
//     dividerView: SC.View,
// 
//     bottomRightView: SC.View.extend({
//       layout: { left: 0, top: 0, right: 0, bottom: 0 },
//       childViews: "messages".w(),
//       backgroundColor: "#EBEBEB",
//       layerId: "message-container",
//       valueBinding: "Circsim.messageController.content",
//       messages: SC.View.design({
//         useStaticLayout: YES,
//         layerId: "messages",
//         childViews: "split".w(),
//         split: SC.SplitView.design({
//           layout: {top: 0, bottom: 0, left: 0, right: 0},
//           canCollapseViews: NO,
//           defaultThickness: 250,
//           topLeftMaxThickness: 250,
//           dividerThickness: 2,
//           layoutDirection: SC.LAYOUT_HORIZONTAL,            
//           topLeftView: SC.View.design({
//             backgroundColor: "red"
//           }),
//           dividerView: SC.View, 
//           bottomRightView: SC.View.design({
//             backgroundColor: "green",
//             layerId: "green"
//           })
//           
//         })
//       })
//     })
//     
//     
//     
//   })
// })  
