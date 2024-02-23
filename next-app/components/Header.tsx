import Link from "next/link";

const Header = () => {
    return (
        <header className="w-full p-4 sm:px-8 sm:py-6 shadow-lg bg-white">
            <div className="max-w-[1200px] mx-auto flex justify-between flex-wrap items-center gap-4">
                <h2 className="text-3xl text-blue-950 font-extrabold">HST Star Wars</h2>
                <Link href="https://www.linkedin.com/in/zsolt-berta98/" className="text-xl text-gray-800 font-bold hover:underline">by Berta Zsolt</Link>
            </div>
        </header>
    );
};

export default Header;