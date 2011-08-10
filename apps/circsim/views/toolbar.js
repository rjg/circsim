/*globals Circsim*/

Circsim.toolbarView = SC.TemplateView.design({
    templateName: "toolbar",
    iconUrl: sc_static('images/help'),
    helpDisplayBinding: 'Circsim.toolbarController.helpDisplay',
    
    // TODO: This seems ugly.
    mouseUp: function(evt){      
      var target = evt.target,
          id1    = target.parentElement.id,
          id2    = target.parentElement.parentElement.id,
          ary    = [];
      ary.push(id1);
      ary.push(id2)
      if (ary.contains("help-button")) {
        Circsim.statechart.sendEvent('openHelp');
      }
    }
});
