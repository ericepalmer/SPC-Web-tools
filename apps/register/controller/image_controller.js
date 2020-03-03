// ==========================================================================
// Project:   Db1.inst
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Db1 */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Register.imageC = SC.Controller.create(
/** @scope Db1.inst.prototype */ {

imageName: "/data/register.jpg",
userName: "",
num: 1,
showNumbers: 0,
rows: 6,

//---------------------------------
reloadE: function () {
console.log ("reloading");
	this.num++;
	dir = Register.imageC.userName;
	imgStr = "/data/" + dir + "/register.jpg?vers=" + this.num;
	imgObj = Register.mainPage.mainPane.imgView ;
	imgObj.set ('value', imgStr);
	Register.imageC.set ('imageName', imgStr);

	Register.mainPage.mainPane.drawingView.draw()

},

//---------------------------------
numberE: function () {
	Register.mainPage.mainPane.drawingView.draw()
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
