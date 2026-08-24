import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import FlashcardStack from "../components/FlashcardStack";

const Flashcards = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const flashcards = location.state?.flashcards || [];
    const chapters = location.state?.chapters || [];
    const file = location.state?.file;

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Header */}

                <div className="text-center mb-10">

                    <p className="text-blue-600 text-sm font-medium">
                        YOUR FLASHCARDS
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Study with your flashcards
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Important questions generated from your PDF.
                    </p>

                    {file?.originalName && (
                        <p className="text-sm text-gray-400 mt-3">
                            {file.originalName}
                        </p>
                    )}

                </div>


                {/* No flashcards */}

                {flashcards.length === 0 ? (

                    <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">

                        <h2 className="text-xl font-semibold text-gray-900">
                            No flashcards found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            No flashcards were generated for this PDF.
                        </p>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
                        >
                            Go to Dashboard
                        </button>

                    </div>

                ) : (

                    <>
                        {/* Flashcards */}

                        <FlashcardStack
                            flashcards={flashcards}
                        />


                        {/* Chapters */}

                        {chapters.length > 0 && (

                            <div className="mt-14">

                                <div className="text-center mb-6">

                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Chapters
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        You can study individual chapters from
                                        your dashboard.
                                    </p>

                                </div>

                                <div className="flex justify-center">

                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                                    >
                                        Go to Dashboard
                                    </button>

                                </div>

                            </div>

                        )}

                    </>
                )}

            </main>

        </div>
    );
};

export default Flashcards;