/*globals Circsim */
Circsim.SelectView = SC.View.extend({

  tagName: "select",
  value: null,

  render: function(context){
    var items = Circsim.procedureController.get('rows');
    items.forEach(function(item) {
      context.push('<option value="'+item+'">'+item+'</option>');
    });
  }
});
