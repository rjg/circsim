/**
 * @class
 * SproutCore's Ace theme.
 */
SC.CorePhysioTheme = SC.BaseTheme.create({
  name: "corephysio",
  description: "An attempt at a custom theme"
});

// register the theme with SproutCore
SC.Theme.addTheme(SC.CorePhysioTheme);

// SC.ButtonView variants
SC.CorePhysioTheme.PointLeft = SC.CorePhysioTheme.subtheme("point-left", "point-left");
SC.CorePhysioTheme.PointRight = SC.CorePhysioTheme.subtheme("point-right", "point-right");
SC.CorePhysioTheme.Capsule = SC.CorePhysioTheme.subtheme("capsule", "capsule");

