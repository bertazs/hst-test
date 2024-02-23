import { useState, useEffect } from 'react';
import { ModalProps } from '@/types';
import {getFilm} from "@/services/swapiService";

const Modal = ({ index, name, height, mass, films, closeModal, isOpen }: ModalProps) => {
    const [filmNames, setFilmNames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilmNames = async () => {
            try {
                const filmPromises = films.map(async (filmUrl) => {
                    const filmId = filmUrl.split('/').filter(Boolean).pop(); // Extract film ID from the URL
                    const filmData = await getFilm(filmId || '0');
                    return filmData.title;
                });

                const resolvedFilmNames = await Promise.all(filmPromises);

                setFilmNames(resolvedFilmNames);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching film names', error);
                setLoading(false);
            }
        };

        if(isOpen) {
            fetchFilmNames();
        }
    }, [films, isOpen]);

    return (
        <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>
            <div className="modal-content p-4 md:p-8 lg:p-12 gap-4 md:gap-6 lg:gap-8">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold">{name}</h1>
                    <div className="cursor-pointer group" onClick={closeModal}>
                        <svg
                            className="h-6 w-6 transition-all group-hover:fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="122.881px"
                            height="122.88px"
                            viewBox="0 0 122.881 122.88"
                        >
                            <g>
                                <path
                                    fill="#555"
                                    d="M61.44,0c16.966,0,32.326,6.877,43.445,17.996c11.119,11.118,17.996,26.479,17.996,43.444 c0,16.967-6.877,32.326-17.996,43.444C93.766,116.003,78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.996 C6.877,93.766,0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444C29.114,6.877,44.474,0,61.44,0L61.44,0z M80.16,37.369 c1.301-1.302,3.412-1.302,4.713,0c1.301,1.301,1.301,3.411,0,4.713L65.512,61.444l19.361,19.362c1.301,1.301,1.301,3.411,0,4.713 c-1.301,1.301-3.412,1.301-4.713,0L60.798,66.157L41.436,85.52c-1.301,1.301-3.412,1.301-4.713,0c-1.301-1.302-1.301-3.412,0-4.713 l19.363-19.362L36.723,42.082c-1.301-1.302-1.301-3.412,0-4.713c1.301-1.302,3.412-1.302,4.713,0l19.363,19.362L80.16,37.369 L80.16,37.369z M100.172,22.708C90.26,12.796,76.566,6.666,61.44,6.666c-15.126,0-28.819,6.13-38.731,16.042 C12.797,32.62,6.666,46.314,6.666,61.439c0,15.126,6.131,28.82,16.042,38.732c9.912,9.911,23.605,16.042,38.731,16.042 c15.126,0,28.82-6.131,38.732-16.042c9.912-9.912,16.043-23.606,16.043-38.732C116.215,46.314,110.084,32.62,100.172,22.708 L100.172,22.708z"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="h-[250px] w-[175px] overflow-hidden rounded-lg">
                        <img
                            src={index === '0' ? '/images/loading.gif' : `/images/people/${index}.jpg`}
                            alt={name}
                            className="!h-[250px] !w-[175px] object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <p className="font-bold">Mass:</p>
                            <p>{mass} kg</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <p className="font-bold">Height:</p>
                            <p>{height} cm</p>
                        </div>
                        <div>
                            <p className="font-bold">Films:</p>
                            {loading ? (
                                <p>Loading film names...</p>
                            ) : (
                                <ul className="pl-4">
                                    {filmNames.map((filmName, index) => (
                                        <li className="list-disc" key={index}>
                                            {filmName}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
