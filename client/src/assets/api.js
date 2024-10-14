// Fonction fetch sans token

export const FETCH_URL = "/api/v1/";

/**
 * Fonction pour effectuer des requêtes GET vers une API.
 * @param {string} endpoint 
 * @returns {Promise<Object>}
 * @throws {Error}
 */
export async function fetchData(endpoint) {
    try {
        const response = await fetch(FETCH_URL + endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
        })
        // Gérer les erreurs HTTP comme 404 ou autres
        if (response.status === 404) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.status === 200) {
            return await response.json(); // Si tout est OK, renvoie les données JSON
        }
    } catch (error) {
        throw new Error("Erreur lors de la récupération des données : " + error.message);
    }
}