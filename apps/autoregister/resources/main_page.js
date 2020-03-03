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
		value: "http://ormacsrv1.lpl.arizona.edu/data/autoregister.jpg",
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
	width = Autoregister.mainPage.mainPane.imgView.image.naturalWidth;
	currCol = Math.floor(Autoregister.mainPage.mainPane.imgView.image.naturalWidth/100);
	currCol = 10;
	holdContext.clearRect(0.0, 0.0, 2000, 2000);

	//scale = 1200/currCol; // Needed for normal lithos and register
	scale = 100;
	offsetX = 10;
	offsetY = 50;

	// Show numbers
	if (Autoregister.mainPage.mainPane.numberB.value) {
		start =0;
		for (row=0; row<10; row++)  
			for (col=0; col<currCol; col++) {
				start++;
				numStr = " " + start;
				holdContext.fillStyle = 'black';		// template
				holdContext.fillRect (col*scale+20, row*scale*2+60-10, 16, 14);
				holdContext.fillStyle = 'yellow';		// template
				holdContext.fillText (numStr, col*scale+20, row*scale*2+60);
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
	this.startX = x;
	this.startY = y;
	this.downX = x;
	this.downY = y;

	offsetX = 10;
	offsetY = 50;

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

});

// This page describes the main user interface for your application.
Autoregister.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: ['imgView', 'howFarView', 'xyView', 'labelView', 'drawingView', 'numberB', 'reloadB', 'imgName'],

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
      valueBinding: "Autoregister.mainPage.mainPane.drawingView.xyStr",
    }),

	howFarView: SC.LabelView.design({
      classNames: ['welcome-label'],
      layout: { top: 10, left: 400, width: 300, height: 24 },
      valueBinding: "Autoregister.mainPage.mainPane.drawingView.moveStr",
		backgroundColor: "White",
    }),

  	numberB: SC.CheckboxView.design({
    	layout: { top: 10, left: 720, width: 100, height: 24 },
    	title: "Numbers",
    	target: "Autoregister.imageC",
    	action: "numberE",
		value: "0",
  	}),
  	centerB: SC.CheckboxView.design({
    	layout: { top: 10, left: 620, width: 100, height: 24 },
    	title: "Center",
    	target: "Autoregister.imageC",
    	action: "centerE",
		value: "1",
  	}),


    //imgView: Autoregister.ImgView.design({
    imgView: SC.ImageView.design({
      layout: { top: 50, left: 10, height:1200, width:1200},
      value: "This is my test",
		backgroundColor: "White",
		value: "http://ormacsrv1.lpl.arizona.edu/data/autoregister.jpg",
		//#valueBinding: "Autoregister.imageC.imageName",

		didLoad: function(image) {
   		imgObj = Autoregister.mainPage.mainPane.imgView ;
   		h = image.naturalHeight;
   		w = image.naturalWidth;
   		layout = {height: h, width: w, top: 50, left: 10};
   		imgObj.set ('layout', layout);
			sc_super() ;
			console.log ("did Load-sub", layout);
   		return YES;
		},

	  }),

	drawingView: Autoregister.CanvasView.design({
	})//drawingview



  })

});
