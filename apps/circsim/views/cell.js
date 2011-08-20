/*globals Circsim*/

Circsim.CellView = SC.View.extend(SC.ContentDisplay, {
  
  contentDisplayProperties: "value".w(),
  
  render: function(context, f) {
    var content         = this.get('content'),
        isHighlighted   = content.get('isHighlighted'),
        value           = content.get('value'),
        column          = content.get('column').get('header');
      
        
   // Render the html
   context.push('<span class="cell-value">'+value+'</span>');   
  }

});
