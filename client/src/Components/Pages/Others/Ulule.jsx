import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import BackToStore from '../Containers/BackToStore/Index';

import OeufUlule from '../../../assets/img/brand/OeufUlule_bulle.png';

function Ulule() {
    const params = useParams();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [params]);

    return (
        <>
            <article class="ulule_page">
                <h2 class="ulule_page_title">WALL OF FAME</h2>

                <figure>
                    <Link to="https://fr.ulule.com/ozes-store/">
                        <img src={OeufUlule} alt="Oeuf du site ulule sur fond bleu" />
                        <figcaption>
                            <p>Voir la campagne de financement participatif</p>
                        </figcaption></Link>
                </figure>

                <p>Si votre nom apparaît ici c'est que vous nous avez aidé pour le lancement de notre marque en contribuant pour notre campagne Ulule. Nous vous en remercions infiniment !</p>
                <p> Pour respecter votre anonymat nous ne mettons que votre prénom.</p>
                <ul>
                    <li>Amandine</li>
                    <li>Pascale</li>
                    <li>Céline</li>
                    <li>Myriam</li>
                    <li>Eric</li>
                    <li>Mathieu</li>
                    <li>Alliette</li>
                    <li>Fanny</li>
                    <li>Josée</li>
                    <li>Stéphanie</li>
                    <li>Iris</li>
                    <li>Helene</li>
                    <li>Aurélien</li>
                    <li>Déborah</li>
                    <li>Pierre</li>
                    <li>Laetitia</li>
                    <li>Nicolas</li>
                    <li>Grégory</li>
                    <li>Claudine</li>
                    <li>Nirina</li>
                    <li>Selim</li>
                    <li>Josianne</li>
                    <li>Maxime</li>
                    <li>Sindy</li>
                    <li>Nadine</li>
                    <li>Patrice</li>
                    <li>Amandine</li>
                    <li>Hélène</li>
                    <li>Philippe</li>
                    <li>Elsi</li>
                    <li>Cédric</li>
                    <li>Albane</li>
                    <li>Vincent</li>
                    <li>Antoine</li>
                    <li>Perrine</li>
                    <li>Franck</li>
                </ul>

                <h3>MERCI !</h3>

            </article>

            <BackToStore />
        </>

    )
}

export default Ulule;