import { Link } from 'react-router-dom';
import cart_empty from '../../../../assets/img/cart_empty.png';

function BackToCart (){

    return (
        <>
        <figure className="back_to_cart">
			<Link to="/panier/info-livraison">
				<img src={cart_empty} alt="pictogramme de panier" />
				<figcaption>
					<p>Retour au panier</p>
				</figcaption>
			</Link>
		</figure>
        </>
    )
}

export default BackToCart;