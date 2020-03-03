// ==========================================================================
// Project:   Bigmap
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Bigmap = SC.Application.create(
  /** @scope Bigmap.prototype */ {

  NAMESPACE: 'Bigmap',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  fstore: SC.Store.create().from(SC.Record.fixtures),
  store: SC.Store.create({
      orderBy: 'title'
  }).from('Bigmap.MapletDataSource'),

  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;
