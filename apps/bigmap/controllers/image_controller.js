// ==========================================================================
// Project:   Db1.inst
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Db1 */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Bigmap.imageC = SC.Controller.create(
/** @scope Db1.inst.prototype */ {

imageName: "/data/bigmap.jpg",
userName: "",
num: 1,
showNumbers: 0,
rows: 6,

//---------------------------------

clearE: function () {
	console.log ("Clear");
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.compX = 0;
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.draw();
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.set('moveStr', "-");
},

//---------------------------------
bigmapE: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/bigmap.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},

//---------------------------------
sigmasE: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/sigmas.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},

//---------------------------------
viewMapE: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/viewMap.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},

//---------------------------------
coverage1E: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/coverage1.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},
//---------------------------------
coverage2E: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/coverage2.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},
//---------------------------------
coverage3E: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/coverage3.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},
//---------------------------------
transE: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/trans.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},

//---------------------------------
reloadE: function () {
	this.clearE();
	this.num++;
	dir = Bigmap.imageC.userName;
	imgStr = "/data/" + dir + "/landmarks.jpg?vers=" + this.num;
	Bigmap.imageC.set ('imageName', imgStr);
   imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
   imgObj.set ('value', imgStr);
},

//---------------------------------
numberE: function () {
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.draw()
},
//---------------------------------
titlesE: function () {
	Bigmap.mainPage.mainPane.displayV.contentView.drawingView.draw()
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
