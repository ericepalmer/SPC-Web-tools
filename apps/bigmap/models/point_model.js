// ==========================================================================
// Project:   Bigmap.Point
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Bigmap.Point = SC.Record.extend(
/** @scope Bigmap.Point.prototype */ {

	name: SC.Record.attr(String),
	group: SC.Record.attr(String),
	xmin: SC.Record.attr(Number),
	xmax: SC.Record.attr(Number),
	ymin: SC.Record.attr(Number),
	ymax: SC.Record.attr(Number)

});


