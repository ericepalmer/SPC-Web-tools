// ==========================================================================
// Project:   Bigmap.scaleController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Bigmap.scaleController = SC.ObjectController.create(
/** @scope Bigmap.scaleController.prototype */ {

whichMap: "showmap.jpg",
featureTitle: "Footprints",

menu : SC.MenuPane.create({
   items : [
   { title: 'Footprints', isChecked: YES},
   { title: 'Num images'},
   { title: 'Num overlaps'},
   { title: 'Num limbs'},
   { title: 'Uncertainty'},
   { title: 'Residual'},
   { title: 'Resolution'},
   { title: 'Radius'},
   ],
   layout: { left: 0, width:100 },
}),


//---------------------------------
changeScale: function () {
console.log();
	item = Bigmap.scaleController.menu.selectedItem;
	name = item.title;
	this.set ('featureTitle', name);

   which = Bigmap.scaleController.featureTitle;
   mapKeyword = "footprints";
   if (which == "Num images") mapKeyword = "images";
   if (which == "Num overlaps") mapKeyword = "overlaps";
   if (which == "Num limbs") mapKeyword = "limbs";
   if (which == "Uncertainty") mapKeyword = "uncert";
   if (which == "Residual") mapKeyword = "residuals";
   if (which == "Resolution") mapKeyword = "res";
   if (which == "Radius") mapKeyword = "vect";

	mapMax = 0;
	mapMin = 9999999;
   maplets.forEach (function (item) {
		skip = false;
		num = Number(item.get (mapKeyword));
		if (num == null) skip = true;
		if ((mapKeyword == "vect") && (num == 0)) skip = true;
		if (! skip) {
			if (num < mapMin) mapMin = num;
			if (num > mapMax) mapMax = num;
		}//if
	})//foreach

	console.log (name, mapMin, mapMax);
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.updateDisplay();
	//Bigmap.imageC.reloadE();

}.observes ('Bigmap.scaleController.menu.selectedItem'),

});
