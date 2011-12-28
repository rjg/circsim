/*globals Circsim CoreCircsim*/

Circsim.statechart = SC.Statechart.create({
  trace: YES,
  rootState: SC.State.design({
    substatesAreConcurrent: YES, 

    modalStates: SC.State.plugin('Circsim.modalStates'), 

    mainStates: SC.State.plugin('Circsim.mainStates') 

  })
});
