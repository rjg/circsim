/*globals Circsim*/

Circsim.CellView = SC.View.extend(SC.ContentDisplay, {
  
  contentDisplayProperties: "value isHighlighted isEnabled".w(),
  
  render: function(context, f) {
    var content          = this.get('content'),
        value            = content.get('value'),
        column           = content.get('column').get('header'),
        isEnabled        = content.get('isEnabled'),
        isHighlighted    = content.get('isHighlighted');
        
        
        // Sets background color of cell.
        var enabled     = isEnabled;
        var disabled    = !isEnabled && !isHighlighted;
        var highlighted = !isEnabled && isHighlighted;
        var classes  = { 'enabled': enabled, 'disabled': disabled, 'highlighted': highlighted};
        
        // Sets value of cell.
        switch (value) {
          case 0: 
            value = "0";
            break;
          case 1: 
            value = "<img src="+sc_static("down")+" />";
            break;
          case 2: 
            value = "<img src="+sc_static("up")+" />";
            break;
          default:
            value = "";
            break;
        }
      
        
    // Render the html
    context.setClass(classes);
    context.push('<span class="cell-value">'+value+'</span>');   
  }

});
