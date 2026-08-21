import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import { uploadPdf } from "../services/api";

const Upload = () => {

    const navigate = useNavigate();

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async (file) => {

        try {

            setUploading(true);
            setError("");

            const data = await uploadPdf(file);

            console.log("Upload response:", data);

            navigate("/processing", {
                state: {
                    file: file,
                    pdf: data.file
                }
            });

        } catch (error) {

            console.error(error);

            setError(error.message || "Something went wrong");

        } finally {

            setUploading(false);

        }
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
                        uploading={uploading}
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