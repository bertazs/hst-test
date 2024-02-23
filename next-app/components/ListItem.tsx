import {ListItemProps} from "@/types";
import Modal from "@/components/Modal";
import {useState} from "react";

const ListItem = ({index, name, openModal}: ListItemProps) => {

    return (
        <div onClick={openModal}
            className="w-full bg-white shadow-lg inline-block rounded-2xl overflow-hidden cursor-pointer group relative hover:shadow-2xl transition-shadow duration-300">
            <div className="h-[250px] overflow-hidden">
                <img
                    src={index === '0' ? '/images/loading.gif' : `/images/people/${index}.jpg`}
                    alt={name}
                    className="!h-[250px] !w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="min-h-[80px] px-4 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-900 transition-colors duration-300">{name}</h3>
            </div>
        </div>
    );
};

export default ListItem;