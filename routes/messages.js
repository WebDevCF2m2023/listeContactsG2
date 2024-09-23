var express = require('express');
var router = express.Router();

// on importe la connection à la DB via le modèle
const Message = require("../models/message.model.js");

// Route pour la page qui lit tous les messages
// Cette route correspond aux URL => http://localhost:8080/messages/
router.get('/', function(req, res) {
    console.log("GET tous les messages");

    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message:"Erreur pendant la lecture des messages"
            });
        } else {
            console.log("Data : " + data);
            res.render("listeMessages.ejs",{title:"Liste des messages", donnees:data});
        }
    });

    //res.send("Lire tous les messages");
    //res.render('coucou', { title: 'Coucou' });
});

// Route pour la page qui écrit un nouveau message dans la DB
// Cette route correspond aux URL => http://localhost:8080/messages/create
router.post('/create', function(req,res){
    console.log("POST créer un message");
    const titrePage = 'Formulaire reçu';
    const lenom = req.body.nom;
    const lemessage = req.body.msg;

    // Validation du formulaire
    if ( (!req.body) || (lenom=="") || (lemessage=="") ) {
        console.log("Le formulaire est incomplet !");
        res.redirect('/contact');       // retour au formulaire de contact
    } else {
        console.log(req.body);
        // créer un nouveau message avec mon modèle
        const unMsg = new Message({
            nom: lenom,
            msg: lemessage
        });

        Message.create(unMsg, function(err,data){
            if (err) {
                res.status(500).send({
                    message:"Erreur pendant la création du message"
                });
            } else {
                console.log("Data : " + data);
                res.render("traiter_form.ejs", {title:titrePage, nom:unMsg.nom, msg:unMsg.msg});
            }
        });
    }
});


module.exports = router;
