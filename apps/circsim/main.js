/*globals Circsim CoreCircsim*/

Circsim.main = function main() {

  // Instantiate views
  Circsim.getPath('mainPage.mainPane').append();

  // Set content of proceduresController
  Circsim.proceduresController.set('content', CoreCircsim.store.find(CoreCircsim.Procedure));

  // Artificially select of first procedure in proceduresController for time being...
  var procedure = Circsim.proceduresController.get('content').firstObject();
  Circsim.proceduresController.selectObject(procedure);

};

function main() {
  Circsim.main();
}
