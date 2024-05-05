import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Drapeau_Ozes from '../../../assets/img/brand/Drapeau_Insta_Bulle.png';
import OeufUlule from '../../../assets/img/brand/OeufUlule_bulle.png';
import Avis_Client_FB from '../../../assets/img/brand/Avis_Client_FB.png';
import Avis_Client_Insta from '../../../assets/img/brand/Avis_Client_Insta.png';

import BackToStore from '../Containers/BackToStore/Index';
import ContactForm from '../Containers/ContactForm/Index'

function Brand() {
    const params = useParams();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [params]);

	return (
		<>
			<article>
				<h2>La marque</h2>

				<div className="brand">

					<img className="brand_logo" src={Drapeau_Ozes} alt="Logo avec un paille en queue incrusté" />

					<div className="history">
						<p>Ozes c'est l'histoire d'un frère et d'une sœur, nés à la Réunion, passionnés par la création. L'une a évolué dans l'univers de la mode et du stylisme, l'autre est Designer.
							Le choix de se lancer dans la création d'une marque de textile en a découlé. Le nom Ozes s'est imposé à nous comme pour nous dire “Allez, osez le faire, réalisez votre rêve ! ”.</p>
						<p>Nous sommes fiers de notre île de la Réunion, un bel exemple de métissages. Nous voulons véhiculer un message de tolérance, d'acceptation des différences. Nous croyons au partage des émotions, que la mixité des cultures est une richesse, que la différence de caractères est une force. Chaque individu est libre de faire ses choix et d'entreprendre les projets qui lui sont chers. Il faut toujours un peu d'audace, un brin de folie pour aller de l'avant et réaliser ses rêves.</p>
						<p>Le symbole de notre logo ? Un oiseau : le paille en queue, oiseau endémique de la Réunion. Un oiseau un peu sauvage mais exceptionnellement beau, élancé, libre comme le vent. Il glisse dans le ciel qui n'a pas de limites, tout comme le champ des possibilités de la vie.</p>
						<p>Tout est réalisable si on le souhaite vraiment.</p>
						<p>Il faut s'affirmer là où on est et faire entendre sa voix.</p>
						<p>Chaque personne est unique et riche de tout ce qu'elle est. Les rencontres, les voyages, les passions de toutes sortes, un sourire, la santé, l'amitié, l'amour, faire la fête, rien de mieux : « Ose être toi ! »</p>
					</div>
				</div>
			</article>

			<article>
				<h2 className="community_title">La communauté</h2>

				<div className="community">
					<div className="ulule_bulle community_elements">
						<figure><Link to="/ulule">
							<img src={OeufUlule} alt="Oeuf du site ulule sur fond bleu" />
							<figcaption>
								<p>WALL OF FAME</p>
							</figcaption></Link>
						</figure>
					</div>

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

			<ContactForm />

			<BackToStore />

		</>
	)

};

export default Brand;