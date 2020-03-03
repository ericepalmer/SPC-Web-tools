// ==========================================================================
// Project:   Landmarks.scaleController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Landmarks */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Landmarks.scaleController = SC.ObjectController.create(
/** @scope Landmarks.scaleController.prototype */ {

scaleTitle: "49",
directory: "/data/",


menu : SC.MenuPane.create({
   items : [
   { title: '49', scale: YES, isChecked: YES},
   { title: '34', scale: YES},
   { title: '24', scale: YES},
   { title: '19', scale: YES},
   { title: '14', scale: YES},
   { title: '12', scale: YES},
   { title: '9', scale: YES},
   { title: '----', scale: NO},
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
	item = Landmarks.scaleController.menu.selectedItem;
	name = item.title;
	if (item.scale) {
		this.set ('scaleTitle', name);
	}
	else
		Landmarks.imageC.set ('userName', name);
	console.log (name, name);
	Landmarks.mainPage.mainPane.drawingView.updateDisplay();
	Landmarks.imageC.reloadE();

}.observes ('Landmarks.scaleController.menu.selectedItem'),
//---------------------------------

/*
changeFrame: function () {
	console.log ("bye mom");
}.observes ('Landmarks.scaleController.scaleTitle'),
*/

});
