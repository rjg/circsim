// ==========================================================================
// Project:   Circsim - mainPage
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Circsim */

// This page describes the main user interface for your application.  
Circsim.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'topView middleView bottomView'.w(),
    
    // Top View
    topView: SC.ToolbarView.design({
      layout: {
        top: 0,
        left: 0,
        right: 0,
        height: 36
      },
      anchorLocation: SC.ANCHOR_TOP,
      childViews: 'logoView labelView helpButton'.w(),

      logoView: SC.View.design({
        layout:{
          centerY: 0,
          height: 24,
          left: 9,
          width: 24
        },
        backgroundColor: "#444"
      }),

      labelView: SC.LabelView.design({
        layout: {
          centerY: 0,
          height: 24,
          left: 40,
          width: 330
        },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value: 'Circsim'
      }),

      helpButton: SC.ButtonView.design({
        layout: {
          centerY: 0,
          height: 24,
          right: 8,
          width: 70
        },
        title: "Help",
        icon: sc_static('images/help.png')
      })
    }),
    
    // Middle View
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
    
      topLeftView: SC.View.design({
        layout: {width: 250},
        childViews: 'procedureLabelView procedureListView'.w(),        
        procedureLabelView: SC.LabelView.design({
          layout: {
            top: 8,
            bottom: 8,
            left: 8,
            right: 0,
            height: 16
          },
          fontWeight: SC.BOLD_WEIGHT,
          value: 'Procedures:'
        }),
        
        procedureListView: SC.ScrollView.design({
          hasHorizontalScroller: NO,
          layout: {
            top: 32,
            bottom: 0,
            left: 0,
            right: 0
          },
          backgroundColor: 'white',
          //Here is the original list view, which is bound to the tasksController
          contentView: SC.ListView.design({
            contentBinding: 'Circsim.proceduresController.arrangedObjects',
            selectionBinding: 'Circsim.proceduresController.selection',
            contentValueKey: 'title',
            rowHeight: 42,
            canDeleteContent: NO
          })
        })  

      }),

      dividerView: SC.SplitDividerView.design({    
        backgroundColor: '#555',
        layout: {width: 2, top: 0, bottom: 0}
      }),

      bottomRightView: SC.ContainerView.extend({
        
      })

    }),

    // Bottom View
    bottomView: SC.ToolbarView.design({
      layout: {
        bottom: 0,
        left: 0,
        right: 0,
        height: 32
      },      
      anchorLocation: SC.ANCHOR_BOTTOM,
      childViews: 'copyrightView'.w(),
      copyrightView: SC.LabelView.design({
        layout: {right: 10, centerY: 0, height: 16, width: 130},
        value: '© 2011 Rush University'        
      })
    })
  })

});
