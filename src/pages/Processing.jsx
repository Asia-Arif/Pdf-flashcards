import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import { uploadPdf } from "../services/api";

const Processing = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const file = location.state?.file;

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    // Prevent upload from running twice in React StrictMode
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (!file) {
            navigate("/");
            return;
        }

        // IMPORTANT:
        // React StrictMode can run useEffect twice in development.
        // This prevents duplicate PDF uploads.
        if (hasProcessed.current) {
            return;
        }

        hasProcessed.current = true;

        let progressInterval;

        const processPdf = async () => {
            try {
                setError("");
                setProgress(10);

                // Visual progress while Gemini processes PDF
                progressInterval = setInterval(() => {
                    setProgress((previousProgress) => {
                        if (previousProgress >= 90) {
                            return previousProgress;
                        }

                        return previousProgress + 5;
                    });
                }, 1000);

                // Only ONE request will be sent
                const data = await uploadPdf(file);

                clearInterval(progressInterval);

                setProgress(100);

                console.log("PDF processing response:", data);

                // Go to flashcards after Gemini finishes
                navigate("/flashcards", {
                    state: {
                        file: data.file,
                        chapters: data.chapters || [],
                        flashcards: data.flashcards || []
                    }
                });

            } catch (error) {
                console.error("PDF processing error:", error);

                clearInterval(progressInterval);

                // Allow retry after failure
                hasProcessed.current = false;

                setError(
                    error.message ||
                    "Failed to process PDF and generate flashcards."
                );
            }
        };

        processPdf();

        return () => {
            if (progressInterval) {
                clearInterval(progressInterval);
            }
        };

    }, [file, navigate]);

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6">

                <div className="w-full max-w-xl text-center">

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10">

                        {!error ? (
                            <>
                                <div className="flex justify-center mb-6">

                                    <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

                                </div>

                                <h1 className="text-2xl font-bold text-gray-900">
                                    Creating your flashcards
                                </h1>

                                <p className="text-gray-500 mt-2 mb-8">
                                    Gemini is analyzing your PDF and generating
                                    chapters and important flashcards.
                                </p>

                                <ProgressBar progress={progress} />

                                <p className="text-xs text-gray-400 mt-5">
                                    Please don't close this page while your PDF
                                    is being processed.
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">

                                    <span className="text-red-500 text-2xl">
                                        !
                                    </span>

                                </div>

                                <h1 className="text-2xl font-bold text-gray-900">
                                    Processing failed
                                </h1>

                                <p className="text-red-500 mt-3">
                                    {error}
                                </p>

                                <button
                                    onClick={() => navigate("/")}
                                    className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
                                >
                                    Try Again
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Processing;