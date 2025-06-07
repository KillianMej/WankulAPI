import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { getCartes, getSaisons, getEffigies, getArtistes, getRaretes } from './db';
dotenv.config();

const app = express();

app.use(express.json());

// Configuration de Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    const saison = req.query.saison ? req.query.saison.toString().replace("_", " ") : undefined;
    const saison_numero = req.query.saison_numero ? req.query.saison_numero.toString() : undefined;
    const nom = req.query.nom ? req.query.nom.toString().replace("_", " ") : undefined;
    const numero = req.query.numero ? req.query.numero.toString() : undefined;
    const effigie = req.query.effigie ? req.query.effigie.toString().replace("_", " ") : undefined;
    const artiste = req.query.artiste ? req.query.artiste.toString().replace("_", " ") : undefined;
    const rarete = req.query.rarete ? req.query.rarete.toString().replace("_", " ") : undefined;

    getCartes(saison, saison_numero, nom, numero, effigie, artiste, rarete)
        .then(cartes => {
            if (Array.isArray(cartes) && cartes.length === 0) {
                return res.status(404).json({ error: 'Aucune carte trouvée' });
            }
            res.json(cartes);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des cartes:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des cartes' });
        });
});

// ========================
// Recuperation des saisons 
// ========================

// Recupération des saisons
app.get('/saisons', (req: Request, res: Response) => {
    const saison = req.query.saison ? req.query.saison.toString().replace("_", " ") : undefined;
    const saison_numero = req.query.saison_numero ? req.query.saison_numero.toString() : undefined;
    const nbr_Cartes = req.query.nbr_cartes ? parseInt(req.query.nbr_cartes.toString(), 10) : undefined;
    getSaisons(saison, saison_numero, nbr_Cartes)
        .then(saisons => {
            if (Array.isArray(saisons) && saisons.length === 0) {
                return res.status(404).json({ error: 'Aucune saison trouvée' });
            }
            res.json(saisons);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des saisons:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des saisons' });
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