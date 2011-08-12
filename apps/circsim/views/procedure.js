/*globals Circsim*/

sc_require("views/prediction_table");
sc_require("views/procedure_messages");

Circsim.contentViews.procedureView = SC.SplitView.design({  
  layerId: 'procedure',
  layout: { left: 0, top: 0, right: 0, bottom: 0 },
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
    layout: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    tagName: "div",
    layerId: "procedure-interaction",
    childViews: "predictionTableView procedureMessagesView".w(),
    
    predictionTableView: Circsim.PredictionTableView.design({
        layerId: "grid",
        tagName: "div",
        useStaticLayout:YES
    }),      
      
    procedureMessagesView: Circsim.ProcedureMessagesView.design({
      layerId: 'procedure-messages',
      tagName: "div",
      useStaticLayout:YES,
      messageBinding: "Circsim.messageController.content"
    })      
  })  
});

