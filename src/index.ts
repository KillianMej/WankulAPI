import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import { getCartes, getCartesBySaison, getSaisons, getSaisonByNom, getSaisonByNumero, getCarteByNom, getCarteByNumero, getCarteByNumeroAndSaison, getCarteByEffigie, getCarteByArtiste, getCarteByRarete, getEffigies, getArtistes, getRaretes } from './db';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Api non officielle du jeu de carte Wankul');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});

// =======================
// Recuperation des cartes
// =======================

// Recupération de toutes les cartes
app.get('/cartes', (req: Request, res: Response) => {
    getCartes()
        .then(cartes => {
            res.json(cartes);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des cartes:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des cartes' });
        });
});

// Récupération des cartes par saison
app.get('/cartes/:saison', (req: Request, res: Response) => {
    const saison = req.params.saison;
    getCartesBySaison(saison)
        .then(cartes => {
            if (Array.isArray(cartes) && cartes.length === 0) {
                return res.status(404).json({ error: `Aucune carte trouvée pour la saison ${saison}` });
            }
            res.json(cartes);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération des cartes pour la saison ${saison}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération des cartes pour la saison ${saison}` });
        });
});

// Récupération d'une carte par son nom
app.get('/cartes/nom/:nom', (req: Request, res: Response) => {
    const nom = req.params.nom.replace(/_/g, ' '); 
    getCarteByNom(`%${nom}%`)
        .then(carte => {
            if (Array.isArray(carte) && carte.length === 0) {
                return res.status(404).json({ error: `Carte ${nom} non trouvée` });
            }
            res.json(carte);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération de la carte ${nom}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération de la carte ${nom}` });
        });
});

// Recupération d'une carte par son numéro
app.get('/cartes/numero/:numero', (req: Request, res: Response) => {
    const numero = parseInt(req.params.numero);
    getCarteByNumero(numero)
        .then(carte => {
            if (Array.isArray(carte) && carte.length === 0) {
                return res.status(404).json({ error: `Carte numéro ${numero} non trouvée` });
            }
            res.json(carte);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération de la carte numéro ${numero}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération de la carte numéro ${numero}` });
        });
});

// Recupération d'une carte par son numéro et sa saison
app.get('/cartes/saison/:saison/numero/:numero', (req: Request, res: Response) => {
    const numero = parseInt(req.params.numero);
    const saison = parseInt(req.params.saison);
    getCarteByNumeroAndSaison(numero, saison)
        .then(carte => {
            if (Array.isArray(carte) && carte.length === 0) {
                return res.status(404).json({ error: `Carte numéro ${numero} pour la saison ${saison} non trouvée` });
            }
            res.json(carte);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération de la carte numéro ${numero} pour la saison ${saison}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération de la carte numéro ${numero} pour la saison ${saison}` });
        });
});

// Récupération des cartes par effigie
app.get('/cartes/effigie/:effigie', (req: Request, res: Response) => {
    const effigie = req.params.effigie;
    getCarteByEffigie(effigie)
        .then(cartes => {
            if (Array.isArray(cartes) && cartes.length === 0) {
                return res.status(404).json({ error: `Aucune carte trouvée pour l'effigie ${effigie}` });
            }
            res.json(cartes);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération des cartes pour l'effigie ${effigie}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération des cartes pour l'effigie ${effigie}` });
        });
});

// Récupération des cartes par artiste
app.get('/cartes/artiste/:artiste', (req: Request, res: Response) => {
    const artiste = req.params.artiste.replace(/_/g, ' '); 
    getCarteByArtiste(artiste)
        .then(cartes => {
            if (Array.isArray(cartes) && cartes.length === 0) {
                return res.status(404).json({ error: `Aucune carte trouvée pour l'artiste ${artiste}` });
            }
            res.json(cartes);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération des cartes pour l'artiste ${artiste}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération des cartes pour l'artiste ${artiste}` });
        });
});

// Récupération des cartes par rareté
app.get('/cartes/rarete/:rarete', (req: Request, res: Response) => {
    const rarete = req.params.rarete.replace(/_/g, ' ');
    getCarteByRarete(rarete)
        .then(cartes => {
            if (Array.isArray(cartes) && cartes.length === 0) {
                return res.status(404).json({ error: `Aucune carte trouvée pour la rareté ${rarete}` });
            }
            res.json(cartes);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération des cartes pour la rareté ${rarete}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération des cartes pour la rareté ${rarete}` });
        });
});


// ========================
// Recuperation des saisons 
// ========================

// Recupération des saisons
app.get('/saisons', (req: Request, res: Response) => {
    getSaisons()
        .then(saisons => {
            res.json(saisons);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des saisons:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des saisons' });
        });
});

// Recupération d'une saison par son nom
app.get('/saison/:nom', (req: Request, res: Response) => {
    const nom = req.params.nom;
    getSaisonByNom(nom)
        .then(saison => {
            if (!saison) {
                return res.status(404).json({ error: `Saison ${nom} non trouvée` });
            }
            res.json(saison);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération de la saison ${nom}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération de la saison ${nom}` });
        });
});

// Recupération d'une saison par son numéro
app.get('/saison/numero/:numero', (req: Request, res: Response) => {
    const numero = parseInt(req.params.numero);
    getSaisonByNumero(numero)
        .then(saison => {
            if (!saison) {
                return res.status(404).json({ error: `Saison numéro ${numero} non trouvée` });
            }
            res.json(saison);
        })
        .catch(err => {
            console.error(`Erreur lors de la récupération de la saison numéro ${numero}:`, err);
            res.status(500).json({ error: `Erreur lors de la récupération de la saison numéro ${numero}` });
        });
});

// ==============================================
// Recupération des effigies, artistes et raretés 
// ==============================================

// Récupération des effigies
app.get('/effigies', (req: Request, res: Response) => {
    getEffigies()
        .then(effigies => {
            res.json(effigies);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des effigies:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des effigies' });
        });
});

// Récupération des artistes
app.get('/artistes', (req: Request, res: Response) => {
    getArtistes()
        .then(artistes => {
            res.json(artistes);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des artistes:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des artistes' });
        });
});

// Récupération des raretés
app.get('/raretes', (req: Request, res: Response) => {
    getRaretes()
        .then(raretes => {
            res.json(raretes);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des raretés:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des raretés' });
        });
});