import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { FETCH_URL } from '../../../assets/const';

function PaymentForm() {
  
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {  // envoie la commande en BDD si l'usager n'est pas connecté
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("Token Généré: ", paymentMethod);
      // envoie du token au backend
      try {
        const { id } = paymentMethod;
        const response = await fetch(FETCH_URL + "stripe/charge", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount, id: id, returnUrl : "http://localhost:3000/le_store"}),  // mettre à jour l'url 
        });
        if (response.formData.success) {
          console.log("paiement réussi")
        }
      } catch (error) {
        throw Error(error);
      };
    } else {
      console.log("Erreur", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode : true }} />
        <button type="submit">
          Payer
        </button>
      </form>
    </>
      
  )

  };


export default PaymentForm;