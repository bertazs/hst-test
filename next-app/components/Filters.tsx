import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { getPlanets } from '@/services/swapiService';
import { updateAndLoadMore } from '@/lib/features/characters/CharactersSlice';

const Filters = () => {
    const dispatch = useDispatch<AppDispatch>();
    const genders = useSelector((state: RootState) => state.characters.genders);
    const homeworlds = useSelector((state: RootState) => state.characters.homeworld);
    const [allPlanets, setAllPlanets] = useState<any[]>([]);
    const isLoading = useSelector((state: RootState) => state.characters.loading);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const isFiltered = useSelector((state: RootState) => state.characters.isFiltered);

    useEffect(() => {
        const fetchAllPlanets = async () => {
            try {
                const planets = await getPlanets();
                setAllPlanets(planets);
            } catch (error) {
                console.error('Error fetching all planets:', error);
            }
        };

        fetchAllPlanets();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        // Dispatch the combined action
        dispatch(updateAndLoadMore(genders, homeworlds, searchTerm));
    };

    const handleGenderChange = (selectedGender: string) => {
        const updatedGenders = [selectedGender];

        // Dispatch the combined action
        dispatch(updateAndLoadMore(updatedGenders, homeworlds));
    };

    const handleHomeworldChange = (selectedHomeworld: string) => {
        // Dispatch the combined action
        dispatch(updateAndLoadMore(genders, [selectedHomeworld]));
    };

    return (
        <div className="bg-white shadow-lg p-8 text-center max-w-[1200px] mx-auto rounded-2xl">
            <div>
                <h2 className="text-2xl font-bold mb-4">Filters</h2>
                <div className="flex justify-center flex-wrap gap-4">
                    {/* Input for Search */}
                    <div className="mx-2 flex flex-wrap gap-2 justify-center">
                        <input
                            disabled={isFiltered}
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border border-gray-400 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <button
                            onClick={handleSearchSubmit}
                            disabled={isLoading || searchTerm.length < 4 || isFiltered}
                            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors duration-300"
                        >
                            Search
                        </button>
                    </div>
                    {/* Dropdown for Genders */}
                    <div className="relative mx-2">
                        <select
                            disabled={isLoading}
                            value={genders.length > 0 ? genders[0] : ''}
                            onChange={(e) => handleGenderChange(e.target.value)}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="n/a">N/A</option>
                            <option value="hermaphrodite">Hermaphrodite</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            {/* Dropdown icon */}
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 12L4 6h12l-6 6z" />
                            </svg>
                        </div>
                    </div>

                    {/* Dropdown for Homeworlds */}
                    <div className="relative mx-2">
                        <select
                            disabled={isLoading || !allPlanets.length}
                            value={homeworlds.length > 0 ? homeworlds[0] : ''}
                            onChange={(e) => handleHomeworldChange(e.target.value)}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
                        >
                            <option value="">Select Homeworld</option>
                            {allPlanets.map((planet) => (
                                <option key={planet.url} value={planet.url}>
                                    {planet.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            {/* Dropdown icon */}
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 12L4 6h12l-6 6z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
