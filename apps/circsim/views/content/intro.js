/*globals Circsim*/

Circsim.contentViews.introView = SC.View.design({
  childViews: 'text'.w(),
  
  text: SC.LabelView.design({
    layout: {top: 0, bottom: 0, right: 0, left: 0},
    value: "Circsim introduction goes here."
  })
});
