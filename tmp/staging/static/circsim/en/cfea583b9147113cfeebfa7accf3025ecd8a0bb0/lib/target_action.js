// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

/** @static
  
  This mixin implements the basic target-action handling for a view.
  
  @author Erich Ocean
  @since SproutCore 1.0
*/
SC.TargetAction = {
  
  /**
    The name of the action you want triggered when the button is pressed.  
    
    This property is used in conjunction with the target property to execute
    a method when a regular button is pressed.  These properties are not 
    relevant when the button is used in toggle mode.
    
    If you do not set a target, then pressing a button will cause the
    responder chain to search for a view that implements the action you name
    here.  If you set a target, then the button will try to call the method
    on the target itself.
    
    For legacy support, you can also set the action property to a function.  
    Doing so will cause the function itself to be called when the button is
    clicked.  It is generally better to use the target/action approach and 
    to implement your code in a controller of some type.
    
    @type String
  */
  action: null,
  
  /**
    The target object to invoke the action on when the button is pressed.
    
    If you set this target, the action will be called on the target object
    directly when the button is clicked.  If you leave this property set to
    null, then the button will search the responder chain for a view that 
    implements the action when the button is pressed instead.
    
    @type Object
  */
  target: null,
  
  /**
    Set to YES to send an action on mouseDown:, rather than mouseUp:.
    
    @type Boolean
  */
  actOnMouseDown: NO,
  
  /**
    fakes a click... evt is optional.  
    
    Temporarily highlights the button to show that it is being triggered.  
    Does nothing if the button is disabled. 
    
    @returns {bool} success/failure of the request
  */  
  triggerAction: function(evt) {  
    if (!this.get('isEnabled')) return false;
    this.set('isActive', YES);
    this.performAction(evt);
    this.didTriggerAction();
    this.invokeLater('set', 200, 'isActive', NO);
    return true;
  },
  
  /**
    Perform an action.
  */
  performAction: function(evt) {
    var action = this.get('action');
    var target = this.get('target') || null;
    if (action) {
      this.getPath('pane.rootResponder').sendAction(action, target, this, this.get('pane'));
    }
  },
  
  /**
    This method is called anytime the button's action is triggered.  You can 
    implement this method in your own subclass to perform any cleanup needed 
    after an action is performed.
  */
  didTriggerAction: function() {},
  
  /** @private 
    On mouse down, set active only if enabled.
  */    
  mouseDown: function(evt) {
    if (!this.get('isEnabled')) return YES ; // handled event, but do nothing
    
    this._actsOnMouseDown = !!this.get('actOnMouseDown') ; // cache
    
    if (this._actsOnMouseDown) {
      this.performAction(evt) ;
    } else {
      this.set('isActive', YES) ;
      this._isMouseDown = YES ;
    }
    
    return YES ;
  },
  
  /** @private
    Remove the active class on mouseOut if mouse is down.
  */  
  mouseExited: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    if (this._isMouseDown) this.set('isActive', NO);
    return YES;
  },

  /** @private
    If mouse was down and we renter the button area, set the active state again.
  */  
  mouseEntered: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    this.set('isActive', this._isMouseDown);
    return YES;
  },
  
  /** @private
    ON mouse up, trigger the action only if we are enabled and the mouse was released inside of the view.
  */  
  mouseUp: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    if (this._isMouseDown) this.set('isActive', NO); // track independently in case isEnabled has changed
    this._isMouseDown = false;
    var inside = this.$().within(evt.target) ;
    if (inside && this.get('isEnabled')) this.performAction(evt) ;
    return true ;
  }
  
};
