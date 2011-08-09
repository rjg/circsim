/*globals Circsim*/

Circsim.contentViews.titleView = SC.View.design({
  childViews: "circsimLogoView startButton".w(),
  
  circsimLogoView: SC.LabelView.design({
    layout: {height: 20, width: 250, centerX: 0, centerY: 0},
    value: "Circsim Title Page.  This will be updated Later."
  }),
  
  startButton: SC.ButtonView.design({
    layout: {height: 100, width: 150, bottom: 10, centerX: 0},
    title: "Start Circsim",
    target: "Circsim.statechart",
    action: "startCircsim"
  })
  
});
