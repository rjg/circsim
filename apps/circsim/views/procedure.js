/*globals Circsim*/

sc_require("views/procedure_messages");
sc_require("views/pv");
sc_require("views/row_view");
sc_require("views/select_view");
sc_require("lib/grid_patch");

Circsim.contentViews.procedureView = SC.View.design({
  layerId: 'procedure',
  layout: { left: 0, top: 0, right: 0, bottom: 0, minWidth: 800},
  childViews: "procedureToolbar procedureContent".w(),  
  procedureToolbar: SC.View.design({    
    layout: {top: 20, right: 10, left: 10, height: 40},
    tagName: "div",
    layerId: "procedure-toolbar",
    childViews: "procedureTitle nextButton".w(),
    procedureTitle: SC.LabelView.design({
      layout: {top: 0, right: 10, left: 10, height: 20, centerY: 0},
      tagName: "h3",
      layerId: "procedure-title",
      valueBinding: "Circsim.procedureController.title"
    }),
    nextButton: SC.ButtonView.design({
      useStaticLayout: YES, 
      layerId: "next-button",
      classNames: 'btn',
      titleBinding: "Circsim.nextPromptController.content",
      target: "Circsim.statechart",
      action: "next",
      render: function(context) {
        var title = this.get('title');
        context.push(title);
      }      
    })
  }),
  
  procedureContent: SC.View.design({
    layout: {top: 60, right: 10, left: 10, bottom: 0},
    tagName: "div",
    layerId: "procedure-content",
    childViews: "pvView predictionTableView messagesView".w(),
    pvView: SC.ContainerView.design({
      nowShowingBinding: "Circsim.pvViewDisplay"
    }),
    
    predictionTableView: SC.View.design({
      layout: {top: 50, left: 0, bottom: 0, width: 470},
      tagName: "div",
      layerId: "prediction-table-view",
      backgroundColor: "white",
      childViews: "gridView headerView rowTitleView".w(),
      
      headerView: Circsim.GridHeaderView.design({
        layout: {right: 0, left: 0, top: 0, height: 50 }
      }),
      
      rowTitleView: Circsim.RowView.design({
        layout: {left: 0, width: 90, top: 50, bottom: 0}
      }),
      
      gridView: SC.GridView.design({
        layout: {right: 4, top: 50, left: 68},
        insertionOrientation: SC.VERTICAL_ORIENTATION,
        columnWidth:120,
        rowHeight: 50,
        contentBinding: "Circsim.cellsController.allCells",           
        target: "Circsim.statechart",
        action: "clickedOnCell",
        actOnSelect: YES,
        exampleView: Circsim.CellView.design({
          classNames: "cell"
        })
      })
    }),
    
    messagesView: SC.View.design({
      layout: {top: 0, left: 480, bottom: 0, right: 0},
      childViews: "messageTitle messageBody".w(),
      tagName: "div",
      layerId: "messages-view",
      backgroundColor: "#FBFBFB",
    
      messageTitle: SC.LabelView.design({        
        layout: {top: 10, left: 20, height: 20, right: 20},
        valueBinding: "Circsim.messageController.title",
        layerId: 'messages-title',
        backgroundColorBinding: 'Circsim.messageController.titleColor'
      }),
      
      messageBody: SC.LabelView.design({
        layout: {top: 40, left: 20, height: 392, right: 20},
        valueBinding: "Circsim.messageController.content",
        layerId: 'messages-body',
        backgroundColorBinding: 'Circsim.messageController.color'
        
      })
    })
  })
});
