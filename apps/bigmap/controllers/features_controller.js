// ==========================================================================
// Project:   Bigmap.featuresController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Bigmap.featuresController = SC.ArrayController.create(
/** @scope Bigmap.featuresController.prototype */ {

  // TODO: Add your own code here.

//---------------------------------
clickedE: function(evt) { 
	the=evt;
   group = the.selection;
	first = group.firstObject();
	console.log ("Click", first);
	if (! first) return;
	//console.log (first.toString());
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.draw();
},

//---------------------------------
selectedE: function(evt) { 
	console.log ("selected");
console.log(evt);
}.observes ('Bigmap.mapletsController.menu.selectedItem'),


});
