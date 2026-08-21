import Navbar from "../components/Navbar";
import FlashcardStack from "../components/FlashcardStack";

const Flashcards = () => {

    // Actual data 
    const flashcards = [];

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">

                <div className="text-center mb-10">

                    <p className="text-blue-600 text-sm font-medium">
                        YOUR FLASHCARDS
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Study with your flashcards
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Review the important questions generated from your PDF.
                    </p>

                </div>

                <FlashcardStack flashcards={flashcards} />

            </main>

        </div>
    );
};

export default Flashcards;