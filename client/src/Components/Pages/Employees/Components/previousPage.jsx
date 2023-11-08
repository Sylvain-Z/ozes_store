import { Link } from 'react-router-dom';

function PreviousPage ({employee}){

    return (
    <Link to={`/employes`}><p className="previous_page">Votre compte</p></Link>
    )
};

export default PreviousPage;