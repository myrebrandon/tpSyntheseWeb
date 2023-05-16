const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");

const HttpError = require("../models/http-errors");
const Etudiant = require("../models/etudiant");
const Entrepreneur = require("../models/entrepreneur");
const Coordinateur = require("../models/coordinateur");
const Stage = require("../models/stage");
const { hashage, compare } = require("./passwordManager");
const { send } = require("./envoie-email");

const retourDesEtudiants = async (requete, reponse, next) => {
    let listeEtudiants;
    try {
        const selectedFields = { mdp: 0 }

        listeEtudiants = await Etudiant.find().select(selectedFields);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    return reponse.status(201).json({listeEtudiants: listeEtudiants});
}

const loginEtudiant = async (requete, reponse, next) => {
    const { courriel, mdp } = requete.body;

    let etudiant;

    try {
        etudiant = await Etudiant.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("Courriel inexistant", 401));
    }

    const verifMdp = await compare(mdp, etudiant.mdp);

    if(!verifMdp) {
        return next(new HttpError("Mauvais mot de passe", 401));
    }

    const token = jwt.sign(etudiant.id, process.env.TOKEN_SECRET);

    return reponse.status(201).json({message: token});
}

const retourEtudiant = async (requete, reponse, next) => {
    const idEtudiant = requete.params.idEtudiant;

    let etudiant;

    try {
        etudiant = await Etudiant.findById(idEtudiant, "-mdp");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("L'etudiant n'existe pas", 401));
    }

    return reponse.status(201).json({etudiant: etudiant.toObject({getters: true})});
}

const ajouterEtudiant = async (requete, reponse, next) => {
    const { numDa, nomComplet, courriel, mdp, type } = requete.body;

    let etudiantExistant;
    let emailEntrExistant;
    let emailCoordinateur;

    try {
        etudiantExistant = await Etudiant.findOne({courriel: courriel});
        emailEntrExistant = await Entrepreneur.findOne({courriel: courriel});
        emailCoordinateur = await Coordinateur.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(etudiantExistant) {
        return next(new HttpError("L'etudiant existe deja", 401));
    }

    if(emailEntrExistant) {
        return next(new HttpError("Le email est deja utilise", 401));
    }
    
    if(emailCoordinateur) {
        return next(new HttpError("Le email est deja utilise", 401));
    }

    const hashPwd = await hashage(mdp);

    const nouvEtudiant = new Etudiant({
        numDa,
        nomComplet,
        courriel,
        mdp: hashPwd,
        type
    });

    try {
        await nouvEtudiant.save();
    } catch(err) {
        return next(new HttpError("Erreur dans la sauvegarde de l'etudiant", 500));
    }

    return reponse.status(201).json({nouveauEtudiant: nouvEtudiant.toObject({getters: true})});
}

const postuler = async (requete, reponse, next) => {
    const idEtudiant = requete.params.idEtudiant;
    const { idStage, to, subject, text } = requete.body;

    let etudiant;

    try {
        etudiant = await Etudiant.findById(idEtudiant).populate("stages");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("L'etudiant n'existe pas", 401));
    }

    let stage;

    try {
        stage = await Stage.findById(idStage).populate("etudiantsPostuler");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!stage) {
        return next(new HttpError("Le stage n'existe pas", 401));
    }

    try {
        for(let st of etudiant.stages) {
            if(st.id === stage.id) {
                return next(new HttpError("L'etudiant a deja postuler pour ce stage", 401));
            }  
        }
    } catch(err) {
        return next(new HttpError("Erreur dans verification si il a deja postule", 401));
    }
    

    try {
        stage.etudiantsPostuler.push(etudiant);

        etudiant.stages.push(stage);


        await stage.save();
        await etudiant.save();

        const data = {
            "from": process.env.EMAIL,
            "to": to,
            "subject": subject,
            "text": text
        }

        send(data);
    } catch(err) {
        return next(new HttpError("Erreur de postulation", 500));
    }

    return reponse.status(201).json({message: "L'etudiant a bien postule"});
}

const modifierEtudiant = async (requete, reponse, next) => {
    const idEtudiant = requete.params.idEtudiant;
    const { nomComplet, courriel, mdp, type } = requete.body;

    let etudiant;

    try {
        etudiant = await Etudiant.findById(idEtudiant);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("L'etudiant n'existe pas", 401));
    }

    try {
        if(nomComplet != null) {
            etudiant.nomComplet = nomComplet;
        }

        if(courriel != null) {
            let emailExistant;
            let emailExistantEntr;
            try {
                emailExistant = await Etudiant.findOne({courriel:courriel});
                emailExistantEntr = await Entrepreneur.findOne({courriel:courriel});
                if(!emailExistant && !emailExistantEntr) {
                    etudiant.courriel = courriel;
                } else {
                    return next(new HttpError("Le email est deja utilise", 401));
                }
            } catch(err) {
                return next(new HttpError("Erreur de bd", 500));
            }
        }

        if(mdp != null) {
            let verifMdp = await compare(mdp, etudiant.mdp);
            if(!verifMdp) {
                let hashedMdp = await hashage(mdp);
                etudiant.mdp = hashedMdp;
            } else {
                return next(new HttpError("Le mot de passe n'a pas change", 401));
            }
        }

        if(type != null) {
            etudiant.type = type;
        }

        await etudiant.save();
    } catch(err) {
        return next(new HttpError("Erreur de modification", 401));
    }

    return reponse.status(201).json({message: "Etudiant bien modifie"});
}

const deleteEtudiant = async (requete, reponse, next) => {
    const idEtudiant = requete.params.idEtudiant;
    
    let etudiant;

    try {
        etudiant = await Etudiant.findById(idEtudiant).populate("stages");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("L'etudiant n'existe pas", 401));
    }

    try {
        for(let st of etudiant.stages) {
            let stage;
            stage = await Stage.findById(st.id).populate("etudiantsPostuler");
            stage.etudiantsPostuler.pop(etudiant);
            await stage.save();
        }

        await Etudiant.findByIdAndRemove(idEtudiant);
    } catch(err) {
        return next(new HttpError("Erreur dans la supression de l'etudiant", 401));
    }

    return reponse.status(201).json({message: "Etudiant bien supprime"});
}


module.exports.retourDesEtudiants = retourDesEtudiants;
module.exports.retourEtudiant = retourEtudiant;
module.exports.loginEtudiant = loginEtudiant;
module.exports.ajouterEtudiant = ajouterEtudiant;
module.exports.postuler = postuler;
module.exports.modifierEtudiant = modifierEtudiant;
module.exports.deleteEtudiant = deleteEtudiant;