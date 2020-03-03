// ==========================================================================
// Project:   Register - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Register */


Register.CanvasView = SC.View.extend({

  classNames: ['register-canvas-view'],

  tagName: 'canvas',
	downX: 0,
	downY: 0,
	holdX: 0,
	holdY: 0,
	startX: 0,
	startY: 0,
	endX: 0,
	endY: 0,
	dx: 0,
	dy: 0,
	dragging: 0,
	moveStr: "Click on feature for both L and R",

//----------------------------------
init: function () {
   console.log ("init canvas");
   sc_super() ;
   imageX = 0;
   imageY = 0;
   templateX = 0;
   templateY = 0;
   offsetX = 10;
   offsetY = 50;
},


//----------------------------------
  // Override this to draw on the canvas.
draw: function(context, height, width) {
	width = Register.mainPage.mainPane.imgView.image.naturalWidth;
	currCol = Math.floor(Register.mainPage.mainPane.imgView.image.naturalWidth/100);
	holdContext.clearRect(0.0, 0.0, 2000, 2000);
	currCol = 2;
	imageType = "register";

	scale = 1200/2;


	// Draw the position tracking dot
	lowX = Math.floor(this.holdX-offsetX) // % scale;
	lowY = Math.floor(this.holdY-offsetY) // % scale;
	//tx = Math.floor(lowX/scale*600);
	//ty = Math.floor(lowY/scale*600);
	tx = lowX;
	ty = lowY;
	a = imageX - offsetX;
	b = imageY - offsetY;
	c = templateX - offsetX;
	d = templateY - offsetY;
	if (a < 0) a = "-";
	if (b < 0) b = "-";
	if (c < 0) c = "-";
	if (d < 0) d = "-";
	this.set ('xyStr',  "      " + a + " " + b + "   \n      " + c + " " + d + "   \n" ) ;

   holdContext.fillStyle = 'green';    // template
   holdContext.fillRect(templateX, templateY, 4, 4);
   holdContext.strokeStyle = 'green';        // template
   holdContext.strokeRect(templateX-600, templateY, 4, 4);

   holdContext.fillStyle = 'red';         // image
   holdContext.fillRect(imageX, imageY, 4, 4);
   holdContext.strokeStyle = 'red';       // image
   holdContext.strokeRect(imageX+600, imageY, 4, 4);

	// Draw dragging
	if (this.endX)  {
		dx = this.endX - this.startX;
		dy = this.endY - this.startY;

		// Draw movement
		holdContext.strokeStyle = 'lime';		
		holdContext.beginPath()
		holdContext.moveTo(this.startX, this.startY);
		holdContext.lineTo(this.startX + dx , this.startY + dy );
		holdContext.stroke()

	}//if drag
},

//----------------------------------
mouseDragged: function(evt) {
	this.dragging = 1;
   newX = evt.originalEvent.layerX;
   newY = evt.originalEvent.layerY;
	this.endX = newX;
	this.endY = newY;
   dx = newX - this.startX;
   dy = newY - this.startY;
   if ((dx*dx) + (dy*dy) < 4) return YES;   // skip if small

   this.dx = dx;
   this.dy = dy;

   angle = Math.atan2 (-1*this.dy, this.dx) * 180 / 3.1415926
	if (angle < 0) angle += 360

	this.set ('moveStr', dx.toFixed(0) + "		" + dy.toFixed(0) + "  Angle [deg] " + angle.toFixed (1) );
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

	this.dragging = 0;
   x = evt.originalEvent.layerX;
   y = evt.originalEvent.layerY;
	if (y < offsetY) return false;
	if (x < offsetX) return false;
	this.startX = x;
	this.startY = y;
	this.downX = x;
	this.downY = y;


	if (this.startX-offsetX >= 600) {
		which = 'model';
      templateX = this.startX;
      templateY = this.startY;
	}
	else {
		which = 'image';
      imageX = this.startX;
      imageY = this.startY;
	} 
   dx = templateX - imageX - 600;
   dy = templateY - imageY;
   this.set ('moveStr', dx.toFixed(0) + "    " + dy.toFixed(0));
},//mousedown

//---------------------------
mouseUp: function(evt) {
    // apply one more time to set final position
	if (! this.dragging) {
		this.holdX = this.downX;
		this.holdY = this.downY;
		this.startX = 0;
		this.startY = 0;
		this.endX = 0;
		this.endY = 0;
	}//if
	this.dragging = 0;

   this.draw(holdContext, this.sourceHeight, this.sourceWidth);

   return YES; // handled!

},//mouseup

//---------------------------
updateDisplay: function() {
   w = Register.scaleController.scaleTitle;
   this.set ('mapWidth', w*2+2);
   console.log ("updateDisplay", this.mapWidth);
   this.draw(holdContext, this.sourceHeight, this.sourceWidth);
},//updatedisplay


//---------------------------
keyDown: function(evt) {
//   console.log (evt.which);
   var refresh = false;
   if (evt.which == 114) refresh = true;
   if (evt.which == 82) refresh = true;
   if (evt.which == 32) refresh = true;
   if (refresh) Register.imageC.reloadE();
   return refresh;
 },


});

// This page describes the main user interface for your application.
Register.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: ['imgView', 'howFarView', 'labelView', 'drawingView', 'reloadB', 'imgName', 'scaleM', 'xyView'],

    labelView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { centerX: 0, centerY: 0, width: 300, height: 24 },
      tagName: "h1",
      value: "",
    }),

  	reloadB: SC.ButtonView.design({
    	layout: { top: 2, left: 10, width: 80, height: 44 },
    	title: "Reload",
    	target: "Register.imageC",
      controlSize:  SC.JUMBO_CONTROL_SIZE,
    	action: "reloadE",
  	}),

	imgName: SC.LabelView.design({
      layout: { top: 10, left: 110, width: 180, height: 24 },
      valueBinding: "Register.imageC.imageName",
    }),

	rowsT: SC.LabelView.design({
      layout: { top: 10, left: 500, width: 180, height: 24 },
      valueBinding: "Register.imageC.rows",
    	target: "Register.imageC",
    	action: "reloadE",
		selectable: "yes"
    }),

	xyView: SC.TextFieldView.design({
      layout: { top: 5, left: 300, width: 170, height: 35 },
		isEditable: false,
		isTextArea: true,
		backgroundcolor:  "AliceBlue",
      valueBinding: "Register.mainPage.mainPane.drawingView.xyStr",
    }),

	howFarView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { top: 10, left: 500, width: 300, height: 24 },
      valueBinding: "Register.mainPage.mainPane.drawingView.moveStr",
		backgroundColor: "Beige",
    }),

  	numberB: SC.CheckboxView.design({
    	layout: { top: 10, left: 720, width: 100, height: 24 },
    	title: "Numbers",
    	target: "Register.imageC",
    	action: "numberE",
		value: "1",
  	}),

 // Popup menu to select scale and which user's subdirectory
   scaleM: SC.PopupButtonView.design({
      layout: { top: 0, right: 0, width: 90, height: 24 },
      titleBinding: "Register.scaleController.scaleTitle",
      menuBinding:  "Register.scaleController.menu"
   }),


  	centerB: SC.CheckboxView.design({
    	layout: { top: 10, left: 620, width: 100, height: 24 },
    	title: "Center",
    	target: "Register.imageC",
    	action: "centerE",
		value: "1",
  	}),


    imgView: SC.ImageView.design({
      layout: { top: 50, left: 10, height:599, width:1199},
      value: "This is my test",
		backgroundColor: "White",
		//valueBinding: "Register.imageC.imageName",
      value: "/data/register.jpg",
	  }),

	drawingView: Register.CanvasView.design({
      acceptsFirstResponder: YES  // eep
	})//drawingview



  })

});
