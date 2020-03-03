// ==========================================================================
// Project:   Bigmap.MapletDataSource
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Bigmap */

sc_require('models/maplet_model');
sc_require('models/def_model');
sc_require('models/point_model');
Bigmap.QUERY_DEF = SC.Query.local(Bigmap.Def);
Bigmap.QUERY_POINT = SC.Query.local(Bigmap.Point);
Bigmap.QUERY = SC.Query.local(Bigmap.Maplet, { orderBy: 'title' });

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Bigmap.MapletDataSource = SC.DataSource.extend(
/** @scope Bigmap.MapletDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  //

  fetch: function(store, query) {

    // TODO: Add handlers to fetch data for specific queries.
    // call store.dataSourceDidFetchQuery(query) when done.

	if (query == Bigmap.QUERY) {
   	reqStr = "/data/position.json";
   	console.log ("reqStr", reqStr);
   	SC.Request.getUrl(reqStr).header({'Accept': 'application/json'}).json()
     	.notify(this, 'didFetchObs', store, query)
     	.send();
   	return YES;
	}

	if (query == Bigmap.QUERY_DEF) {
   	reqStr = "/data/def.json";
   	console.log ("reqStr", reqStr);
   	SC.Request.getUrl(reqStr).header({'Accept': 'application/json'}).json()
     	.notify(this, 'didFetchDef', store, query)
     	.send();
   	return YES;
	}

	if (query == Bigmap.QUERY_POINT) {
   	reqStr = "/data/points.json";
   	console.log ("reqStr", reqStr);
   	SC.Request.getUrl(reqStr).header({'Accept': 'application/json'}).json()
     	.notify(this, 'didFetchPoints', store, query)
     	.send();
   	return YES;
	}

   console.log ("blat");
   return NO; // return YES if you handled the query
  },


//---------------------------------------------
didFetchObs: function(response, store, query) {

   console.log (".. didFetchObs");
   if (SC.ok(response)) {

	res = response;
	st = store;
	q = query;
       //Version 2, remove query
   //   var storeKeys = store.loadRecords(Bigmap.Maplet, response.get('body').content);
   //   store.loadQueryResults(query, storeKeys);

      // Version 1, local query
	bod = response.get('body').content;
   ans = store.loadRecords(Bigmap.Maplet, bod);

   store.dataSourceDidFetchQuery(query);
/*
*/

      // Count the number of images and set them
      // FIXME - need to put in the counting algorithm
      what = Bigmap.mapletsController.content;
      what.forEach (function (item) {
         base = item.get('title');
         res = item.get('res');
			newRes = myRound (res);
			item.set ('title', base + ' -- ' + newRes + 'm');
         //item.set('base', base );
         //item.set('name', base + " (" + "66" + ")");
      });

   } else store.dataSourceDidErrorQuery(query, response);
},

//---------------------------------------------
didFetchDef: function(response, store, query) {

   console.log (".. didFetchDef");
   if (SC.ok(response)) {

	res2 = response;
	st2 = store;
	q2 = query;
       //Version 2, remove query
   //   var storeKeys = store.loadRecords(Bigmap.Maplet, response.get('body').content);
   //   store.loadQueryResults(query, storeKeys);

      // Version 1, local query
	bod2 = response.get('body').content;
   ans2 = store.loadRecords(Bigmap.Def, bod2);

   store.dataSourceDidFetchQuery(query);

      // Count the number of images and set them
      // FIXME - need to put in the counting algorithm

   } else store.dataSourceDidErrorQuery(query, response);
},

//---------------------------------------------
didFetchPoints: function(response, store, query) {

   console.log (".. didFetchPoints");
   if (SC.ok(response)) {

		res = response;
		st = store;
		q = query;
       //Version 2, remove query
   //   var storeKeys = store.loadRecords(Bigmap.Maplet, response.get('body').content);
   //   store.loadQueryResults(query, storeKeys);

      // Version 1, local query
	bod = response.get('body').content;
   ans = store.loadRecords(Bigmap.Point, bod);

   store.dataSourceDidFetchQuery(query);

      // Count the number of images and set them
      // FIXME - need to put in the counting algorithm

   } else store.dataSourceDidErrorQuery(query, response);
},



  // ..........................................................
  // RECORD SUPPORT
  //

  retrieveRecord: function(store, storeKey) {

    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO; // return YES if you handled the storeKey
  },

  createRecord: function(store, storeKey) {

    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO; // return YES if you handled the storeKey
  },

  updateRecord: function(store, storeKey) {

    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO; // return YES if you handled the storeKey
  },

  destroyRecord: function(store, storeKey) {

    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done

    return NO; // return YES if you handled the storeKey
  }

});
