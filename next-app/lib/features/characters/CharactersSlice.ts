import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character } from "@/types";
import { getCharacters } from "@/services/swapiService";
import { RootState } from "@/lib/store";
import {Dispatch} from "react";

interface LoadMorePayload {
    nextUrl: string | null;
    search: string;
}

export const loadMore = createAsyncThunk<void, LoadMorePayload>(
    'characters/loadMore',
    async ({ nextUrl, search }, { getState, dispatch }) => {
        const state = getState() as RootState;
        const { characters } = state.characters;

        // If search term is provided and nextUrl is not available, initiate a new search
        if (!nextUrl && search) {
            dispatch(setLoading(true));
            try {
                const charactersData = await getCharacters('', search);

                dispatch(setCharacters({
                    results: charactersData.results,
                    count: charactersData.count,
                    next: charactersData.next
                }));
                dispatch(setNextUrl(charactersData.next));
            } catch (error) {
                console.error('Error searching characters', error);
            } finally {
                dispatch(setLoading(false));
            }
            return;
        }

        // If nextUrl is available, proceed with loading more characters
        if (nextUrl) {
            dispatch(setLoading(true));
            try {
                const charactersData = await getCharacters(nextUrl);

                dispatch(setCharacters({
                    results: charactersData.results,
                    count: charactersData.count,
                    next: charactersData.next
                }));
                dispatch(setNextUrl(charactersData.next));
            } catch (error) {
                console.error('Error loading more characters', error);
            } finally {
                dispatch(setLoading(false));
            }
        }
    }
);



export const updateAndLoadMore = (genders: string[], homeworld: string[], search: string = '') => {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        // Reset loading state
        dispatch(setLoading(true));

        if(search.length > 0) {
            dispatch(resetFilter());
        } else {
            dispatch(setGenderFilter(genders));
            dispatch(setHomeworldFilter(homeworld));
        }

        const state = getState();

        if(genders[0]?.length > 0 || homeworld[0]?.length > 0) {
            dispatch(setIsFiltered(true));
        }else {
            dispatch(setIsFiltered(false));
        }

        // Trigger loadMore with the updated filters
        await dispatch(loadMore({ nextUrl: state.characters.nextUrl, search }));

        // Reset loading state
        dispatch(setLoading(false));
    };
};


interface CharactersState {
    characters: Character[];
    filteredCharacters: Character[];
    isFiltered: boolean;
    loading: boolean;
    nextUrl: string | null;
    totalCount: number;
    genders: string[];
    homeworld: string[];
}

const initialState: CharactersState = {
    characters: [],
    filteredCharacters: [],
    isFiltered: false,
    loading: false,
    nextUrl: null,
    totalCount: 0,
    genders: [],
    homeworld: [],
};

const filterCharacters = (characters: Character[], genders: string[], homeworld: string[]): Character[] => {
    if (genders.length === 0 && homeworld.length === 0) {
        return characters;
    }

    return characters.filter((character) => {
        const genderMatch = genders.length === 0 || genders.includes('') || genders.includes(character.gender);
        const homeworldMatch = homeworld.length === 0 || homeworld.includes('') || homeworld.includes(character.homeworld);

        return genderMatch && homeworldMatch;
    });
};

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCharacters(state, action) {
            const newCharacters = action.payload.results.map((character: Character) => ({ ...character, isOpen: false }));
            const filteredCharacters = filterCharacters(newCharacters, state.genders, state.homeworld);

            state.characters = [...state.characters, ...newCharacters];
            state.filteredCharacters = [...state.filteredCharacters, ...filteredCharacters];
            state.totalCount = action.payload.count;
            state.nextUrl = action.payload.next;
            state.loading = false;
        },
        resetFilter(state) {
            state.characters = [];
            state.filteredCharacters = [];
            state.isFiltered = false;
            state.genders = [];
            state.homeworld = [];
            state.nextUrl = null;
        },
        setGenderFilter(state, action) {
            state.genders = action.payload;
            state.characters = [];
            state.filteredCharacters = [];
            state.nextUrl = null;
        },
        setHomeworldFilter(state, action) {
            state.homeworld = action.payload;
            state.characters = [];
            state.filteredCharacters = [];
            state.nextUrl = null;
        },
        openModal: (state, action) => {
            if(state.isFiltered) {
                state.filteredCharacters[action.payload].isOpen = true;
            } else {
                state.characters[action.payload].isOpen = true;
            }
        },
        closeModal: (state, action) => {
            if(state.isFiltered) {
                state.filteredCharacters[action.payload].isOpen = false;
            } else {
                state.characters[action.payload].isOpen = false;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setNextUrl: (state, action) => {
            state.nextUrl = action.payload;
        },
        setIsFiltered: (state, action) => {
            state.isFiltered = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMore.pending, (state) => {
                // Handle loading state if needed
            })
            .addCase(loadMore.fulfilled, (state) => {
                // Handle success if needed
            })
            .addCase(loadMore.rejected, (state) => {
                // Handle error if needed
            });
    },
});

export const {
    setCharacters,
    resetFilter,
    setGenderFilter,
    setHomeworldFilter,
    openModal,
    closeModal,
    setNextUrl,
    setLoading,
    setIsFiltered
} = charactersSlice.actions;

export default charactersSlice.reducer;
