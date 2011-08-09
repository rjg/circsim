/*globals Circsim*/

Circsim.contentViews.procedureIntroView = SC.View.design({
  childViews: "startProcedureButton procedureIntroText".w(),
  
  procedureIntroText: SC.LabelView.design({
    layout: {right: 0, left: 0, top: 60},
    valueBinding: "Circsim.procedureController.introduction"    
  }),
  
  startProcedureButton: SC.ButtonView.design({
    layout: {top: 10, left: 10, height: 100, width: 150},
    title: "Begin Procedure",
    target: "Circsim.statechart",
    action: "beginProcedure"
  })
  
});