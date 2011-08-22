/*globals Circsim*/

Circsim.sidebarViews.runningView = SC.View.design({
  layout: {width: 250},
  childViews: 'procedureLabelView procedureListView'.w(),        
  procedureLabelView: SC.LabelView.design({
    layout: {
      top: 8,
      bottom: 8,
      left: 8,
      right: 0,
      height: 16
    },
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
    //Here is the original list view, which is bound to the tasksController
    contentView: SC.ListView.design({
      contentBinding: 'Circsim.proceduresController.arrangedObjects',
      selectionBinding: 'Circsim.proceduresController.selection',
      contentValueKey: 'title',
      rowHeight: 42,
      canDeleteContent: NO,
      actOnSelect: YES, 
      target: "Circsim.statechart",
      action: "selectProcedure"
    })
  })  

});