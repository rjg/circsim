/*globals Circsim*/

Circsim.contentViews.titleView = SC.View.design({
  childViews: "circsimLogoView startButton".w(),
  
  circsimLogoView: SC.TemplateView.design({
    templateName: "title",
    layerId: 'title-information'
  }),
  
  startButton: SC.ButtonView.design({
    layout: {height: 75, width: 150, bottom: 0, left: 130},
    title: "Start Circsim",
    layerId: 'start-circsim-button',
    target: "Circsim.statechart",
    action: "startCircsim"
  })
  
});
