import wankulLogo from '/WankulAPI.png';
import menuBurger from '/menu-burger-logo.svg';

function Header() {
    const menuBurgerLien = () => {
        const nav = document.querySelector("nav");
        if (nav) {
            nav.style.left = nav.style.left === "0px" ? "-100vw" : "0px";
        }
    }

    return (
        <header>
            <img src={menuBurger} alt="logo de menu burger" id="menuBurger" onClick={menuBurgerLien} />
            <div>
                <img src={wankulLogo} alt='logo du site' />
                <ul>
                    <li><a href="https://wankul.fr/">Site officiel Wankul<span className='underlineEffect'></span></a></li>
                    <li><a href="https://wankul.fr/pages/wankuldex">Wankuldex<span className="underlineEffect"></span></a></li>
                </ul>
            </div>
        </header>
    )
}
export default Header;