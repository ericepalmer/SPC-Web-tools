// ==========================================================================
// Project:   Autoregister - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Autoregister */


Autoregister.ImgView = SC.ImageView.extend({
	backgroundColor: "Pink",
      layout: { top: 50, left: 10, height:1200, width:1200},
      value: "This is my test",
		backgroundColor: "White",
		value: "http://localhost/data/autoregister.jpg",
//---------------------------------
didLoad: function(image) {
   console.log ("didLoad-sub");
   return YES;
},

init: function () {
   console.log ("init");
	sc_super() ;
},

});


Autoregister.CanvasView = SC.View.extend({

  classNames: ['spcalign-canvas-view'],

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
	moveStr: "Click and drag for distance",

//----------------------------------
init: function () {
   console.log ("init canvas");
	sc_super() ;
	imageX = 0;
	imageY = 0;
	templateX = 0;
	templateY = 0;
	holdPict = 0;
},
  // Override this to draw on the canvas.
draw: function(context, height, width) {
	width 
    = Autoregister.mainPage.mainPane.imgScrollV.contentView.mainImgView.image.naturalWidth;
	//height 
    //= Autoregister.mainPage.mainPane.imgScrollV.contentView.mainImgView.image.naturalHeight;
	layout = Autoregister.mainPage.mainPane.imgScrollV.contentView.get ('layout')
	height = layout.height
	width = layout.width

	if (width < 1100) {		// image is unset
		console.log ("Panic:  width: ", width)
		width = 1100;
		height = 500;
	}//if

	holdContext.clearRect(0.0, 0.0, width, height);

	scale = 100;
	offsetX = 0;
	offsetY = 0;

	// Show numbers
	numRows = height/200;
	currCol = 10;

	if (Autoregister.mainPage.mainPane.numberB.value) {
		start =0;
		for (row=0; row<numRows; row++)  
			for (col=0; col<currCol; col++) {
				start++;
				numStr = " " + start;
				holdContext.fillStyle = 'black';		// template
				holdContext.fillRect (col*scale+0, row*scale*2+10-10, 16, 14);
				//holdContext.fillRect (col*scale+20, row*scale*2+60-10, 16, 14);
				holdContext.fillStyle = 'yellow';		// template
				holdContext.fillText (numStr, col*scale+0, row*scale*2+10);
				//holdContext.fillText (numStr, col*scale+20, row*scale*2+60);
			}//for col
	}//if

	// Draw the position tracking dot
	holdContext.fillStyle = 'green';		// template
	holdContext.fillRect(templateX, templateY, 4, 4);
	holdContext.strokeStyle = 'green';			// template
	holdContext.strokeRect(templateX, templateY-100, 4, 4);

	holdContext.fillStyle = 'red';			// image
	holdContext.fillRect(imageX, imageY, 4, 4);
	holdContext.strokeStyle = 'red';			// image
	holdContext.strokeRect(imageX, imageY+100, 4, 4);

	lowX = (this.holdX-offsetX) % scale;
	lowY = (this.holdY-offsetY) % scale;
	tx = Math.floor(lowX/scale*100);
	ty = Math.floor(lowY/scale*100);
	this.set ('xyStr',  tx + " / " + ty) ;

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
	row = Math.floor (this.startX/100);
	col = Math.floor ((this.startY-50)/200);
	var picture = (row+1) + col*10;

	this.set ('moveStr', "img (" + picture + ")		\n" + dx.toFixed(0) + "		" + dy.toFixed(0));
	//console.log (distStr);
   this.draw(holdContext, this.sourceHeight, this.sourceWidth);
	return YES;
},

/*
//----------------------------------
  // The original height that the draw commands are based on.
  sourceHeight: 2000,

  // The original width that the draw commands are based on.
  sourceWidth: 2000,
*/

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
      //context.scale(resolution * (width / sourceWidth), resolution * (height / sourceHeight));
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
	this.startX = x;
	this.startY = y;
	this.downX = x;
	this.downY = y;

	offsetX = 0;
	offsetY = 0;

	col = Math.floor ((this.startX-offsetX)/100);
	row = Math.floor ((this.startY-offsetY)/200);
	picture = (col+1) + row*10;
/*
	if (picture != holdPicture) {
			templateX = 0;
			templateY = 0;
			imageX = 0;
			imageY = 0;
	}
*/
	holdPicture = picture;	// Have they've click on a diff image

	line = Math.floor ((this.startY-offsetY)/100);
	if (line % 2) {
			templateX = this.startX;
			templateY = this.startY;
	} else {
			imageX = this.startX;
			imageY = this.startY;
	}
	dx = imageX - templateX;
	dy = imageY - templateY + 100;
	this.set ('moveStr', "img (" + picture + ")		\n" + dx.toFixed(0) + "		" + dy.toFixed(0));
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
keyDown: function(evt) {
   console.log (evt.which);
   var refresh = false;
   if (evt.which == 114) refresh = true;
   if (evt.which == 82) refresh = true;
   if (evt.which == 32) refresh = true;
   if (refresh) Autoregister.imageC.reloadE();
   return refresh;
 },//keydown


});

// This page describes the main user interface for your application.
Autoregister.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: ['howFarView', 'xyView', 'labelView', 'imgScrollV', 'numberB', 'reloadB', 'imgName'],
    //childViews: ['imgView', 'howFarView', 'xyView', 'labelView', 'drawingView', 'numberB', 'reloadB', 'imgName'],

    labelView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { centerX: 0, centerY: 0, width: 300, height: 24 },
      tagName: "h1",
      value: "",
    }),

  	reloadB: SC.ButtonView.design({
    	layout: { top: 10, left: 10, width: 70, height: 24 },
    	title: "Reload",
    	target: "Autoregister.imageC",
    	action: "reloadE",
  	}),

	imgName: SC.LabelView.design({
      layout: { top: 10, left: 110, width: 180, height: 24 },
      valueBinding: "Autoregister.imageC.imageName",
    }),

	rowsT: SC.LabelView.design({
      layout: { top: 10, left: 500, width: 180, height: 24 },
      valueBinding: "Autoregister.imageC.rows",
    	target: "Autoregister.imageC",
    	action: "reloadE",
		selectable: "yes"
    }),

	xyView: SC.LabelView.design({
      layout: { top: 10, left: 300, width: 100, height: 40 },
      valueBinding: "Autoregister.mainPage.mainPane.imgScrollV.contentView.drawingView.xyStr",
    }),

	howFarView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { top: 10, left: 400, width: 300, height: 40 },
      valueBinding: "Autoregister.mainPage.mainPane.imgScrollV.contentView.drawingView.moveStr",
		backgroundColor: "White",
    }),

  	numberB: SC.CheckboxView.design({
    	layout: { top: 10, left: 720, width: 100, height: 24 },
    	title: "Numbers",
    	target: "Autoregister.imageC",
    	action: "numberE",
		value: true,
  	}),

// New (June 11 2023) Scrolling view, pulled from SBIB
// Main map window
   imgScrollV:  SC.ScrollView.design({
      layout: { left: 5, top: 50, right: 5, bottom: 5, minHeight: 500 },
      contentView: SC.View.design({
			backgroundColor: "LightGrey",
         layout: {top:0, height: 10000, left: 0, width:1100 },
         childViews: 'mainImgView drawingView '.w(),


			/////////////// Main Image View - holds the set of many images
         mainImgView: SC.ImageView.design({
				value: "http://localhost/data/autoregister.jpg",

					didLoad: function(image) {
   					imgObj = Autoregister.mainPage.mainPane.imgScrollV.contentView.mainImgView ;
   					h = image.naturalHeight;
   					w = image.naturalWidth;
   					layout = {height: h, width: w, top: 0, left: 0};
   					//layout = {height: h, width: w, top: 50, left: 10};
   					//imgObj.set ('layout', layout);
						//imgFrame = Autoregister.mainPage.mainPane.imgScrollV.contentView.drawingView;
   					//imgFrame.set ('layout', layout);

						imgFrame = Autoregister.mainPage.mainPane.imgScrollV.contentView;
   					imgFrame.set ('layout', layout);

						drawFrame = Autoregister.mainPage.mainPane.imgScrollV.contentView.drawingView;
						drawFrame.draw() 	// eep check this, I just added it for better flow control
						sc_super() ;
   					return YES;
					},//didload

         }),//mainimgview


			/////////////// Handeles the clicks and drags
         drawingView: Autoregister.CanvasView.design({
      		acceptsFirstResponder: YES  // eep
         })//drawingview
      })//contentview
   }),//imgview


  })

});
