// ==========================================================================
// Project:   Bigmap.Def
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Bigmap.Def = SC.Record.extend(
/** @scope Bigmap.Def.prototype */ {

  // TODO: Add your own code here.

	name: SC.Record.attr(String),
	res: SC.Record.attr(Number),
	minLat: SC.Record.attr(Number),
	maxLat: SC.Record.attr(Number),
	minLon: SC.Record.attr(Number),
	maxLon: SC.Record.attr(Number),
	Cov1: SC.Record.attr(Number),
	Cov2: SC.Record.attr(Number),
	Cov3: SC.Record.attr(Number),

});


