import {useEffect} from 'react';
import ListItem from '@/components/ListItem';
import Modal from '@/components/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/lib/store';
import {getCharacters} from '@/services/swapiService';
import {setCharacters, loadMore, openModal, closeModal, setLoading} from '@/lib/features/characters/CharactersSlice';
import { useInView } from 'react-intersection-observer'

const CharacterList = () => {
    const characters = useSelector((state: RootState) => state.characters.characters);
    const loading = useSelector((state: RootState) => state.characters.loading);
    const totalCount = useSelector((state: RootState) => state.characters.totalCount);
    const nextUrl = useSelector((state: RootState) => state.characters.nextUrl);
    const isFiltered = useSelector((state: RootState) => state.characters.isFiltered);
    const filteredCharacters = useSelector((state: RootState) => state.characters.filteredCharacters);
    const dispatch = useDispatch<AppDispatch>();
    const { ref, inView } = useInView();

    const loadingItems = [];
    for (let i = 0; i < 10; i++) {
        loadingItems.push(<ListItem index={i} key={i} id={'0'} name={'Loading...'} openModal={() => {
        }}/>);
    }

    useEffect(() => {
        if (inView) {
            console.log('inView')
            handleLoadMore()
        }
    }, [inView]);

    const fetchCharactersFromApi = async () => {
        dispatch(setLoading(true));
        try {
            const charactersFromApi = await getCharacters('');
            dispatch(setCharacters(charactersFromApi));
        } catch (error) {
            console.error('Error fetching characters', error);
        }
    };

    const handleOpenModal = (index: number) => {
        dispatch(openModal(index));
    };

    const handleCloseModal = (index: number) => {
        dispatch(closeModal(index));
    };

    const handleLoadMore = () => {
        if (loading) {
            return;
        }
        if(characters.length < 1){
            fetchCharactersFromApi();
        }else{
            dispatch(loadMore({search: "", nextUrl}));
        }
    };

    return (
        <div>

            <div>
                <section
                    className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-10 mt-10">
                    {(isFiltered ? filteredCharacters : characters)?.map((character, index) => (
                        <div key={`${character.name}-${index}`}>
                            <ListItem
                                id={character.url.split('/').filter(Boolean).pop()}
                                name={character.name}
                                openModal={() => handleOpenModal(index)}
                                index={index}
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
                {loading ? (
                    <div className="flex justify-center">
                        <svg className="w-[100px] h-[100px]" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                             x="0px" y="0px"
                             viewBox="0 0 100 100">
                            <path className="fill-blue-950"
                                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                <animateTransform
                                    attributeName="transform"
                                    attributeType="XML"
                                    type="rotate"
                                    dur="1s"
                                    from="0 50 50"
                                    to="360 50 50"
                                    repeatCount="indefinite"/>
                            </path>
                        </svg>
                    </div>
                ) : null}
                {(
                    <div ref={ref}></div>
                )}
            </div>

        </div>
    );
};

export default CharacterList;
