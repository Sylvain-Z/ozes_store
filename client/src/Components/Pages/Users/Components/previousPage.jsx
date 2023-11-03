import { Link } from 'react-router-dom';

function PreviousPage ({user}){

    return (
    <Link to={`/utilisateurs/${user.id}`}><p className="previous_page">Votre compte</p></Link>
    )
};

export default PreviousPage;