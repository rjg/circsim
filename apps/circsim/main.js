/*globals Circsim CoreCircsim*/

Circsim.main = function main() {

  // Instantiate views
  Circsim.getPath('mainPage.mainPane').append();

  // Set content of proceduresController
  Circsim.proceduresController.set('content', CoreCircsim.store.find(CoreCircsim.Procedure));

  // Initialize Statechart
  Circsim.statechart.initStatechart();  
  
};

function main() {
  Circsim.main();
}
