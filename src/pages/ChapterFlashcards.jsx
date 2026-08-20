import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Flashcard from "../components/Flashcard";

const ChapterFlashcards = () => {

    const { chapterId } = useParams();

    const navigate = useNavigate();

    const chapterData = {
        1: {
            title: "Introduction",
            flashcards: [
                {
                    question: "What is a data structure?",
                    answer: "A data structure organizes and stores data efficiently."
                },
                {
                    question: "Why are data structures important?",
                    answer: "They help programs store, manage and access data efficiently."
                }
            ]
        },

        2: {
            title: "Data Structures",
            flashcards: [
                {
                    question: "What is an array?",
                    answer: "An array stores multiple elements in contiguous memory locations."
                },
                {
                    question: "What is a linked list?",
                    answer: "A linked list is a collection of nodes where each node points to another node."
                }
            ]
        },

        3: {
            title: "Algorithms",
            flashcards: [
                {
                    question: "What is an algorithm?",
                    answer: "An algorithm is a step-by-step procedure for solving a problem."
                },
                {
                    question: "What is searching?",
                    answer: "Searching is the process of finding a specific element in a collection."
                }
            ]
        }
    };

    const chapter = chapterData[chapterId];

    const [currentCard, setCurrentCard] = useState(0);

    if (!chapter) {

        return (
            <div className="min-h-screen bg-gray-50">

                <Navbar />

                <div className="text-center py-20">

                    <h1 className="text-2xl font-bold">
                        Chapter Not Found
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mt-5 bg-gray-900 text-white px-5 py-2 rounded-lg"
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }

    const nextCard = () => {

        if (currentCard < chapter.flashcards.length - 1) {
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
                        Chapter {chapterId}
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        {chapter.title}
                    </h1>

                </div>

                <Flashcard
                    question={chapter.flashcards[currentCard].question}
                    answer={chapter.flashcards[currentCard].answer}
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
                        {currentCard + 1} / {chapter.flashcards.length}
                    </span>

                    <button
                        onClick={nextCard}
                        disabled={currentCard === chapter.flashcards.length - 1}
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
                        ← Back to Dashboard
                    </button>

                </div>

            </main>

        </div>
    );
};

export default ChapterFlashcards;