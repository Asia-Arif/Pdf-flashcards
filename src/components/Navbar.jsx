const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    PDF Flashcards
                </h1>

                <div className="flex gap-6">
                    <a href="/" className="hover:text-gray-300">
                        Upload
                    </a>

                    <a href="/dashboard" className="hover:text-gray-300">
                        Dashboard
                    </a>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;