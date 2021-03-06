var APIS = require('./apis.js');
var BodyParser = require( 'body-parser' );
var Http = require( 'http' ),
    Router = require( 'router' ),
    server,
    router;
router = new Router();

server = Http.createServer( function( request, response ) {
  router( request, response, function( error ) {
    if ( !error ) {
      response.writeHead( 404 );
    } else {
      // Handle errors
      console.log( error.message, error.stack );
      response.writeHead( 400 );
    }
    response.end( 'RESTful API Server is running!' );
  });
});

server.listen( 3000, function() {
  console.log( 'Restful server is running...' );
});
router.use(BodyParser.text());

//Fetch Type List
router.get('/fetchTypeList', APIS.fetchTypeList);

//Fetch Article List
router.get('/fetchArticleList/:typeId', APIS.fetchArticleList);
