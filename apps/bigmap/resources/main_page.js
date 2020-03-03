// ==========================================================================
// Project:   Bigmap - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Bigmap */




Bigmap.CanvasView = SC.View.extend({

  classNames: ['landmark-canvas-view'],

  tagName: 'canvas',
	downX: 0,
	downY: 0,
	holdX: 0,
	holdY: 0,
	compX: 0,		// Big yellow dot
	compY: 0,
	compClickX: 0,	// used for small dot
	compClickY: 0,
	startX: 0,
	startY: 0,
	endX: 0,
	endY: 0,
	dx: 0,
	dy: 0,
	dragging: 0,
	currCol: 6,
	moveStr: "Version 0.5, Sep 2015",
	mapWidth: 100,

init: function () {
   console.log ("init");
   sc_super() ;
	//offsetX = 10;
	//offsetY = 50;
	offsetX = 0;
	offsetY = 0;
},

//----------------------------------
  // Override this to draw on the canvas.
draw: function(context, height, width) {
	holdContext.clearRect(0.0, 0.0, 4000, 8000);


	scale = 1; // Needed for normal lithos and register

	// Draw the position tracking dot
	//lowX = (this.holdX-offsetX) % scale;
	//lowY = (this.holdY-offsetY) % scale;

	lowX = (this.holdX-offsetX) ;
	lowY = (this.holdY-offsetY) ;
	tx = Math.floor(lowX);
	ty = Math.floor(lowY);
	this.set ('xyStr',  tx + " / " + ty) ;

	holdContext.fillStyle = 'red';			// draw dot
	holdContext.fillRect(lowX+offsetX-2, lowY+offsetY-2, 4, 4);

	//group = Bigmap.mapletsController.selection();
	if (group) {
		holdContext.strokeStyle = 'lime';			// footprint
		holdContext.lineWidth = 4;
		group.forEach (function (item) {
			minX = item.get ('minX');
			maxX = item.get ('maxX');
			minY = item.get ('minY');
			maxY = item.get ('maxY');
			dx = maxX - minX;
			dy = maxY - minY;
			holdContext.strokeRect(offsetX + minX, offsetY + minY, dx, dy);
		})//foreach
	}//ifgroup

	if (points) {
		holdContext.strokeStyle = 'blue';			// footprint
		holdContext.lineWidth = 4;
		holdContext.fillStyle = 'yellow';		// template
		holdContext.font="30px Verdana";

		points.forEach (function (item) {
			use = item.get ('useMe');
			color = item.get ('color');
			if (color) {
				holdContext.strokeStyle = color;			// footprint
				holdContext.fillStyle = color;			// footprint
			}
			else {
				holdContext.strokeStyle = 'blue';			// footprint
				holdContext.fillStyle = 'blue';			// footprint
			}
			if (use) {
				minX = item.get ('minX');
				maxX = item.get ('maxX');
				minY = item.get ('minY');
				maxY = item.get ('maxY');
				dx = maxX - minX;
				dy = maxY - minY;
				holdContext.strokeRect(offsetX + minX, offsetY + minY, dx, dy);
				name = item.get ('name');
				holdContext.fillText (name, maxX, minY);
			}//ifuse
		})//foreach
	}//ifgroup


	//use = Bigmap.mainPage.mainPane.nameB.value;
	str = "#888888";
	//if (use) {
	//maplets.forEach (function (item) {
	if (mapKeyword != "footprints") {
	currList = Bigmap.mapletsController.get('content');
	currList.forEach (function (item) {
		minX = item.get ('minX');
		maxX = item.get ('maxX');
		minY = item.get ('minY');
		maxY = item.get ('maxY');

		num = item.get (mapKeyword);
		adjusted = (num - mapMin) / mapMax;
		val = Math.floor (adjusted*255);
     	str = "rgb(255, " + val + ", 0)";			// shades of yellow/orange
     	holdContext.fillStyle = str;
			
		if (mapKeyword == "images"){
			if (num == 0) 
      			holdContext.fillStyle = "#888888";
			else if (num < 16) {
				val = Math.floor ((16-num) /16.0*255);
     			str = "rgb(" + val + ", 0, 0)";			// shades of red
     			holdContext.fillStyle = str;
			}
			else if (num < 128) {
				val = Math.floor ((128-num) /128.0*255);
			val2 = Math.floor (val/2.0);
     			str =  "rgb(" + val + "," +  val2 + " , 0)";			// shades of orange
     			holdContext.fillStyle = str;
			} else if (num > 100)
      			holdContext.fillStyle = "rgb(0, 0, 255)";
			if (num == null) holdContext.fillStyle = "#888888";
		}//ifmapkeyword
		avgX = (maxX - minX )/2.0 + minX;
		avgY = (maxY - minY )/2.0 + minY;
		holdContext.fillRect(avgX, avgY, 8, 8);
		})
	}//if

	// Draw dragging
	if (this.endX)  {
		dx = this.endX - this.startX;
		dy = this.endY - this.startY;
		// Draw the box
		//holdContext.strokeStyle = 'white';
		//holdContext.strokeRect(this.startX, this.startY, dx, dy);

		// Draw movement
		holdContext.lineWidth = 2;
		holdContext.strokeStyle = 'lime';		
		holdContext.beginPath()
		holdContext.moveTo(this.startX, this.startY);
		holdContext.lineTo(this.startX + dx , this.startY + dy );
		holdContext.stroke()
	}//if drag

	// Diplay the circle for meta comp
	if (this.compX) {		
		holdContext.beginPath()
		holdContext.fillStyle = 'yellow';			
		if (this.compClickX)								// small dot
			holdContext.fillRect(this.compClickX-2, this.compClickY-2, 4, 4);
		holdContext.fillRect(this.compX-2, this.compY-2, 4, 4);	// main dot
		holdContext.strokeStyle = 'yellow';			// large circle
		holdContext.arc(this.compX, this.compY, 7, 0, 2 * Math.PI, false);
		holdContext.arc(this.compX, this.compY, 8, 0, 2 * Math.PI, false);
		holdContext.stroke()
	}//if compX

},

//----------------------------------
mouseDragged: function(evt) {

	// skip if meta comp is active
	if (this.compX) return YES;

	this.dragging = 1;
   newX = evt.originalEvent.layerX;
   newY = evt.originalEvent.layerY;
	this.endX = newX;
	this.endY = newY;
   dx = this.startX - newX;
   dy = this.startY - newY;
   if ((dx*dx) + (dy*dy) < 4) return YES;   // skip if small

   this.dx = dx;
   this.dy = dy;
	w = this.mapWidth;
	col = Math.floor ((this.startX-offsetX)/w);
	row = Math.floor ((this.startY-offsetY)/w/2.0);
	var picture = (col+1) + row*this.currCol;

	dist = Math.sqrt (dx*dx + dy*dy);
	res = def.firstObject().get('res');
	length = dist * res;
	if (length > .1) str = myRound (length) + 'km';
	else if (length > .001) str = myRound (length*1000) + 'm'
	else if (length > .00001 ) str = myRound (length * 1000 * 100) + 'cm';
	else str = myRound (length * 1000 * 1000) + 'mm';
	//this.set ('moveStr', Math.round(dx) + "		" + Math.round(dy));
	Bigmap.mapletsController.set ('moveStr', Math.round(dist) + ' pix ' + str);
   this.draw(holdContext, this.sourceHeight, this.sourceWidth);
	return YES;
},

//----------------------------------
  // The original height that the draw commands are based on.
  sourceHeight: 0,

  // The original width that the draw commands are based on.
  sourceWidth: 0,

//----------------------------------
render: function(context, firstTime) {
    var layout = this.get('layout'),
      height, width,
      sourceHeight, sourceWidth;

    // Always draw at the end of the run loop.
    this.invokeLast(function() {
      var canvas = this.get('layer'),
        context,
        frame = this.get('borderFrame'),
        resolution = 1.0;

      if (!canvas) {
        SC.error('No canvas available!');
        return;
      }

      // The display size.
      height = frame.height;
      width = frame.width;

      // Support retina displays.
      if (window.devicePixelRatio) { resolution = window.devicePixelRatio; }
      canvas.width = width * resolution;
      canvas.height = height * resolution;

      // The original canvas size.
      sourceHeight = this.get('sourceHeight') || height,
      sourceWidth = this.get('sourceWidth') || width,

      context = canvas.getContext("2d");
		context.fillStyle = 'red';
		context.strokeStyle = 'white';
		holdContext = context;

      context.save();
		context.fillStyle = 'red';
      context.scale(resolution * (width / sourceWidth), resolution * (height / sourceHeight));
      context.clearRect(0.0, 0.0, width, height);
      this.draw(context, sourceHeight, sourceWidth);
      context.restore();
    });
  },
//----------------------------------
mouseDown: function(evt) {
	this.becomeFirstResponder();		// eep

	this.dragging = 0;
   x = evt.originalEvent.layerX;
   y = evt.originalEvent.layerY;
	this.startX = x;
	this.startY = y;
	this.downX = x;
	this.downY = y;
	this.compClickX = 0;
	this.compClickY = 0;
},//mousedown

//---------------------------
updateDisplay: function() {
	//w = Bigmap.scaleController.scaleTitle;
	//this.set ('mapWidth', w*2+2);
	//console.log ("updateDisplay", this.mapWidth);
   this.draw(holdContext, this.sourceHeight, this.sourceWidth);
},//updatedisplay

//---------------------------
keyDown: function(evt) {
	//console.log (evt.which);
	var refresh = false;
	if (evt.which == 114) refresh = true;
	if (evt.which == 82) refresh = true;
	if (evt.which == 32) refresh = true;
	if (refresh) Bigmap.imageC.reloadE();
	return refresh;
 },

//---------------------------
mouseUp: function(evt) {

	// Get click location
	x = evt.originalEvent.layerX;
	y = evt.originalEvent.layerY;
	w = this.mapWidth;


	// Do meta comp stuff
	if (this.compX) {
		// Get picture
		col = Math.floor ((x-offsetX)/w);
		row = Math.floor ((y-offsetY)/w/2.0);
		this.compClickX = x;
		this.compClickY = y;
		var picture = (col+1) + row*this.currCol;
		// Get base position
		baseX = (x-offsetX) % scale;
		baseY = (y-offsetY) % scale;
		tx = Math.floor(baseX);
		ty = Math.floor(baseY);

   	dx = tx - this.compCol;
   	dy = ty - this.compRow;

		holdStr = Bigmap.imageC.get ('outputBase');
		Bigmap.imageC.set ('outputBase', holdStr+'\n'+picture +'\n'+dx+' '+dy);
		holdStr = Bigmap.imageC.get ('outputBase');
		Bigmap.imageC.set ('outputStr', '1\n1' + holdStr + '\n0\n');
   	this.draw(holdContext, this.sourceHeight, this.sourceWidth);
		return YES;
	}// compX

	// clear dragging
	if (! this.dragging) {
		this.holdX = this.downX;
		this.holdY = this.downY;
		this.startX = 0;
		this.startY = 0;
		this.endX = 0;
		this.endY = 0;
	}//if
	this.dragging = 0;

	// Set the meta comparison stuff
	if (evt.shiftKey) {
		this.compX = x;
		this.compY = y;
		baseX = (x-offsetX);
		baseY = (y-offsetY);
		this.compCol = Math.floor(baseX);
		this.compRow = Math.floor(baseY);
   	//this.draw(holdContext, this.sourceHeight, this.sourceWidth);
		Bigmap.mapletsController.set ('moveStr', 'Click \"Clear\" to end');
	}// if shift


   this.draw(holdContext, this.sourceHeight, this.sourceWidth);

   return YES; // handled!

},//mouseup

});

// This page describes the main user interface for your application.
Bigmap.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: ['imgView', 'howFarView', 'xyView', 'labelView', 'displayV', 'drawingView', 'imgName', 'scaleM', 'mapletV', 'bigmapB', 'sigmasB', 'viewMapB', 'coverage1B', 'coverage2B', 'coverage3B', 'transB', 'searchB', 'numberB', 'featureL'],

	// do I really need this?
    labelView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { centerX: 0, centerY: 0, width: 300, height: 24 },
      tagName: "h1",
      value: "",
    }),

	// Button that triggers reloading the background image
  	reloadB: SC.ButtonView.design({
    	layout: { top: 2, left: 10, width: 80, height: 44 },
    	title: "Reload",
		controlSize:  SC.JUMBO_CONTROL_SIZE,
    	target: "Bigmap.imageC",
    	action: "reloadE",
  	}),

	// Buttons for different bigmap views
  	bigmapB: SC.ButtonView.design({
    	layout: { top: 2, left: 100, width: 80, height: 24 },
    	title: "Bigmap",
    	target: "Bigmap.imageC",
    	action: "bigmapE",
  	}),
  	sigmasB: SC.ButtonView.design({
    	layout: { top: 2, left: 200, width: 80, height: 24 },
    	title: "Sigmas",
    	target: "Bigmap.imageC",
    	action: "sigmasE",
  	}),
  	viewMapB: SC.ButtonView.design({
    	layout: { top: 2, left: 300, width: 80, height: 24 },
    	title: "View Map",
    	target: "Bigmap.imageC",
    	action: "viewMapE",
  	}),
  	coverage1B: SC.ButtonView.design({
    	layout: { top: 2, left: 400, width: 49, height: 24 },
    	title: "Cov1",
    	target: "Bigmap.imageC",
    	action: "coverage1E",
  	}),
  	coverage2B: SC.ButtonView.design({
    	layout: { top: 2, left: 450, width: 49, height: 24 },
    	title: "Cov2",
    	target: "Bigmap.imageC",
    	action: "coverage2E",
  	}),
  	coverage3B: SC.ButtonView.design({
    	layout: { top: 2, left: 500, width: 49, height: 24 },
    	title: "Cov3",
    	target: "Bigmap.imageC",
    	action: "coverage3E",
  	}),
  	transB: SC.ButtonView.design({
    	layout: { top: 2, left: 550, width: 80, height: 24 },
    	title: "Trans",
    	target: "Bigmap.imageC",
    	action: "transE",
  	}),
  	searchB: SC.ButtonView.design({
    	layout: { top: 2, right: 10, width: 80, height: 24 },
    	title: "Search",
    	target: "Bigmap.mapletsController",
    	action: "searchE",
  	}),


	// Displays the actual image's name
	imgName: SC.LabelView.design({
    	layout: { top: 10, left: 720, width: 180, height: 24 },
      valueBinding: "Bigmap.scaleController.whichMap",
    }),

	// Gives the list of maplets
	mapletV: SC.ScrollView.design({
      layout: { top: 50, right: 0, width: 150, height: 400 },
         contentView:  SC.ListView.design({
            //rowHeight: 91,
            backgroundColor: "lightgrey",
            contentBinding: 'Bigmap.mapletsController.arrangedObjects',
            selectionBinding: 'Bigmap.mapletsController.selection',
            contentValueKey: 'title',
            target: "Bigmap.mapletsController",
      		selectOnMouseDown: YES,
            action: "clickedE",
				actOnSelect: YES,
         }),//content
    }),//mapletv

	// Gives the list of features
	featureL: SC.ScrollView.design({
      layout: { top: 460, right: 0, width: 150, bottom: 0 },
         contentView:  SC.ListView.design({
            //rowHeight: 91,
            backgroundColor: "lightgrey",
            contentBinding: 'Bigmap.featuresController.arrangedObjects',
            selectionBinding: 'Bigmap.featuresController.selection',
            contentValueKey: 'name',
				contentCheckboxKey: 'useMe',
            target: "Bigmap.featuresController",
      		selectOnMouseDown: YES,
            action: "clickedE",
				actOnSelect: YES,
         }),//content
    }),//mapletv

	// Displays the x/y position of the mouse click within a single maplet
	xyView: SC.LabelView.design({
      layout: { top: 25, left: 100, width: 100, height: 24 },
      valueBinding: "Bigmap.mainPage.mainPane.displayV.contentView.drawingView.xyStr",
    }),

	// Middle text in the title bar.  Tells how far for a single image
	howFarView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { top: 25, left: 200, width: 300, height: 24 },
      valueBinding: "Bigmap.mapletsController.moveStr",
      //valueBinding: "Bigmap.mapletsController.mapletString",
		backgroundColor: "White",
    }),

	// Checkbox for toggling on/off the display of numbers
  	nameB: SC.CheckboxView.design({
      layout: { top: 26, left: 500, width: 50, height: 24 },
    	title: "Titles",
    	//target: "Bigmap.imageC",
    	//action: "titlesE",
  	}),
	// Checkbox for toggling on/off the display of numbers
  	numberB: SC.CheckboxView.design({
      layout: { top: 26, left: 580, width: 50, height: 24 },
    	title: "Num Img",
    	//target: "Bigmap.imageC",
    	//action: "numberE",
  	}),

	// Popup menu to select scale and which user's subdirectory
  	scaleM: SC.PopupButtonView.design({
    	layout: { top: 28, right: 10, width: 80, height: 24 },
    	titleBinding: "Bigmap.scaleController.featureTitle",
    	menuBinding:  "Bigmap.scaleController.menu"
  	}),

	// Text -- long list of things to move copy/paste
  	outputT: SC.TextFieldView.design({
    	layout: { top: 24, right: 5, width: 100, bottom: 5 },
		valueBinding: "Bigmap.imageC.outputStr",
      isTextArea: true,
		backgroundColor: "White",
  	}),

	// Displays the image as a background layer	
	displayV: SC.ScrollView.design ({
		layout: {left: 0, top: 50, right: 150, bottom: 0 },
    	contentView: SC.View.design({
			layout: {left: 0, top: 50, height: 2001, width: 2001 },
			childViews: 'imageV drawingView '.w(),

    	imageV: SC.ImageView.design({
			backgroundColor: "White",
      	valueBinding: "Bigmap.scaleController.whichMap",
    //  	value: "/data/bigmap.jpg",
	
      		didLoad: function(image) {
         		imgObj = Bigmap.mainPage.mainPane.displayV.contentView.imageV ;
         		h = image.naturalHeight;
         		w = image.naturalWidth;
         		layout = {height: h, width: w, top: 0, left: 0};
         		imgObj.set ('layout', layout);
         		sc_super() ;
         		console.log (layout);
					Bigmap.mainPage.mainPane.displayV.contentView.drawingView.draw();
         		return YES;
      		},//didLoad
	
	  		}),//imageV

		drawingView: Bigmap.CanvasView.design({
			acceptsFirstResponder: YES  // eep
		})//drawingview
  	}),//contentV
}),//displayV



  })

});
