/*globals Circsim*/

Circsim.CellView = SC.View.extend(SC.ContentDisplay, {
  contentDisplayProperties: "value isHighlighted isEnabled displayCorrectAnswer highlightRECorrect highlightREIncorrect".w(),
  
  render: function(context, f) {
    var content              = this.get('content'),
        value                = content.get('value'),
        column               = content.get('column').get('header'),
        isEnabled            = content.get('isEnabled'),
        isHighlighted        = content.get('isHighlighted'),
        correctAnswer        = content.get('correctAnswer'),
        displayCorrectAnswer = content.get('displayCorrectAnswer'),
        highlightRECorrect   = content.get('highlightRECorrect'),
        highlightREIncorrect = content.get('highlightREIncorrect');

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
    
    // Sets correct answer display
    switch (correctAnswer) {
      case 0: 
        correctAnswer = "0";
        break;
      case 1: 
        correctAnswer = "<img src="+sc_static("down")+" />";
        break;
      case 2: 
        correctAnswer = "<img src="+sc_static("up")+" />";
        break;
      default:
        correctAnswer = "";
        break;
    }        
    
    if (correctAnswer) {
      // Sets background color of cell.
      var enabled     = isEnabled;
      var disabled    = !isEnabled; 
      var correctHighlighting = false;
      var incorrectHighlighting = false;
      var correctHighlight = false;
      var incorrectHighlight = false;          

      // This is messy, but I basically am just saying "Add color if displayCorrectAnswer is true"
      if (displayCorrectAnswer){
        if (correctAnswer == value) {
          if (isHighlighted) {
            correctHighlight = true;
          }else {
            correctHighlighting = true;
          }            
        } else {
          if (isHighlighted) {
            incorrectHighlight = true;
          }else {
            incorrectHighlighting = true;
          }
        }            
      }
      
      var classes  = { 'enabled': enabled, 'disabled': disabled, 'correctomundo': correctHighlighting, 'wrongo': incorrectHighlighting, 'correctHighlight': correctHighlight, 'incorrectHighlight': incorrectHighlight};
      
      // Render the html   
      context.setClass(classes);       
      context.push('<span class="cell-value-student">'+value+'</span>');   
      context.push('<span class="cell-value-correct">'+correctAnswer+'</span>');   
    } else {
      // Sets background color of cell.
      enabled     = isEnabled;
      disabled    = !isEnabled;

      // Do RE Highlighting
      highlightRECorrect = highlightRECorrect;
      highlightREIncorrect = highlightREIncorrect;

      classes  = { 'enabled': enabled, 'disabled': disabled, 'highlightRECorrect': highlightRECorrect, 'highlightREIncorrect': highlightREIncorrect};
      
      // Render the html
      context.setClass(classes);
      context.push('<span class="cell-value">'+value+'</span>');   
    }
  }
});
