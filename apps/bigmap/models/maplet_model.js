// ==========================================================================
// Project:   Db1.Sequence
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Db1 */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Bigmap.Maplet = SC.Record.extend(
/** @scope Db1.Sequence.prototype */ {

	title: SC.Record.attr(String),
	minX: SC.Record.attr(Number),
	maxX: SC.Record.attr(Number),
	minY: SC.Record.attr(Number),
	maxY: SC.Record.attr(Number),
	res: SC.Record.attr(Number),
	Q: SC.Record.attr(Number),
	vect: SC.Record.attr(Number),
	imges: SC.Record.attr(Number),
	overlaps: SC.Record.attr(Number),
	limbs: SC.Record.attr(Number),
	uncert: SC.Record.attr(Number),
	residuals: SC.Record.attr(Number)

}) ;
