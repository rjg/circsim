/*globals Circsim */

sc_require("views/toolbar");

// This page describes the main user interface for your application.  
Circsim.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'toolbar middleView bottomView'.w(),
    
    toolbar: Circsim.ToolbarView.design({
      iconUrl: sc_static('images/help'),
      helpDisplayBinding: "Circsim.toolbarDisplayController.helpDisplay",
      displayProperties: ["helpDisplay"],
      tagName: "div",
      layerId: "top-toolbar",
      useStaticLayout: YES      
    }),
    
    middleView: SC.SplitView.design({
      layout: {
        left: 0,
        top: 36,
        right: 0,
        bottom: 32
      },
      canCollapseViews: NO,
      topLeftMinThickness: 250,
      topLeftMaxThickness: 250,
    
      topLeftView: SC.ContainerView.extend({
        layout:{width: 250},
        nowShowingBinding: 'Circsim.sidebarView'
      }),

      dividerView: SC.SplitDividerView.design({
        backgroundColor: '#555',
        layout: {width: 2, top: 0, bottom: 0}
      }),

      bottomRightView: SC.ContainerView.extend({
        nowShowingBinding: 'Circsim.contentController.contentDisplay'
      })

    }),

    bottomView: SC.TemplateView.design({
      templateName: "footer"
    })
  })

});
