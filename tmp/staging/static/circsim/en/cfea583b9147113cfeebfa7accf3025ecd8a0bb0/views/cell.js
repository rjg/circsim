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
            value = "<img src="+'/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/no-change.png'+" />";
            break;
          case 1: 
            value = "<img src="+'/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/down.png'+" />";
            break;
          case 2: 
            value = "<img src="+'/static/circsim/en/cfea583b9147113cfeebfa7accf3025ecd8a0bb0/source/resources/images/up.png'+" />";
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
