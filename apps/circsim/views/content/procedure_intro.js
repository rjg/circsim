/*globals Circsim*/

Circsim.contentViews.procedureIntroView = SC.View.design({
  
  layout: {top: 130, left: 130, right: 130, bottom: 130},  
  childViews: "startProcedureButton procedureIntroText".w(),
  
  procedureIntroText: SC.LabelView.design({
    layout: {right: 0, left: 0, top: 0, bottom: 30},    
    valueBinding: "Circsim.procedureController.introduction",
    escapeHTML: NO
  }),
  
  startProcedureButton: SC.ButtonView.design({
    layout: {bottom: 0, left: 0, height: 24, width: 124},
    title: "Begin Procedure",
    layerId: "begin-procedure-button",
    target: "Circsim.statechart",
    action: "beginProcedure"
  })
  
});
