// ==========================================================================
// Project:   Register.scaleController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Register */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Register.scaleController = SC.ObjectController.create(
/** @scope Register.scaleController.prototype */ {

scaleTitle: "",
directory: "/data/",


menu : SC.MenuPane.create({
   items : [
   { title: '', scale: NO},
   { title: 'ep', scale: NO},
   { title: 'jw', scale: NO},
   { title: 'dl', scale: NO},
   { title: 'kd', scale: NO},
   { title: 'tc', scale: NO},
   { title: 'bg', scale: NO},
   { title: 'cj', scale: NO},
   { title: 'u1', scale: NO},
   { title: 'u2', scale: NO},
   { title: 'u3', scale: NO}
   ],
   layout: { left: 0, width:100 },
}),

//---------------------------------
changeScale: function () {
	item = Register.scaleController.menu.selectedItem;
	name = item.title;
	Register.imageC.set ('userName', name);
	console.log (name, name);
	Register.mainPage.mainPane.drawingView.updateDisplay();
	Register.imageC.reloadE();

}.observes ('Register.scaleController.menu.selectedItem'),
//---------------------------------

/*
changeFrame: function () {
	console.log ("bye mom");
}.observes ('Register.scaleController.scaleTitle'),
*/

});
