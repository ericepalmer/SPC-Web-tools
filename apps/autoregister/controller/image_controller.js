// ==========================================================================
// Project:   Db1.inst
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Db1 */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Autoregister.imageC = SC.Controller.create(
/** @scope Db1.inst.prototype */ {

imageName: "/data/autoregister.jpg",
num: 1,
showNumbers: 0,
//rows: 6,

//---------------------------------
reloadE: function () {
console.log ("reloading");
	this.num++;
	imgStr = "/data/" + "autoregister.jpg?vers=" + this.num;
	imgObj = Autoregister.mainPage.mainPane.imgScrollV.contentView.mainImgView ;

	imgObj.set ('value', imgStr);
	Autoregister.imageC.set ('imageName', imgStr);

	//Autoregister.mainPage.mainPane.imgScrollV.contentView.drawingView.draw()

},

//---------------------------------
numberE: function () {
	Autoregister.mainPage.mainPane.imgScrollV.contentView.drawingView.draw()
},

//---------------------------------
didLoad: function(image) {
	console.log ("didLoad-control");
	return YES;
},
//---------------------------------
imageDidLoad: function(imageUrl, imageOrError) {
	console.log ("imageDidLoad");
	return YES;
},
//---------------------------------
imageLoad: function(image) {
	console.log ("imageLoad");
	return YES;
},

//---------------------------------
changeFrame: function () {
	console.log ("changeFrame");
},

}) ;
