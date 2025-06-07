import { useState, useEffect } from 'react';

function Cards() {
    const URL_API = import.meta.env.VITE_API_URL;

    const [apiUrl, setApiUrl] = useState('');
    const [result, setResult] = useState<any>(null);
    useEffect(() => {
        setApiUrl("/cartes?saison=origins&numero=1");
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const fullUrl = apiUrl.startsWith('/') ? URL_API + apiUrl : URL_API + '/' + apiUrl;
            const response = await fetch(fullUrl);
            const data = await response.json();
            console.log(fullUrl);
            setResult(data);
        } catch (error) {
            setResult({ error: 'Une erreur est survenue' });
        }
    };


    return (
        <section>
            <h3>Cartes <span></span></h3>
            <p>Renvoie la/les cartes correspondante aux paramètres rentrés.</p>
            <p>Si aucun paramètre n’est précisé dans la requête, toutes les cartes sont renvoyées.</p>
            <p>Remplace les espaces dans les paramètres par un _ (underscore).</p>
            <p>Paramètres disponibles :</p>
            <ul>
                <li>saison <span>Nom de la saison</span></li>
                <li>saison_numero <span>Numéro de la saison</span></li>
                <li>nom <span>Nom de la carte</span></li>
                <li>numero <span>Numéro de la carte</span></li>
                <li>effigie <span>Effigie de la carte</span></li>
                <li>artiste <span>Artiste de la carte</span></li>
                <li>rarete <span>Niveau de rareté de la carte</span></li>
            </ul>
            <div className="get">
                <div>
                    <p className='type'>get</p>
                    <p className='requete'>/cartes</p>
                </div>
                <div>
                    <h4>Requete :</h4>
                    <form onSubmit={handleSubmit} className="api-form" id='apicarte'>
                        <input
                            type="text"
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            className='requete'
                        />
                    </form>
                    <h4>Résultat :</h4>
                    <pre>{result && (JSON.stringify(result, null, 2))}</pre>
                    <input type="submit" form="apicarte" value="Essayer"/>
                </div>
            </div>
        </section>
    );
}

export default Cards;