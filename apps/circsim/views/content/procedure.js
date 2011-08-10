/*globals Circsim Handlebars*/

Circsim.contentViews.procedureView = SC.TemplateView.design({  
  templateName: 'procedure',
  titleBinding: "Circsim.procedureController.title",
  instructionsBinding: "Circsim.procedureController.instructions"
});

Circsim.contentViews.drView = SC.TemplateView.design({
  contentBinding: "Circsim.drController.content"
});

Circsim.contentViews.drCellsView = SC.TemplateCollectionView.design({
  contentBinding: "Circsim.drController.cells"
});

Circsim.contentViews.rrView = SC.TemplateView.design({
  contentBinding: "Circsim.rrController.content"
});

Circsim.contentViews.rrCellsView = SC.TemplateCollectionView.design({
  contentBinding: "Circsim.rrController.cells"
});

Circsim.contentViews.ssView = SC.TemplateView.design({
  contentBinding: "Circsim.ssController.content"
});

Circsim.contentViews.ssCellsView = SC.TemplateCollectionView.design({
  contentBinding: "Circsim.ssController.cells"
});

