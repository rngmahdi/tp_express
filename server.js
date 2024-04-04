//chargement des dependances
const express = require("express");
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const Equipe = require('./model/equipe');
const Joueur = require('./model/joueur')
//initialisation
const dbName = 'tp_express';
const url = `mongodb://localhost:27017/${dbName}`
const port = 3000;
//instanciation du serveur
const app = express();
app.use(body_parser.json());
//se connecter a mongobd
mongoose.connect(url).
  then(() => console.log('Connected to mongodb server')).
  catch(err => console.log(err));
//les routes
//get all teams
app.get('/equipes', (request, response) => {
  Equipe.find()
    .then(equipes => response.status(200).json(equipes))
    .catch(err => response.status(500).json({ message: err }));
});
//get a team by id
app.get('/equipes/:id', (request, response) => {
  const id = request.params.id;
  Equipe.findById(id)
    .then(equipe => response.status(200).json(equipe))
    .catch(err => response.status(500).json({ message: `Can not find a team with id: ${id}` }));
});
//add new team
app.post('/equipes', (request, response) => {
  const { name, country } = request.body;
  const equipe = new Equipe({ name, country });
  equipe.save()
    .then(eq => {
      console.log(`team  ${eq.name} creaded`);
      response.status(201).json({ message: `team  ${eq.name} creaded` })
    }).catch(err => {
      console.log(`erreur ${err}`);
      response.status(500).json({ message: err.message });
    })

});
//delete a team
app.delete('/equipes/:id', (request, response) => {
  const id = request.params.id;
  Equipe.deleteOne({
    _id: id
  })
    .then(() => {
      console.log(`team with id =  ${id} was deleted`);
      response.status(200).json({ message: `team  with id = ${id} was deleted` });
    })
    .catch(err => {
      console.log(`erreur ${err}`);
      response.status(500).json({ message: `Can not delete the team with id ${id}` });
    })
})
app.put('/equipes/:id', (request, response) => {
  const id = request.params.id;
  const { name, country } = request.body;
  Equipe.updateOne({ _id: id }, { name, country })
    .then(eq => {
      console.log(`team  ${eq.name} updated`);
      response.status(200).json({ message: `team  ${id} updated` })
    })
    .catch(err => {
      console.log(`erreur ${err}`);
      response.status(500).json({ message: `Can not update the team with id ${id}` });
    })

});


// #############################################################


// get all joueurs
app.get('/joueurs', (request, response) => {
  Joueur.find()
    .then(equipes => response.status(200).json(equipes))
    .catch(err => response.status(500).json({ message: err }));
});

//get a player by id
app.get('/joueurs/:id', (request, response) => {
  const id = request.params.id;
  Joueur.findById(id)
    .then(joueur => response.status(200).json(joueur))
    .catch(err => response.status(500).json({ message: `Can not find a player with id: ${id}` }));
});
//add new player
app.post('/joueurs', (request, response) => {
  const { idEquipe, name, number, poste } = request.body;
  const joueur = new Joueur({ idEquipe, name, number, poste });
  joueur.save()
    .then(jo => {
      console.log(`player  ${jo.name} created`);
      response.status(201).json({ message: `player  ${jo.name} created` })
    }).catch(err => {
      console.log(`erreur ${err}`);
      response.status(500).json({ message: err.message });
    })

});
//delete a team
app.delete('/joueurs/:id', (request, response) => {
  const id = request.params.id;
  Joueur.deleteOne({
    _id: id
  })
    .then(() => {
      console.log(`team with id =  ${id} was deleted`);
      response.status(200).json({ message: `team  with id = ${id} was deleted` });
    })
    .catch(err => {
      console.log(`erreur ${err}`);
      response.status(500).json({ message: `Can not delete the team with id ${id}` });
    })
})
app.put('/joueurs/:id', (request, response) => {
  const id = request.params.id;
  const { idEquipe, name, number, poste } = request.body;
  Joueur.updateOne({ _id: id }, { idEquipe, name, number, poste })
    .then(eq => {
      console.log(`player  ${eq.name} updated`);
      response.status(200).json({ message: `player  ${id} updated` })
    })
    .catch(err => {
      console.log(`erreur ${err}`);
      response.status(500).json({ message: `Can not update the player with id ${id}` });
    })

});

// get players of a team 
app.get('/equipe/joueurs/:id', (req, res) => {
  const id = req.params.id;
  Joueur.find({ idEquipe: id }).then((players) => {
    res.status(200).json(players)
  }).catch((err) => {
    console.log(`erreur ${err}`);
    res.status(500).json({ message: `Can not find player in team with id ${id}` });
  })
})

// get team name of a player
app.get('/joueur/equipe/:id', (req, res) => {
  const id = req.params.id;
  const joueur = Joueur.aggregate(Equipe,)
  // Equipe.findById(joueur.id).then((equipe) => {
  //   res.status(200).json(equipe)
  // }).catch((err) => {
  //   console.log(`errure ${err}`)
  // })
})

//demarrage du serveur
app.listen(port, () => {
  console.log(`The server started with succes on port ${port} `);
});