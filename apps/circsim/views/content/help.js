/*globals Circsim*/

Circsim.contentViews.helpView = SC.View.design({
  childViews: "helpContentView closeHelpButton".w(),
  
  closeHelpButton: SC.ButtonView.design({
    layout: {top: 10, left: 10, height: 30, width: 100},
    title: "Close Help",
    target: "Circsim.statechart",
    action: "closeHelp"
  }),
  
  helpContentView: SC.LabelView.design({
    layout: {top: 55, bottom: 0, right: 0, left: 0},
    value: "Help Screen goes here."
  })
});


