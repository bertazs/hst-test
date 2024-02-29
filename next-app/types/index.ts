export interface HeroProps {
    title: string;
    subTitle: string;
    classes?: string;
}

export interface ListItemProps {
    index: number;
    name: string;
    openModal: () => void;
    id: string | undefined;
}

export interface Character {
    homeworld: string;
    gender: string;
    length: number;
    name: string;
    isOpen: boolean;
    height: number;
    mass: number;
    films: string[];
    url: string;
}

export interface ModalProps {
    index: string | undefined;
    name: string;
    height: number;
    mass: number;
    films: string[];
    closeModal: () => void;
    isOpen: boolean;
}
