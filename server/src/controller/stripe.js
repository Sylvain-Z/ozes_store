import stripePackage  from "stripe";

const stripe = stripePackage(process.env.SK_STRIPE);

const Charge = async (req, res) => {
    let msg ="";
    let { amount, id , returnUrl } = req.body;

    try {

        if (!amount || !id) {
            throw new Error("Les données fournies sont incomplètes.");
        }
        
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "EUR",
            description: " Ozes Store",
            payment_method: id,
            confirm: true,
            return_url: returnUrl,
        })

        msg = "Paiement réussi";
        res.json({ msg, success: true })

    } catch (error) {
        console.error("Erreur de paiement :", error.message);
        res.status(500).json({ msg: "Échec du paiement", success: false, error: error.message });
    }
};

export { Charge };