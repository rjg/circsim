/*globals Circsim*/

Circsim.contentViews.introView = SC.View.design({
  childViews: 'text'.w(),
  
  text: SC.TemplateView.design({
    templateName: 'circsim_intro',
    layerId: "circsim-introduction"    
  })
});
