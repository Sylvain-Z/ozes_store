import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import BackToStore from '../Containers/BackToStore/Index';

function CguCgv() {
    const params = useParams();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [params]);

    return (
        <>
            <section class="cgv">

                <h2>Conditions générales d'utilisation et vente</h2>
                <p>Le client déclare avoir pris connaissance et avoir accepté les conditions générales de vente antérieurement à la passation de sa commande. La validation de la commande vaut donc acceptation des conditions générales de vente. Les conditions ne concernent que les achats effectués sur le site de ozes-store.com .</p>
                <p>La société OZES Store se réserve le droit d'adapter ou modifier à tout moment les présentes CGV sans préavis. La version des CGV applicable à toute vente étant celle figurant sur notre site au moment de la commande.</p>

                <article>
                    <h3>APPLICATION DES CONDITIONS GENERALES DE VENTE</h3>
                    <p>Les présentes conditions générales de vente (ci-après « CGV ») s'appliquent dans leurs versions en vigueur au moment de la commande, à toutes les personnes (ci-après « client ») visitant le site internet ou passant commande sur le présent site <strong>www.ozes-store.com</strong> et définissent les droits et obligations de la Société OZES Store ainsi que du client.</p>
                </article>

                <article>
                    <h3>CONDITIONS D'ACCES A L'ESPACE MEMBRE</h3>
                    <p>Seule une personne physique âgée d'au moins dix-huit (18) ans, non placée sous tutelle ou curatelle, n'agissant pas en qualité d'entreprise peut passer commande. L'inscription sur notre site est gratuite et résiliable à tout moment. Chaque Client ne peut ouvrir qu'un seul compte client. Lors de la création de votre compte, et/ou passage de votre commande, vous vous engagez à fournir des informations exactes et complètes. L'identifiant et mot de passe permettant l'accès à votre compte sont confidentiels et ne doivent être en aucun cas divulgués à un tiers. Dans le cas contraire, OZES Store ne pourra être tenu responsable des possibles conséquences qui en découleraient.
                    </p>
                    <p>Par la présente vous vous engagez à vous abstenir de toute perturbation de notre site, et de toute utilisation allant au-delà d'une simple consultation en ligne des données figurant sur ce site. Vous comprenez et acceptez de ne pas publier, transmettre, redistribuer, charger ou promouvoir toute communication ou tout contenu susceptible de nuire à nos activités, nos produits ou nos services, ou toute autre manipulation illicite de notre site dans un quelconque but. Nous nous réservons le droit de bannir l'accès au site immédiatement et de fermer le compte de tout utilisateur violant ces dispositions ou toute autre disposition des présentes conditions générales d'utilisation. Des poursuites judiciaires pourront également être engagées à l'encontre de cet utilisateur si nécessaire.
                    </p>
                </article>

                <article>
                    <h3>SECURITE DES INFORMATIONS</h3>
                    <p> Vous pouvez visiter notre site internet www.ozes-store.com sans avoir à communiquer vos informations personnelles. Vous restez anonyme tout au long de votre visite. Le seul moyen pour OZES Store de savoir que vous êtes en ligne est que vous vous connectiez à votre compte personnel à l'aide de votre nom d'utilisateur et votre mot de passe.
                    </p>
                    <p> Les informations et données collectées par la société OZES Store lors de l'inscription ou d'une commande du client sont seulement nécessaires à la gestion des commandes et à cet effet, pourront être communiquées en tout ou en partie seulement aux prestataires de la société OZES Store intervenant dans le cadre de l'exécution/traitement de la commande. Ces données pourront être également collectées par un organisme en charge d'analyser les commandes et de lutter contre la fraude à la carte bancaire.
                    </p>
                    <p> Lorsque vous passez commande sur notre site internet, vous nous donnez donc votre accord pour utiliser vos informations personnelles telles que : votre adresse, votre numéro de téléphone dès lors que ces informations sont utilisées dans le cadre de la prise en charge de votre commande.
                    </p>
                    <p> Ce droit est également valable auprès des prestataires de la société OZES Store responsables de la prise en charge de votre commande.
                    </p>
                    <p> Vos données personnelles sont protégées, et ne seront en aucun cas transmises à des entreprises qui n'auraient aucun rapport avec le traitement de votre commande. La société OZES Store veille également à ne pas divulguer votre adresse à des organismes publicitaires sans votre accord.
                    </p>
                    <p> Vous pouvez également demander à tout moment à supprimer vos données personnelles de notre base de données. Cette procédure aura également comme conséquence la suppression intégrale de votre compte personnel.
                    </p>
                    <p>Le site www.ozes-store.com dispose du système 3D secure qui permet la sécurité de vos transactions et coordonnées bancaires (système qui dépend de l'accord avec votre banque ainsi que du montant de votre panier).
                    </p>
                </article>

                <article>
                    <h3>PRODUITS ET DISPONIBILITES</h3>
                    <p> Les offres de produits et prix sont valables dans la limite des stocks disponibles. Les ventes sont conclues sous réserve de la disponibilité effective des produits. Dans l'éventualité où un produit commandé se révélerait indisponible, le ou les articles indisponible(s) sera/seront remboursé(s) sous forme monétaire ou d'avoir selon la volonté du client.</p>
                </article>

                <article>
                    <h3>PRIX ET MODE DE PAIEMENT</h3>
                    <p>Le prix des produits est indiqué en euros (€) toutes taxes comprises (TTC : TVA légale incluse 20%) pour toutes destinations confondues, hors participations aux frais de port, hors frais de douane.
                    </p>
                    <p> OZES Store se réserve le droit de modifier ses prix à tout moment et sans préavis. Cependant, les produits seront facturés sur la base des tarifs en vigueur au moment de l'enregistrement de la commande, sous réserve de disponibilité.
                    </p>
                    Le règlement des commandes s'effectue par :
                    <ul><li>Carte bancaire « Visa », « Mastercard », ou « American express ». Le débit de la carte est effectué comptant le jour de la commande effective</li>
                        <li> Paypal</li>
                    </ul>
                    <p> Notre site internet dispose du système de sécurité 3D secure pour les commandes d'un montant supérieur ou égal à cinquante euros (50 €) (valable selon votre agence bancaire). Ainsi, une procédure supplémentaire apparaîtra, et un code vous sera  demandé afin de valider votre commande. Ce code vous sera envoyé par SMS. Il sera à inscrire dans le cadre prévu à cet effet.
                    </p>
                </article>

                <article>
                    <h3>PASSAGE DE COMMANDE/CONCLUSION DU CONTRAT</h3>
                    <p>Les commandes s'effectuent exclusivement sur le site www.ozes-store.com. Une fois que vous avez passé la commande, vous recevrez un e-mail de confirmation (à condition de nous avoir préalablement communiqué une adresse e-mail valide).
                    </p>
                    <p> A cet effet, le Client accepte sans réserve l'usage du courrier électronique pour la confirmation par la société OZES Store du contenu de sa commande.
                    </p>
                    <p> OZES Store se réserve le droit de refuser les commandes émanant d'un Client avec lequel existerait un litige ou un incident relatif au paiement d'une commande antérieure.
                    </p>
                    <p> Le contrat légal de vente entre OZES Store et le client sera conclu lorsque le client cliquera sur le bouton lui permettant de confirmer et payer sa commande après avoir préalablement visualisé le détail de celle-ci. Le client déclare alors avoir pris connaissance et être d'accord avec le prix total de ses articles ainsi que des références commandées sur notre site, et avoir eu la possibilité de corriger/ signaler d'éventuelles erreurs. Après votre achat, votre facture sera disponible sur votre espace personnel et téléchargeable à tout moment. le client. Elle ne peut être remise en cause que dans les limites prévues dans les CGV.
                    </p>
                </article>

                <article>
                    <h3>LIVRAISON</h3>
                    <p>Les frais de port seront calculés et indiqués au moment de la validation du panier.</p>
                    <p> Le prix des frais de port est calculé selon notre barème, et variable selon : le poids de votre/vos articles, la méthode de livraison choisie, et le pays de destination de votre colis. Ils comprennent également : les frais de manutention, de stockage, et d'emballage de vos articles. Pour consulter les tarifs de livraison, merci de consulter le document nommé : « Livraison et tarifs » disponible sur notre site.
                    </p>
                    <p> Les produits commandés seront expédiés à l'adresse que vous aurez préalablement indiquée au cours du processus de votre commande. Nous nous engageons à livrer la marchandise commandée sur notre site www.ozes-store.com dans les meilleurs délais à compter de la réception de votre paiement.
                    </p>
                    Vous avez la possibilité de vous faire livrer votre colis :
                    <ul><li>À domicile Sans Signature</li>
                        <li>À domicile Avec Signature</li>
                        <li>À domicile à l'île de la Réunion, en Guadeloupe et en Martinique.</li>
                    </ul>
                    <p> Les délais de traitement et de livraison indiqués s'entendent en jours ouvrés.</p>

                    <p> Concernant la livraison à domicile, si le destinataire (vous), est absent lors du passage du transporteur, votre colis sera alors déposé dans votre bureau de poste de proximité. Il sera à récupérer par vos soins (n'oubliez pas d'apporter votre avis de passage et votre pièce d'identité).
                    </p>
                    <p> Vous pouvez retrouver toutes les informations nécessaires au suivi de votre colis ici : https://www.laposte.fr/particulier/outils/suivre-vos-envois. Dans le cas où vous avez un problème concernant la livraison ou le suivi de votre colis, merci de contacter le plus rapidement possible notre service client, ou par mail à cette adresse : ozes.store@gmail.com La livraison ne peut être effectuée ni dans des hôtels ni à des boîtes postales. OZES Store décline toute responsabilité concernant les retards de livraison, ou de perte, si vous avez indiqué : un nom/prénom incorrect, une adresse incomplète ou erronée, un numéro de téléphone/ une adresse mail erroné, ou dans le cas d'un non-retrait de la marchandise dans le délai prévu à cet effet, ou si vous avez choisi le mode de livraison « sans signature » et qu'après enquête, l'agent de « Colissimo La poste » confirme vous avoir livré conformément votre colis.
                    </p>
                    <p> La société OZES Store ne pourra être tenue responsable des conséquences dues à un retard d'acheminement n'étant pas de son ressort tel que : les retards internes à Colissimo ou toute autre société de transport.
                    </p>
                    <p> En cas de délai de livraison anormalement long, le Client peut contacter le service client et/ou le transporteur afin qu'une enquête soit ouverte. clôture de l'enquête.
                    </p>
                    <p> En cas de colis/ produits endommagés, le Client s'engage à notifier immédiatement au moment de la livraison au transporteur en question, et refuser le colis si toutefois celui-ci serait fortement endommagé. Merci également de nous tenir informé via notre service client.
                    </p>
                </article>

                <article>
                    <h3>DROIT DE RETRACTATION ET RETOURS</h3>
                    <p> Conformément à la loi Hamon de 2014, nos clients bénéficient d'un délai de quatorze (14) jours à compter
                        de la date de réception du colis pour faire valoir leur droit de rétractation sans justification ou
                        pénalités.
                    </p>
                    <p> Elle précise notamment que l'article retourné doit impérativement être en parfait état de revente
                        permettant la commercialisation à l'état neuf. Qu'il doit être placé dans son emballage d'origine,
                        accompagné de son étiquette, et non utilisé, sans présence de tâche et odeur quelconque.
                    </p>
                    <p> Dans le cas où vous retournerez un article non conforme à notre politique de retour, nous ne pourrons traiter votre demande (échange, remboursement ou avoir). Si vous souhaitez récupérer votre article, il sera alors nécessaire de payer à nouveau les frais de port. Ne pourront également être repris tous colis pour lesquels aucun élément ne permet d'identifier l'expéditeur (nom, prénom, adresse, numéro de commande, formulaire de retour). La notification de l'exercice du droit de rétractation doit nous être adressée via notre service client ou par mail à : ozes.store@gmail.com . Les frais de retour sont exclusivement à votre charge (sauf erreur de notre part ou marchandise défectueuse). En cas d'exercice du droit de rétractation dans le délai accordé, les sommes versées lors de la commande seront intégralement remboursées au client par virement bancaire au plus tard dans les trente (30) jours suivant la date à laquelle le droit de rétractation a été exercé (hors frais de port sauf erreur de notre part). Dans ce cas, il est également possible que le client se fasse rembourser sous forme d'avoir s'il le souhaite. L'avoir sera effectué au plus tard dans les trente (30) jours suivant la date à laquelle le droit de rétractation a été exercé (la somme mise sous forme d'avoir ne comprend pas les frais de port).
                    </p>
                </article>

                <article>
                    <h3></h3>
                    <p> Le site www.ozes-store.com est une création protégée par la loi et la réglementation en matière de propriété intellectuelle. Son contenu, ses textes, ses photographies, et ses illustrations sont strictement réservés au titre du droit d'auteur ainsi qu'au titre de la propriété intellectuelle.
                    </p>
                    <p> OZES est une marque déposée à l'INPI. Toute reproduction, contrefaçons, copies, ou utilisation des photographies du site est interdite et sanctionnable.
                    </p>
                    <p> Ces actes seront considérés comme portants atteinte à un droit exclusif de la propriété intellectuelle. Toute activité mettant en péril la propriété exclusive de OZES Store donnera alors lieu à des poursuites judiciaires.
                    </p>
                </article>

                <article>
                    <h3>DROIT APPLICABLE</h3>
                    <p> Le site ozes-store.com est soumis à la législation française et aux lois du code de la consommation.</p>
                    <p> Le contrat formé par l'acceptation des présentes Conditions Générales de Vente lors de la commande est soumis à la loi française.</p>
                    <p> En cas de litige, les tribunaux français seront seuls compétents.</p>
                    <p> Le Client peut en cas de réclamation suite à une commande s'adresser au service client pour trouver une solution à l'amiable.
                    </p>
                </article>

            </section>

            <BackToStore />
        </>

    )
}

export default CguCgv;