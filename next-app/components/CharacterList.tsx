import { useEffect } from 'react';
import ListItem from '@/components/ListItem';
import Modal from '@/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '@/lib/store';
import { getCharacters } from '@/services/swapiService';
import {setCharacters, loadMore, openModal, closeModal, setLoading} from '@/lib/features/characters/CharactersSlice';

const CharacterList = () => {
    const characters = useSelector((state: RootState) => state.characters.characters);
    const loading = useSelector((state: RootState) => state.characters.loading);
    const totalCount = useSelector((state: RootState) => state.characters.totalCount);
    const nextUrl = useSelector((state: RootState) => state.characters.nextUrl);
    const isFiltered = useSelector((state: RootState) => state.characters.isFiltered);
    const filteredCharacters = useSelector((state: RootState) => state.characters.filteredCharacters);
    const dispatch = useDispatch<AppDispatch>();

    const loadingItems = [];
    for (let i = 0; i < 10; i++) {
        loadingItems.push(<ListItem key={i} index={'0'} name={'Loading...'} openModal={() => {}} />);
    }

    useEffect(() => {
        const fetchCharactersFromApi = async () => {
            dispatch(setLoading(true));
            try {
                const charactersFromApi = await getCharacters('');
                dispatch(setCharacters(charactersFromApi));
            } catch (error) {
                console.error('Error fetching characters', error);
            }
        };

        if (characters?.length === 0 && !loading) {
            fetchCharactersFromApi();
        }
    }, [characters, dispatch, loading]);

    const handleOpenModal = (index: number) => {
        dispatch(openModal(index));
    };

    const handleCloseModal = (index: number) => {
        dispatch(closeModal(index));
    };

    const handleLoadMore = () => {
        dispatch(loadMore({search: "", nextUrl }));
    };

    return (
        <div>
            {loading ? (
                <div>
                    <section className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-10 mt-10">
                        {(isFiltered ? filteredCharacters : characters)?.map((character, index) => (
                            <div key={`${character.name}-${index}`}>
                                <ListItem
                                    index={character.url.split('/').filter(Boolean).pop()}
                                    name={character.name}
                                    openModal={() => handleOpenModal(index)}
                                />
                                <Modal
                                    isOpen={character.isOpen}
                                    closeModal={() => handleCloseModal(index)}
                                    name={character.name}
                                    mass={character.mass}
                                    height={character.height}
                                    films={character.films}
                                    index={character.url.split('/').filter(Boolean).pop()}
                                />
                            </div>
                        ))}
                    </section>
                    <section className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-10 mt-10">
                        {loadingItems}
                    </section>
                </div>
            ) : (
                <div>
                    <section className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-10 mt-10">
                        {(isFiltered ? filteredCharacters : characters)?.map((character, index) => (
                            <div key={`${character.name}-${index}`}>
                                <ListItem
                                    index={character.url.split('/').filter(Boolean).pop()}
                                    name={character.name}
                                    openModal={() => handleOpenModal(index)}
                                />
                                <Modal
                                    isOpen={character.isOpen}
                                    closeModal={() => handleCloseModal(index)}
                                    name={character.name}
                                    mass={character.mass}
                                    height={character.height}
                                    films={character.films}
                                    index={character.url.split('/').filter(Boolean).pop()}
                                />
                            </div>
                        ))}
                    </section>
                    {characters?.length < totalCount && nextUrl && (
                        <div className="flex justify-center w-full items-center">
                            <button
                                onClick={handleLoadMore}
                                className="bg-gray-800 hover:bg-blue-950 transition-colors duration-300 text-white font-bold py-2 px-4 rounded mt-10"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CharacterList;
