const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <h1 className="text-xl font-bold text-gray-900">
                    PDF<span className="text-blue-600">Cards</span>
                </h1>

                <div className="text-sm text-gray-500">
                    Smart PDF Flashcards
                </div>

            </div>
        </nav>
    );
};

export default Navbar;