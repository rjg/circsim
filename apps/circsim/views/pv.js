/*globals Circsim*/

Circsim.PVView = SC.View.design({
  layout: {top: 0, left: 0, height: 50, width: 480},
  tagName: "div",
  layerId: "pv-view",
  backgroundColor: "#999",
  childViews: "pvLabel pvSelection".w(),
    
    pvLabel: SC.LabelView.design({
      layout: {top: 15, width: 150, height: 20, left: 20},
      value: "Primary Variable:",
      layerId: 'pv-label'
    }),
    
    pvSelection: SC.SelectFieldView.design({          
      layout: {top: 15, width: 330, height: 20, right: 15},
      valueBinding: "Circsim.pvSelectionController.content",
      objectsBinding: "Circsim.procedureController.rows",
      disableSort: true,
      emptyName: "Select the Primary Variable",
      layerId: 'pv-select'
      
    })
});

Circsim.PVSummaryView = SC.View.design({
  layout: {top: 0, left: 0, height: 50, width: 480},
  tagName: "div",
  layerId: "pv-summary-view",
  backgroundColor: "#999",
  childViews: "pvLabel pvAnswer".w(),
    
  pvLabel: SC.LabelView.design({
    layout: {top: 15, width: 150, height: 20, left: 20},
    value: "Primary Variable:"
  }),
  
  pvAnswer: SC.LabelView.design({          
    layout: {top: 14, width: 250, height: 20, left: 132},
    valueBinding: "Circsim.procedureController.currentPV",
    fontWeight: SC.BOLD_WEIGHT,
    layerId: "correct-pv-display"
  })
});
