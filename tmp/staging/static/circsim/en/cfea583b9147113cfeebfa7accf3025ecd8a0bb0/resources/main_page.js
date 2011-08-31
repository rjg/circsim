/*globals Circsim */

sc_require("views/toolbar");
sc_require("views/procedure");

// This page describes the main user interface for your application.  
Circsim.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'toolbar middleView bottomView'.w(),
    
    toolbar: Circsim.ToolbarView.design({
      iconUrl: '/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/help.png',
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
        nowShowingBinding: 'Circsim.sidebarView',
        layerId: "procedure-selection"
      }),

      dividerView: SC.View,

      bottomRightView: SC.ContainerView.design({
        layerId: "content",
        nowShowingBinding: 'Circsim.contentController.contentDisplay'        
      })
    }),

    bottomView: SC.TemplateView.design({
      templateName: "footer"
    })
  })

});
