// ==========================================================================
// Project:   Landmarks - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Landmarks */




Landmarks.CanvasView = SC.View.extend({

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
	moveStr: "Version 1.1, Aug 2015",
	mapWidth: 100,

init: function () {
   console.log ("init");
   sc_super() ;
	offsetX = 10;
	offsetY = 50;
},

//----------------------------------
  // Override this to draw on the canvas.
draw: function(context, height, width) {
	holdContext.clearRect(0.0, 0.0, 4000, 8000);
//        context.clearRect(0, 0, canvas.width, canvas.height);

	width = Landmarks.mainPage.mainPane.imgView.image.naturalWidth;
	w = this.mapWidth;
	this.currCol = Math.floor(Landmarks.mainPage.mainPane.imgView.image.naturalWidth/w);
	rows = Math.floor(Landmarks.mainPage.mainPane.imgView.image.naturalHeight/w);

	scale = w; // Needed for normal lithos and register

	// Show numbers
	if (Landmarks.mainPage.mainPane.numberB.value) {
		start =0;
		for (row=0; row<rows; row++)  
			for (col=0; col<this.currCol; col++) {
				start++;
				numStr = " " + start;
				holdContext.fillStyle = 'black';		// template
				holdContext.fillRect (col*scale+10, row*scale*2+60-10, 16, 14);
				holdContext.fillStyle = 'yellow';		// template
				holdContext.fillText (numStr, col*scale+10, row*scale*2+60);
			}//for col
	}//if

	// Draw the position tracking dot
	lowX = (this.holdX-offsetX) % scale;
	lowY = (this.holdY-offsetY) % scale;
	tx = Math.floor(lowX/scale*w);
	ty = Math.floor(lowY/scale*w);
	this.set ('xyStr',  tx + " / " + ty) ;
	var boxSize = 2;
	if (scale <= 75) boxSize = 1.5;
	if (scale <= 50) boxSize = 1;
	if (scale <= 25) boxSize = 0.7;
	for (col=0; col<this.currCol; col++)
		for (row=0; row<rows; row++) {
			if (row % 2)
				holdContext.fillStyle = 'green';		// template
			else
				holdContext.fillStyle = 'red';			// image
			holdContext.fillRect(lowX+col*scale+offsetX-boxSize, lowY+row*scale+offsetY-boxSize, boxSize*2, boxSize*2);
		}//for

	// Draw dragging
	if (this.endX)  {
		dx = this.endX - this.startX;
		dy = this.endY - this.startY;
		// Draw the box
		//holdContext.strokeStyle = 'white';
		//holdContext.strokeRect(this.startX, this.startY, dx, dy);

		// Draw movement
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

	this.set ('moveStr', "img (" + picture + ")		" + Math.round(dx) 
						+ "		" + Math.round(dy));
	//console.log (distStr);
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
	w = Landmarks.scaleController.scaleTitle;
	this.set ('mapWidth', w*2+2);
	console.log ("updateDisplay", this.mapWidth);
   this.draw(holdContext, this.sourceHeight, this.sourceWidth);
},//updatedisplay

//---------------------------
keyDown: function(evt) {
	//console.log (evt.which);
	var refresh = false;
	if (evt.which == 114) refresh = true;
	if (evt.which == 82) refresh = true;
	if (evt.which == 32) refresh = true;
	if (refresh) Landmarks.imageC.reloadE();
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
		tx = Math.floor(baseX/scale*w);
		ty = Math.floor(baseY/scale*w);

   	dx = tx - this.compCol;
   	dy = ty - this.compRow;

		holdStr = Landmarks.imageC.get ('outputBase');
		Landmarks.imageC.set ('outputBase', holdStr+'\n'+picture +'\n'+dx+' '+dy);
		holdStr = Landmarks.imageC.get ('outputBase');
		Landmarks.imageC.set ('outputStr', '1\n1' + holdStr + '\n0\n');
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
		baseX = (x-offsetX) % scale;
		baseY = (y-offsetY) % scale;
		this.compCol = Math.floor(baseX/scale*w);
		this.compRow = Math.floor(baseY/scale*w);
   	//this.draw(holdContext, this.sourceHeight, this.sourceWidth);
		this.set ('moveStr', 'Click \"Clear\" to end');
	}// if shift


   this.draw(holdContext, this.sourceHeight, this.sourceWidth);

   return YES; // handled!

},//mouseup

});

// This page describes the main user interface for your application.
Landmarks.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: ['imgView', 'howFarView', 'xyView', 'labelView', 'drawingView', 'numberB', 'reloadB', 'imgName', 'scaleM', 'outputT'],

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
    	target: "Landmarks.imageC",
    	action: "reloadE",
  	}),

	// Displays the actual image's name
	imgName: SC.LabelView.design({
    	layout: { top: 10, left: 720, width: 180, height: 24 },
      valueBinding: "Landmarks.imageC.imageName",
    }),

	// Displays the x/y position of the mouse click within a single maplet
	xyView: SC.LabelView.design({
      layout: { top: 10, left: 250, width: 100, height: 24 },
      valueBinding: "Landmarks.mainPage.mainPane.drawingView.xyStr",
    }),

	// Middle text in the title bar.  Tells how far for a single image
	howFarView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { top: 10, left: 400, width: 300, height: 24 },
      valueBinding: "Landmarks.mainPage.mainPane.drawingView.moveStr",
		backgroundColor: "White",
    }),

	// Checkbox for toggling on/off the display of numbers
  	numberB: SC.CheckboxView.design({
      layout: { top: 10, left: 110, width: 100, height: 24 },
    	title: "Numbers",
    	target: "Landmarks.imageC",
    	action: "numberE",
		isSelected: true,
		value: true,
  	}),

	// Popup menu to select scale and which user's subdirectory
  	scaleM: SC.PopupButtonView.design({
    	layout: { top: 0, right: 0, width: 90, height: 24 },
    	titleBinding: "Landmarks.scaleController.scaleTitle",
    	menuBinding:  "Landmarks.scaleController.menu"
  	}),

	// Text -- long list of things to move copy/paste
  	outputT: SC.TextFieldView.design({
    	layout: { top: 24, right: 5, width: 100, bottom: 5 },
		valueBinding: "Landmarks.imageC.outputStr",
      isTextArea: true,
		backgroundColor: "White",
  	}),

	// Displays the image as a background layer
    imgView: SC.ImageView.design({
      layout: { top: 50, left: 10, height:1200, width:1200},
      value: "This is my test",
		backgroundColor: "White",
      valueBinding: "Landmarks.imageC.imageName",
      //value: "/data/landmarks.jpg",
      //value: "http://ormacsrv1.lpl.arizona.edu/data/landmarks.jpg",


      didLoad: function(image) {
         imgObj = Landmarks.mainPage.mainPane.imgView ;
         h = image.naturalHeight;
         w = image.naturalWidth;
         layout = {height: h, width: w, top: 50, left: 10};
         imgObj.set ('layout', layout);
         sc_super() ;
         console.log ("did Load-sub", layout);
			Landmarks.mainPage.mainPane.drawingView.draw();
         return YES;
      },

	  }),

	drawingView: Landmarks.CanvasView.design({
		acceptsFirstResponder: YES  // eep
	})//drawingview


  })

});
