import { useState } from "react";

const FlashcardStack = ({ flashcards = [] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Backend se abhi cards nahi aaye
    if (flashcards.length === 0) {
        return (
            <div className="w-full max-w-2xl">

                <div className="relative h-[380px]">

                    <div className="absolute inset-x-6 top-4 h-full bg-white border border-gray-200 rounded-3xl">
                    </div>

                    <div className="absolute inset-x-3 top-2 h-full bg-white border border-gray-200 rounded-3xl shadow-sm">
                    </div>

                    <div className="absolute inset-0 bg-white border border-gray-200 rounded-3xl shadow-lg flex items-center justify-center p-8">

                        <div className="text-center">

                            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-5"></div>

                            <h2 className="text-lg font-semibold text-gray-800">
                                Your flashcards are being prepared
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                                Generated questions and answers will appear here.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    const currentCard = flashcards[currentIndex];

    return (
        <div className="flex items-center justify-center gap-6 w-full">

            {/* Previous */}
            <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="w-12 h-12 shrink-0 rounded-full bg-white border border-gray-200 shadow-sm text-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                ←
            </button>


            {/* Stack */}
            <div className="relative w-full max-w-2xl h-[380px]">

                {/* Back card */}
                <div className="absolute inset-x-6 top-4 h-full bg-white border border-gray-200 rounded-3xl shadow-sm">
                </div>

                {/* Middle card */}
                <div className="absolute inset-x-3 top-2 h-full bg-white border border-gray-200 rounded-3xl shadow-md">
                </div>

                {/* Main card */}
                <div className="absolute inset-0 bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

                    <div className="flex justify-between items-center mb-8">

                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                            Question
                        </span>

                        <span className="text-sm text-gray-400">
                            {currentIndex + 1} / {flashcards.length}
                        </span>

                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900">
                        {currentCard.question}
                    </h2>

                    <div className="border-t border-gray-100 mt-8 pt-6">

                        <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                            Answer
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            {currentCard.answer}
                        </p>

                    </div>

                </div>

            </div>


            {/* Next */}
            <button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                className="w-12 h-12 shrink-0 rounded-full bg-white border border-gray-200 shadow-sm text-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                →
            </button>

        </div>
    );
};

export default FlashcardStack;