import Store from '../../../assets/img/Store.jpg';
import Drapeau_FR from '../../../assets/img/Drapeau_FR.png';
import Drapeau_RUN from '../../../assets/img/Drapeau_RUN.png';
import ProductGalery from './ProductGalery';

function Shop (){

    return (
        <>
                <section>
                    <h2 className="store_page_title">Le store</h2>

                    <img className="store_page_main_images" src={Store} alt="T-shirts accrochés à un portant à vêtements"/>

                    <div className="shipping_costs">
                        <img className="Drapeau_FR" src={Drapeau_FR} alt="Drapeau français"/>
                        <p>Les frais de ports vous sont offerts en <strong>France Métropolitaine à partir de 50 euros</strong> de commande.<br/>
                        Les frais de ports vous sont offerts en <strong>Département d'Outre-Mer et le Reste du Monde à partir de 70 euros</strong> de commande.</p>
                        <img className="Drapeau_RUN" src={Drapeau_RUN} alt="Drapeau de l'île de la Réunion"/>
                    </div>

                    <article>
                        <h3>Nos Produits</h3>

                        <ProductGalery />

                    </article>

                </section>
        </>
    )
}

export default Shop;