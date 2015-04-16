var Note = require('./note.js')
module.exports = function(app, passport) {
  //listing notes
  app.get('/api/notes', function(req, res){
    console.log(Note);
    Note.find(function(err, notes){
      if(err)
        res.send(err);
      res.json(notes);
    });
  });

  //creating a note
  app.post('/api/notes', function(req, res){
    Note.create({
      title : req.body.title,
      content : req.body.content
    }, function(err, notes){
        if(err)
          req.send(err);
        res.json(notes);
    })
  });

  //deleting a note
  app.delete('/api/notes/:id', function(req, res){
    Note.remove({
      _id : req.params.id
    }, function(err, notes){
        if(err)
          res.send(err);
        //not very efficient, change that later...
        Note.find(function(err, todos) {
          if (err)
            res.send(err)
          res.json(todos);
        });
    })
  });

  app.get('/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
          user : req.user // get the user out of session and pass to template
      });
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/', function(req, res){
    res.sendfile('./public/index.html');
  });

  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }
}
