import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FlashcardStack from "../components/FlashcardStack";
import { getChapterFlashcards } from "../services/api";

const ChapterFlashcards = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();

    const [chapter, setChapter] = useState(null);
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChapterFlashcards = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getChapterFlashcards(chapterId);

                setChapter(data.chapter);
                setFlashcards(data.flashcards || []);

            } catch (error) {
                console.error("Error:", error);
                setError(
                    error.message ||
                    "Failed to load chapter flashcards"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchChapterFlashcards();
    }, [chapterId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">
                    Loading flashcards...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-red-500 mb-4">
                    {error}
                </p>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-5 py-2 bg-[#437993] text-white rounded-lg"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className="max-w-5xl mx-auto">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-6 text-[#437993] hover:underline"
                >
                    ← Back to Dashboard
                </button>

                <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-1">
                        Chapter {chapter?.order}
                    </p>

                    <h1 className="text-3xl font-bold text-gray-800">
                        {chapter?.title}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {flashcards.length} flashcards
                    </p>
                </div>

                {flashcards.length === 0 ? (
                    <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                        <p className="text-gray-500">
                            No flashcards found for this chapter.
                        </p>
                    </div>
                ) : (
                    <FlashcardStack flashcards={flashcards} />
                )}

            </div>
        </div>
    );
};

export default ChapterFlashcards;