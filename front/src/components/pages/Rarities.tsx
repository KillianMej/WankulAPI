import { useState, useEffect } from "react";

function Rarities() {
    const URL_API = import.meta.env.VITE_API_URL;

    const [apiUrl, setApiUrl] = useState('');
    const [result, setResult] = useState<any>(null);
    useEffect(() => {
        setApiUrl("/raretes");
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
            <h3>Rarete <span></span></h3>
            <p>Renvoie tous les niveaux de rareté avec leurs taux de drop en pourcentage.</p>
            <p>Il n'y a aucun paramètre pour cette requête</p>
            <div className="get">
                <div>
                    <p className='type'>get</p>
                    <p className='requete'>/raretes</p>
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

export default Rarities;