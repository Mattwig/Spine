//load hapi module
var hapi = require('hapi');

//create server and select port
var server = new hapi.Server();
server.connection({
  host:process.env.HOST || "localhost",
  port:process.env.PORT || 8000
});

server.start(function(){
  console.log("Running server at " + server.info.uri);
});

//register the vision plugin and require it in order to set up the views
//sets how views are rendered, uses handlebars as the templating engine and sets the path to the html page layouts
server.register(require('vision'), function (err){
  server.views({
    engines: {
      html:require('handlebars')
    },
    path: 'templates',
    layoutPath:'layouts',
    layout:"index",
    helpersPath:"helpers",
    isCached:false
  });
})

//Register inert plug in so we are able to link to files like our style sheet
server.register({
    register: require('inert'),
    options: {
        message: 'hello'
    }
 }, function (err) {

     if (err) {
         console.log('Failed loading plugin');
     }
 });

//Here are your routes, they allow you to reroute traffic via the url path
//I will leave three examples in addition to the home page so you have an idea how it works
server.route([
  {
    //route to connect to your stylesheet
    method:'GET',
    path:'/{param*}',
    handler: {
      directory:{
        path: 'public'
      }
    }
  }, {
    //default route to your home page
  method: 'GET',
  path: '/',
  handler: function(req, reply){
    reply.view("home");
  }
}, {
  //route to a static page
  method:'GET',
  path: '/static',
  handler:function(req, reply){
    reply.view("static")
  }
}, {
   //route to a page with interactivity, added to an external file in order to organize code
  method:'GET',
  path:'/interactive',
  handler:require("./handlers/interactive")
}
]);
