import { useEffect, useState } from "react";

function Seasons() {
    const URL_API = import.meta.env.VITE_API_URL;

    const [apiUrl, setApiUrl] = useState('');
    const [result, setResult] = useState<any>(null);
    useEffect(() => {
        setApiUrl("/saisons?saison=origins");
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
            <h3>Saisons <span></span></h3>
            <p>Renvoie la/les saisons correspondantes au paramètres rentrés.</p>
            <p>Si aucun paramètre n’est précisé dans la requête, toutes les saisons sont renvoyées.</p>
            <p>Remplace les espaces dans les paramètres par un _ (underscore).</p>
            <p>Paramètres disponibles :</p>
            <ul>
                <li>saison <span>Nom de la saison</span></li>
                <li>saison_numero <span>Numéro de la saison</span></li>
                <li>nbr_cartes <span>Nombre de cartes de la saison</span></li>
            </ul>
            <div className="get">
                <div>
                    <p className='type'>get</p>
                    <p className='requete'>/saisons</p>
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

export default Seasons;