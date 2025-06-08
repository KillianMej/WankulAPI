function Intro(){
    const exempleJsonCarte = `[
    {
        "image": "",
        "regle": "",
        "combo": "",
        "citation": "",
        "effet_gagnant": "",
        "effet_perdant": "",
        "effet_special": "",
        "titre": "",
        "saison": "",
        "numero_saison": 0,
        "numero": "",
        "effigie": "",
        "artiste": "",
        "rarete": "",
        "taux_de_drop": "",
        "cout": 0,
        "force": 0
    }
]`;
    const exempleJsonSaison = `[
  {
    "saison": "",
    "numero": 0,
    "nbr_Carte": 0
  }
]`;
    const exempleJsonEffigie = `[
  {
    "effigie": ""
  }
]`;
    const exempleJsonArtiste = `[
  {
    "artiste": ""
  }
]`;
    const exempleJsonRarete = `[
  {
    "rarete": "",
    "taux_de_drop": ""
  }
]`

    return(
        <section>
            <h3>Introduction <span></span></h3>
            <p>Wankul API est une API permettant la récupération de toutes les cartes Wankul et autres informations relatives à Wankul</p>
            <p>Pour faire un appel a l'API il appeler <span className="requete">https://api.wankulapi-unofficial.fr</span></p>
            <p>Elle renvoie les informations demandées sous forme de JSON</p>
            <p>Voici la mise en forme du JSON pour la récupération des cartes</p>
            <pre className="requete">{exempleJsonCarte}</pre>
            <p>Dans le cas où la carte que vous récupérez est une carte terrain, les champs règle, combo et citation seront nuls et le coût et la force seront à 0.</p>
            <p>Dans le cas où la carte n'est pas une carte terrain, les champs effet_gagnant, effet_perdant et effet_special seront nuls</p>
            <p>Pour la récupération des saisons, la forme du JSON sera de cette façon</p>
            <pre className="requete">{exempleJsonSaison}</pre>
            <p>Pour les effigies, le JSON sera :</p>
            <pre className="requete">{exempleJsonEffigie}</pre>
            <p>Pour les artistes, le JSON sera :</p>
            <pre className="requete">{exempleJsonArtiste}</pre>
            <p>Pour les raretes, le JSON sera :</p>
            <pre className="requete">{exempleJsonRarete}</pre>
        </section>
    );
}

export default Intro;