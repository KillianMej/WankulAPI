import x from '/x.png';
import steam from '/steam.png';
import discord from '/discord.png';
function footer() {
    return (
        <footer>
            <p>Fait par Lomudru</p>
            <p>Me contacter sur :</p>
            <ul>
                <li><a href="https://x.com/Lomudru" target='_blank'><img src={x} alt="logo de x" /></a></li>
                <li><a href="https://steamcommunity.com/profiles/76561198851918910/" target='_blank'><img src={steam} alt="logo de steam" /></a></li>
            </ul>
            <p>Ou sur le discord officiel Wankul :</p>
            <a href="https://discord.com/invite/serveur-wankul-officiel-le-jeu-de-cartes-a-1085680356243554304" target='_blank'><img src={discord} alt="logo de discord" /></a>
        </footer>
    )
}
export default footer;