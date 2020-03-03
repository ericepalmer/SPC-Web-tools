// ==========================================================================
// Project:   Bigmap.mapletsController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/

mapletString = 'None selected'

Bigmap.mapletsController = SC.ArrayController.create(
/** @scope Bigmap.mapletsController.prototype */ {

  // TODO: Add your own code here.
//---------------------------------
clickedE: function(evt) { 
	the=evt;
   group = the.selection;
	first = group.firstObject();
	console.log ("Click");
	if (! first) return;
	//console.log (first.toString());
	maplet=first.get ('title');
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.draw();
	res = first.get ('res');
	if (res > .0001) res = Math.round (res*1000*100)/1000.0/100.0;
	if (res > .01) res = Math.round (res*1000)/1000.0;
	if (res > 1) res = Math.round (res*10)/10.0;
	if (res > 100) res = Math.round (res);
	vect = first.get ('vect');
	if (vect > 1) vect = Math.round (vect*10000)/10000.0;
	if (vect > 10) vect = Math.round (vect*1000)/1000.0;
	if (vect > 100) vect = Math.round (vect*100)/100.0;
	if (vect > 1000) vect = Math.round (vect*10)/10.0;

	str = first.get('title') + ' ' +
			//first.get ('minX') + ' ' +
			res + 'm ' +
			'Q:' + first.get ('Q') + ' ' +
			'V:' + vect + 'm ' ;
	console.log (str);
	this.set('mapletString', str);
},

//---------------------------------
selectedE: function(evt) { 
	console.log ("selected");
console.log(evt);
}.observes ('Bigmap.mapletsController.menu.selectedItem'),

//---------------------------------
searchE: function () {
   console.log ("Search");

	newList = [];
	maplets.forEach (function (item) {
		minX = item.get ('minX');
		maxX = item.get ('maxX');
		minY = item.get ('minY');
		maxY = item.get ('maxY');

		inside = true;
		if (tx < minX) inside = false;
		if (tx > maxX) inside = false;
		if (ty < minY) inside = false;
		if (ty > maxY) inside = false;

		if (inside) {
			//console.log (item.get ('title'));
			newList.push (item);
		}
		else 
			;//console.log ('fail');
	})

	Bigmap.mapletsController.set ('content', newList);

},




});
