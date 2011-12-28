Circsim.modalsPage = SC.Page.design({
  schematicView: SC.PanelPane.design({
    layout: {height: 444, width: 820, centerX: 0, centerY: 0},
    isModal: YES, 
    modalPane: SC.ModalPane.design({
      layout: {top:0, bottom: 0, left: 0, right: 0}, 
      layerId: 'schematic-modal',
      backgroundColor: "black"
    }),
    contentView: SC.View.design({
      childViews: 'schematicImage schematicLabel closeButton'.w(), 
      schematicImage: SC.ImageView.design({
        layout: {left: 0, right: 0, height: 400}, 
        value: sc_static('images/schematic') 
      }),
      schematicLabel: SC.LabelView.design({
        layout: {left: 10, bottom: 11, width: 200, height: 24},
        layerId: 'schematic-label',
        value: "Circsim Schematic"
      }), 
      closeButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 10, height: 24, width: 74},
        icon: sc_static('images/no-change'),
        title: "Close", 
        target: 'Circsim.statechart',
        action: 'toggleSchematic'
      })
    })
  }), 

  helpView: SC.PanelPane.design({
    layout: {height: 168, width: 420, centerX: 0, centerY: 0},
    isModal: YES, 
    modalPane: SC.ModalPane.design({
      layout: {top:0, bottom: 0, left: 0, right: 0}, 
      layerId: 'schematic-modal',
      backgroundColor: "black"
    }),
    contentView: SC.View.design({
      childViews: 'helpInfo helpLabel closeButton'.w(), 
      helpInfo: SC.LabelView.design({
        layout: {top: 44, left: 10, right: 10, height: 204},
        value: 'Each of the procedures in this exercise illustrates an important principle which will help you understand the circulatory system as a closed system with interacting parts. To proceed through the program, watch for instructions on the right of the screen.'
      }),
      helpLabel: SC.LabelView.design({
        layout: {left: 10, top: 11, width: 200, height: 24},
        layerId: 'schematic-label',
        value: "Circsim Help Menu"
      }), 
      closeButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 10, height: 24, width: 74},
        icon: sc_static('images/no-change'),
        title: "Close", 
        target: 'Circsim.statechart',
        action: 'toggleHelp'
      })
    })
  })
})
