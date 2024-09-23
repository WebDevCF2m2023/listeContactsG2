// on importe le module de connexion
const db = require("./db.js");

console.log("Je passe dans models/message.model.js");

// Constructeur
const Message = function(lemessage) {
    this.nom = lemessage.nom;
    this.msg = lemessage.msg;
    this.date_creation = new Date();
};

// Méthode create pour créer un nouveau message dans la base de données
// newMsg : l'objet Message à créer et à sauver dans la DB
// resultat : la réponse du serveur de DB quand on insère (OK ou erreur)
Message.create = function(newMsg,resultat){
    db.query("INSERT INTO messages(nom,message) VALUES(?,?)",[newMsg.nom,newMsg.msg], function(err,res){
        // si on a une erreur, ça se trouve dans err
        if (err) {
            console.log("Erreur Message.create : ", err);
            resultat(err,null);
            return;
        };
        // si tout se passe bien, on a les données dans res
        console.log("Message.create OK : ", res);
        resultat(null,res);
    });
};

// Méthode readAll : pour lire tous les messages
Message.readAll = function(resultat){
    db.query("SELECT * FROM messages ORDER BY datemessage DESC", function(err,res){
        // si on a une erreur, ça se trouve dans err
        if (err) {
            console.log("Erreur Message.readAll : ", err);
            resultat(err,null);
            return;
        };
        // si tout se passe bien, on a les données dans res
        console.log("Message.readAll OK : ", res);
        resultat(null,res);
    });
};


// on exporte cet objet pour les autres modules
module.exports = Message;