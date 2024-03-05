import {ListItemProps} from "@/types";
import { motion } from "framer-motion";

const ListItem = ({index, name, openModal, id}: ListItemProps) => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.3, delay: (index%10) * 0.1 }}
            onClick={openModal}
            className="w-full bg-white shadow-lg inline-block rounded-2xl overflow-hidden cursor-pointer group relative hover:shadow-2xl transition-shadow duration-300">
            <div className={`h-[250px] overflow-hidden`}>
                <img
                    src={id === '0' ? '/images/loading.gif' : `/images/people/${id}.jpg`}
                    alt={name}
                    className="!h-[250px] !w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="min-h-[80px] px-4 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-900 transition-colors duration-300">{name}</h3>
            </div>
        </motion.div>
    );
};

export default ListItem;