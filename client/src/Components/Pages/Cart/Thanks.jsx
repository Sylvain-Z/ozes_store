import { Link } from 'react-router-dom'

import Avis_Client_FB from '../../../assets/img/brand/Avis_Client_FB.png';
import Avis_Client_Insta from '../../../assets/img/brand/Avis_Client_Insta.png';

import BackToStore from '../Containers/BackToStore/Index';

function Thanks() {

    return (
        <>
            <section className='thanks'>
                <h2>Merci !</h2>

                <p>Toute l'équipe vous remercie pour votre achat</p>
                <p>Vous recevrez bientôt un mail de condirmation de votre commande</p>

                <article>
                    <h3>Laissez-nous un avis</h3>
                    <div className="community">
                        <div className="social_medias_links community_elements">
                            <figure>
                                <Link to="https://www.facebook.com/ozes.store/posts/pfbid0QP3b1QBvMXUqHpSYgTCficCJbZRQ6phbj7Q18D3bdtqbuYNe8kmx5194VDULsKYYl">
                                    <img className="avisfb" src={Avis_Client_FB} alt="Pictogramme Avis Client Facebook" />
                                    <figcaption>
                                        <p></p>
                                    </figcaption>
                                </Link>
                            </figure>
                            <figure>
                                <Link to="https://www.instagram.com/p/CKtIQ7vBxw-/">
                                    <img className="avisinsta" src={Avis_Client_Insta} alt="Pictogramme Avis Client Instagram" />
                                    <figcaption>
                                        <p></p>
                                    </figcaption>
                                </Link>
                            </figure>
                        </div>
                    </div>
                </article>

                <BackToStore />
            </section>



        </>

    )
}

export default Thanks;