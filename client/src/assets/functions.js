// paramétres de la mise en local d'élément avec un délai d'expiration

export const setItemWithExpiration = (key, value, expirationInMinutes) => {
    const now = new Date();
    const expirationTime = now.getTime() + expirationInMinutes * 60 * 1000; // Convertir les minutes en millisecondes

    const item = {
        value: value,
        expiration: expirationTime,
    };

    localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiration = (key) => {
    const itemString = localStorage.getItem(key);

    if (!itemString) {
        return null;
    }

    const item = JSON.parse(itemString);
    const now = new Date().getTime();

    if (now > item.expiration) {
        // Les données ont expiré, supprimez-les et renvoyez null
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
};

// Exemple d'utilisation
// const key = 'myData';
// const value = 'someValue';
// const expirationInMinutes = 30; // Expiration dans 30 minutes

// Enregistrez les données avec expiration
// setItemWithExpiration(key, value, expirationInMinutes);

// Récupérez les données (elles seront null si elles ont expiré)
// const retrievedValue = getItemWithExpiration(key);
// console.log(retrievedValue);