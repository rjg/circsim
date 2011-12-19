/*globals Circsim*/

Circsim.contentViews.introView = SC.View.design({
  childViews: 'text'.w(),
  
  text: SC.View.design({
    layerId: "circsim-introduction", 
    value: "intro"
  })
});
