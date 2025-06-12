import {Traza} from "./types/traza-types.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const getTraza = async (trazaId: string): Promise<Traza> => {
    return await fetch(API_URL + '/trazas/' + trazaId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
        console.log('An error occurred while getting traza');
        return null;
    });
}
