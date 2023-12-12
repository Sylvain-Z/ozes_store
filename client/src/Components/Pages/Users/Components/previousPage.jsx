import { Link } from 'react-router-dom';

function PreviousPage({ user }) {

    return (
        <p className="previous_page"><Link to={`/utilisateurs/${user.id}`}>Votre compte</Link></p>
    )
};

export default PreviousPage;