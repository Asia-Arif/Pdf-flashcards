import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Flashcard from "../components/Flashcard";

const Flashcards = () => {

    const navigate = useNavigate();

    const flashcards = [
        {
            question: "What is a data structure?",
            answer: "A data structure is a way to organize and store data so it can be accessed and modified efficiently."
        },
        {
            question: "What is an array?",
            answer: "An array is a collection of elements stored in contiguous memory locations."
        },
        {
            question: "What is an algorithm?",
            answer: "An algorithm is a step-by-step procedure used to solve a problem."
        }
    ];

    const [currentCard, setCurrentCard] = useState(0);

    const nextCard = () => {

        if (currentCard < flashcards.length - 1) {
            setCurrentCard(currentCard + 1);
        }
    };

    const previousCard = () => {

        if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-12">

                <div className="text-center mb-8">

                    <p className="text-sm text-gray-500">
                        Chapter 1
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Introduction
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Flashcards Generated!
                    </p>

                </div>

                <Flashcard
                    question={flashcards[currentCard].question}
                    answer={flashcards[currentCard].answer}
                />

                <div className="flex justify-between items-center mt-6">

                    <button
                        onClick={previousCard}
                        disabled={currentCard === 0}
                        className="px-5 py-3 border rounded-lg disabled:opacity-40"
                    >
                        ← Previous
                    </button>

                    <span className="text-gray-500">
                        {currentCard + 1} / {flashcards.length}
                    </span>

                    <button
                        onClick={nextCard}
                        disabled={currentCard === flashcards.length - 1}
                        className="px-5 py-3 bg-gray-900 text-white rounded-lg disabled:opacity-40"
                    >
                        Next →
                    </button>

                </div>

                <div className="text-center mt-10">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-gray-700 underline"
                    >
                        Go to Dashboard
                    </button>

                </div>

            </main>

        </div>
    );
};

export default Flashcards;