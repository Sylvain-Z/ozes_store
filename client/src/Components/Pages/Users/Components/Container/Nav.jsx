import { Link } from 'react-router-dom';

function DashboardNav() {
  return (
    <>
      <h2>Bienvenue sur votre tableau de bord</h2>
      <div className="usersnav">
        <Link to="/utilisateurs/votre-compte">Mes informations</Link>
        <Link to="/utilisateurs/vos-commandes">Mes commandes</Link>
        <Link to="/utilisateurs/sav-message">Service client</Link>
      </div>
    </>
  )
}

export default DashboardNav;