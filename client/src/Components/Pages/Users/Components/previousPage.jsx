import { Link } from 'react-router-dom';

function PreviousPage (){

    const goBack = () => window.history.back();

    return (
    <Link onClick={goBack}><p className="previous_page">Votre compte</p></Link>
    )
};

export default PreviousPage;