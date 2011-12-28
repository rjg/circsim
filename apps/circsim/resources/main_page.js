/*globals Circsim */

sc_require("views/toolbar");
sc_require("views/procedure");

// This page describes the main user interface for your application.  
Circsim.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'toolbar middleView bottomView'.w(),
    
    toolbar: SC.ToolbarView.design({
      iconUrl: sc_static('images/help'),
      schematicUrl: sc_static('images/schematic-icon'),
      displayProperties: ["helpDisplay"],
      tagName: "div",
      layerId: "top-toolbar",
      useStaticLayout: YES, 
      childViews: ['logoView', 'schematicButton', 'helpButton'],
      'logoView': SC.LabelView.design({
        useStaticLayout: YES,
        layerId: 'circsim-title',
        value: 'Circsim'
      }), 

      'schematicButton': SC.ButtonView.design({
        layout: {right: 98, top: 5, width:101, height: 24 },
        icon: sc_static('images/schematic-icon'),
        title: 'Schematic',
        target: 'Circsim.statechart', 
        action: 'toggleSchematic'
      }), 

      'helpButton': SC.ButtonView.design({
        layout: {right: 20, top: 5, width: 67, height: 24 },
        icon: sc_static('images/help'),
        title: 'Help',
        target: 'Circsim.statechart', 
        action: 'toggleHelp'
      })
    }),
    
    middleView: SC.SplitView.design({
      layout: {
        left: 0,
        top: 32,
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
