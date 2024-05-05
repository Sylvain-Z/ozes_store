import { Link } from 'react-router-dom';
import Back from '../../../../assets/img/Back.png';

function BackToStore (){

    return (
        <>
        <figure className="back_to_store">
			<Link to="/le_store">
				<img src={Back} alt="photo de t-shirt de plusieurs couleurs sur des cintres" />
				<figcaption>
					<p>Retour Boutique</p>
				</figcaption>
			</Link>
		</figure>
        </>
    )
}

export default BackToStore;