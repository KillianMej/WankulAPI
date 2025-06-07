import { NavLink } from 'react-router-dom';

type NavbarProps = {
  isMenuVisible: boolean;
  onNavClick: () => void;
};

function Navbar({ onNavClick }: NavbarProps) {
  const URL_API = import.meta.env.VITE_API_URL;

  return (
    <nav className="navbar">
      <p>Navigation</p>
      <ul>
        <li><NavLink onClick={onNavClick} to="/" className={({ isActive }) => isActive ? 'current' : ''}>Introduction</NavLink></li>
        <li><NavLink onClick={onNavClick} to="/cartes" className={({ isActive }) => isActive ? 'current' : ''}>Cartes</NavLink></li>
        <li><NavLink onClick={onNavClick} to="/saisons" className={({ isActive }) => isActive ? 'current' : ''}>Saisons</NavLink></li>
        <li><NavLink onClick={onNavClick} to="/effigies" className={({ isActive }) => isActive ? 'current' : ''}>Effigies</NavLink></li>
        <li><NavLink onClick={onNavClick} to="/artistes" className={({ isActive }) => isActive ? 'current' : ''}>Artistes</NavLink></li>
        <li><NavLink onClick={onNavClick} to="/raretes" className={({ isActive }) => isActive ? 'current' : ''}>Raretes</NavLink></li>
        <li><a href={`${URL_API}/docs`}>Swagger</a></li>
      </ul>
      <div>
        <p>Lien Site officiel</p>
        <ul>
          <li><a href="https://wankul.fr/">Wankul<span className='underlineEffect'></span></a></li>
          <li><a href="https://wankul.fr/pages/wankuldex">Wankuldex<span className="underlineEffect"></span></a></li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;