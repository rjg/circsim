/*globals Circsim */

sc_require("views/toolbar");
sc_require("views/procedure");

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
      defaultThickness: 250,
      topLeftMaxThickness: 250,
      dividerThickness: 0,
      layoutDirection: SC.LAYOUT_HORIZONTAL,
          
      topLeftView: SC.ContainerView.extend({
        layout:{width: 250},
        nowShowingBinding: 'Circsim.sidebarView'
      }),

      dividerView: SC.View,

      bottomRightView: SC.ContainerView.extend({
        // REDO This!!
        nowShowingBinding: 'Circsim.contentController.contentDisplay'
      })

    }),

    bottomView: SC.TemplateView.design({
      templateName: "footer"
    })
  })

});
