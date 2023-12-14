import { Link } from 'react-router-dom';

function PreviousPage() {

    return (
        <p className="previous_page"><Link to={`/employes`}>Retour au tableau de bord</Link></p>
    )
};

export default PreviousPage;