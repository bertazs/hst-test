import React from "react";
import {HeroProps} from "@/types";
import Image from "next/image";

const Hero = ({title, subTitle, classes}: HeroProps) => {
    return (
        <section className={`max-w-[1200px] mx-auto bg-white shadow-lg p-6 sm:p-10 rounded-2xl flex flex-col sm:flex-row gap-10 sm:justify-between sm:items-center ${classes}`}>
            <div className="flex flex-col gap-4">
                <h1 className="text-blue-950 text-5xl lg:text-7xl font-extrabold">{title}</h1>
                <p className="text-gray-800 text-xl font-bold">{subTitle}</p>
            </div>
            <div>
                <Image
                    src="/images/hero.jpg"
                    alt="Star Wars"
                    width={500}
                    height={500}
                    priority={true}
                    className="rounded-2xl"
                    style={{ width: "auto", height: "auto" }}
                />
            </div>
        </section>
    );
};

export default Hero;