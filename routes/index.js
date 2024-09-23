var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('coucou', { title: 'Coucou' });
});

// Route pour le formulaire de contact
// pour les URL : localhost:8080/contact
router.get('/contact', function(req,res){
  res.render('contact_form.ejs',{ title: 'Formulaire' });
});

module.exports = router;
