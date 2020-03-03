// ==========================================================================
// Project:   Db1.inst
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Db1 */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Landmarks.imageC = SC.Controller.create(
/** @scope Db1.inst.prototype */ {

imageName: "/data/landmarks.jpg",
userName: "",
num: 1,
showNumbers: 0,
rows: 6,
outputStr: "Shift click to set point",
outputBase: "",

//---------------------------------

clearE: function () {
	console.log ("Clear");
	this.set('outputStr', "Shift click to set point");
	this.set('outputBase', "");
	Landmarks.mainPage.mainPane.drawingView.compX = 0;
	Landmarks.mainPage.mainPane.drawingView.draw();
	Landmarks.mainPage.mainPane.drawingView.set('moveStr', "-");
},

//---------------------------------
reloadE: function () {
	this.clearE();
	this.num++;
	dir = Landmarks.imageC.userName;
	imgStr = "/data/" + dir + "/landmarks.jpg?vers=" + this.num;
	Landmarks.imageC.set ('imageName', imgStr);
   imgObj = Landmarks.mainPage.mainPane.imgView ;
   imgObj.set ('value', imgStr);
},

//---------------------------------
numberE: function () {
	Landmarks.mainPage.mainPane.drawingView.draw()
},

//---------------------------------
imageDidLoad: function(imageUrl, imageOrError) {
	console.log ("imageDidLoad");
	return YES;
},

//---------------------------------
changeFrame: function () {
	console.log ("changeFrame");
},

}) ;
