import dotenv from 'dotenv';
import e from 'express';
dotenv.config();

import { createPool, Pool } from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

let pool: Pool | null = null;

const getDbPool = () => {
    if (!pool) {
        pool = createPool(dbConfig);
    }
    return pool;
};

// ===================================
// Fonctions pour récupérer les cartes
// ===================================

export async function getCartes() {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id  UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id ORDER BY CASE WHEN numero_saison = 0 THEN 1 ELSE 0 END, numero_saison ASC, CONVERT(numero, SIGNED INTEGER) ASC");
    return rows;
}

export async function getCartesBySaison(saison: string){
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE s.nom = ? UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE s.nom = ? ORDER BY CONVERT(numero, SIGNED INTEGER) ASC", [saison, saison]);
    return rows;
}

export async function getCarteByNom(nom: string) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE ci.titre LIKE ? UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE ci.titre LIKE ? ORDER BY CASE WHEN numero_saison = 0 THEN 1 ELSE 0 END, numero_saison ASC, CONVERT(numero, SIGNED INTEGER) ASC", [nom, nom]);
    return rows;
}

export async function getCarteByNumero(numero: number) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE ci.numero = ? UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE ci.numero = ? ORDER BY CASE WHEN numero_saison = 0 THEN 1 ELSE 0 END, numero_saison ASC", [numero.toString(), numero.toString()]);
    return rows;
}

export async function getCarteByNumeroAndSaison(numero: number, saison: number) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE ci.numero = ? AND s.numero = ? UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE ci.numero = ? AND s.numero = ?", [numero.toString(), saison, numero.toString(), saison]);
    return rows;
}

export async function getCarteByEffigie(effigie: string) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE e.nom = ? UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE e.nom = ? ORDER BY CASE WHEN numero_saison = 0 THEN 1 ELSE 0 END, numero_saison ASC, CONVERT(numero, SIGNED INTEGER) ASC", [effigie, effigie]);
    return rows;
}

export async function getCarteByArtiste(artiste: string) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE a.nom = ? UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE a.nom = ? ORDER BY CASE WHEN numero_saison = 0 THEN 1 ELSE 0 END, numero_saison ASC, CONVERT(numero, SIGNED INTEGER) ASC", [artiste, artiste]);
    return rows;
}

export async function getCarteByRarete(rarete: string) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT carte image, regle, combo, citation, NULL effet_gagnant, NULL effet_perdant, NULL effet_special, titre, s.nom saison, s.numero numero_saison, ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM carte c LEFT JOIN carte_info ci ON c.carte_info=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE r.nom = ? UNION ALL SELECT carte image, NULL regle, NULL combo, NULL citation, effet_gagnant, effet_perdant, effet_special, titre, s.nom saison, s.numero numero_saison , ci.numero numero, e.nom effigie, a.nom artiste, r.nom rarete, r.drop taux_de_drop, cout, `force` FROM terrain t LEFT JOIN carte_info ci ON t.info_carte=ci.id LEFT JOIN saison s ON ci.saison=s.id LEFT JOIN effigie e ON ci.effigie=e.id LEFT JOIN artiste a ON ci.artiste=a.id LEFT JOIN rarete r ON ci.rarete=r.id WHERE r.nom = ? ORDER BY CASE WHEN numero_saison = 0 THEN 1 ELSE 0 END, numero_saison ASC, CONVERT(numero, SIGNED INTEGER) ASC", [rarete, rarete]);
    return rows;
}


// ====================================
// Fonctions pour récupérer les saisons 
// ====================================

export async function getSaisons() {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT nom saison, numero, nbr_Carte FROM saison s ORDER BY CASE WHEN numero = 0 THEN 1 ELSE 0 END, numero ASC");
    return rows;
}

export async function getSaisonByNom(nom: string) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT nom saison, numero, nbr_Carte FROM saison s WHERE nom = ?", [nom]);
    return rows;
}

export async function getSaisonByNumero(numero: number) {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT nom saison, numero, nbr_Carte FROM saison s WHERE numero = ?", [numero]);
    return rows;
}

// =========================================================
// Fonction pour recuperer les effigies, artistes et raretés
// =========================================================

export async function getEffigies() {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT nom effigie FROM effigie ORDER BY nom ASC");
    return rows;
}

export async function getArtistes() {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT nom artiste FROM artiste ORDER BY nom ASC");
    return rows;
}

export async function getRaretes() {
    const dbPool = getDbPool();
    const [rows] = await dbPool.query("SELECT nom rarete, `drop` taux_de_drop FROM rarete ORDER BY id ASC");
    return rows;
}