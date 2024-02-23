import axios from 'axios';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

export const getCharacters = async (url: string, search?: string) => {
    const apiUrl = url !== '' ? url : `${SWAPI_BASE_URL}/people/`;

    try {
        const response = await axios.get(apiUrl, {
            params: {
                search: search || '', // If search is provided, use it; otherwise, use an empty string
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
};

export const getCharacter = async (id: string) => {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/people/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching character:', error);
    }
};

export const getFilm = async (id: string) => {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/films/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching film:', error);
    }
};

export const getPlanets = async (url = `${SWAPI_BASE_URL}/planets/`, allPlanets: any[] = []): Promise<any> => {
    try {
        const response = await axios.get(url);
        const planetsData = response.data;

        let planets = [...allPlanets, ...planetsData.results];

        if (planetsData.next) {
            return getPlanets(planetsData.next, planets);
        } else {
            return planets;
        }
    } catch (error) {
        console.error('Error fetching planets:', error);
        throw error; // Propagate the error
    }
};