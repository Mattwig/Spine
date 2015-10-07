

/*
With an external file you need to export the handler with the module.exports function
inside of it you are able to perform any logic that you normally would with javascript.
*/
module.exports = function(req, reply){
  reply.view('interactive');
}
