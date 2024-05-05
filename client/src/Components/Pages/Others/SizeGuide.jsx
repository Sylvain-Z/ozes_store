import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BackToStore from '../Containers/BackToStore/Index'
import Guide from '../../../assets/img/Guide.jpg'
import Guide_Ronds from '../../../assets/img/Guide_Ronds.jpg'

function SizeGuide() {
    const params = useParams();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [params]);

    return (

        <>
            <section>
                <h2 className="size_guide_title">Guide des tailles</h2>

                <div className="size_guide">

                    <div className="size_guide_t-shirts">

                        <article>
                            <h3>Guide t-shirts Homme</h3>
                            <h4>Tour de poitrine</h4>
                            <p>S : 90-94cm</p>
                            <p>M : 94-98</p>
                            <p>L : 98-102</p>
                            <p>XL : 102-106</p>
                        </article>

                        <article>
                            <h3>Guide t-shirts Femme</h3>
                            <h4>Tour de poitrine</h4>
                            <p>S : 87-91cm</p>
                            <p>M : 91-96</p>
                            <p>L : 96-100</p>
                            <p>XL : 100-104</p>
                        </article>
                    </div>

                    <p className="warning">Les tailles indiquées ci-dessus peuvent varier +/- 2 cm. Si vous souhaitez obtenir plus de mensurations, ou obtenir une aide concernant le choix de votre taille, merci de contacter le service client.
                    </p>

                    <div className="size_guide_rings">

                        <img src={Guide} alt="Tableau de convertion de taille de doigts" />

                        <img src={Guide_Ronds} alt="Tableau de taille de diamètre de bagues" />

                        <p>Vous pouvez télécharger les images ci-dessus</p>

                    </div>
                </div>

                <BackToStore />

            </section>

        </>
    )
}

export default SizeGuide;