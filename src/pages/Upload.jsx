import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";

const Upload = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleGenerate = (file) => {
        setError("");

        // Send the selected PDF to Processing page.
        // Actual upload + Gemini processing will happen there.
        navigate("/processing", {
            state: {
                file
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6">

                <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center">

                    <div className="text-center mb-10">

                        <p className="text-blue-600 font-medium text-sm mb-3">
                            STUDY SMARTER
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Turn your PDF into
                            <span className="text-blue-600"> Flashcards</span>
                        </h1>

                        <p className="text-gray-500 max-w-xl mx-auto mt-4">
                            Upload your PDF and let our system create important
                            questions and answers for easier studying.
                        </p>

                    </div>

                    <UploadBox
                        onGenerate={handleGenerate}
                    />

                    {error && (
                        <p className="text-red-500 text-sm mt-4">
                            {error}
                        </p>
                    )}

                </div>

            </main>

        </div>
    );
};

export default Upload;