/*globals Circsim*/

Circsim.sidebarViews.runningView = SC.View.design({
  layout: {width: 250},
  childViews: 'procedureLabelView procedureListView'.w(),        
  procedureLabelView: SC.LabelView.design({
    layout: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    backgroundColor: "#DDDDDD",
    layerId: "procedure-label",
    fontWeight: SC.BOLD_WEIGHT,
    value: 'Procedures:'
  }),
  
  procedureListView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: {
      top: 32,
      bottom: 0,
      left: 0,
      right: 0
    },
    backgroundColor: '#FBFBFB',
    contentView: SC.ListView.design({
      contentBinding: 'Circsim.proceduresController.arrangedObjects',
      selectionBinding: 'Circsim.proceduresController.selection',
      contentValueKey: 'title',
      rowHeight: 62,
      canDeleteContent: NO,
      actOnSelect: YES, 
      target: "Circsim.statechart",
      action: "selectProcedure"
    })
  })  

});