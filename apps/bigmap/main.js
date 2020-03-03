// ==========================================================================
// Project:   Bigmap
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Bigmap.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Bigmap.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Bigmap.contactsController.set('content',Bigmap.contacts);

} ;

/*
Bigmap.scaleController.scaleMenu.addObserver("selectedItem", function() {
   startVal = Bigmap.scaleController.scaleTitle;
   Bigmap.scaleController.set('instrument',  startVal);
});
*/

def = Bigmap.store.find(Bigmap.QUERY_DEF);
points = Bigmap.store.find(Bigmap.QUERY_POINT);
maplets = Bigmap.store.find(Bigmap.QUERY);
//maplets = Bigmap.fstore.find(Bigmap.Maplet);
Bigmap.mapletsController.set ('content', maplets);
Bigmap.featuresController.set ('content', points);
first = 0;
group = 0;
mapMin = 0;
mapMax = 32;
mapKeyword = "footprints"


function main() { 

	Bigmap.main(); 
};
function myRound(value) {
	
	newVal = value;
   if (value > .0001) newVal = Math.round (value*1000*1000)/1000.0/1000.0;
   if (value > .001) newVal = Math.round (value*1000*100)/1000.0/100.0;
   if (value > .01) newVal = Math.round (value*1000*10)/1000.0/10.0;
   if (value > .1) newVal = Math.round (value*1000)/1000.0;
   if (value > 1) newVal = Math.round (value*100)/100.0;
   if (value > 100) newVal = Math.round (value*10)/10.0;
   if (value > 1000) newVal = Math.round (value);
	return newVal;

};
