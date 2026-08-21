import { useState } from "react";

const UploadBox = ({ onGenerate }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        }
    };

    const handleGenerate = () => {
        if (selectedFile) {
            onGenerate(selectedFile);
        }
    };

    return (
        <div className="w-full max-w-2xl">

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                {!selectedFile ? (
                    <>
                        {/* Upload Icon */}
                        <div className="flex justify-center mb-5">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M12 12v9m0-9l-3 3m3-3l3 3"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900 text-center">
                            Upload your PDF
                        </h2>

                        <p className="text-gray-500 text-center mt-2 mb-6">
                            Turn your study material into smart flashcards
                        </p>

                        <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl px-6 py-10 text-center hover:border-blue-400 hover:bg-blue-50/30 transition">

                                <p className="text-gray-700 font-medium">
                                    Choose a PDF file
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    PDF files only
                                </p>

                            </div>

                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </>
                ) : (
                    <>
                        {/* Selected File */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">

                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                                <span className="text-red-600 font-bold text-sm">
                                    PDF
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                    {selectedFile.name}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedFile(null)}
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                ✕
                            </button>

                        </div>

                        <button
                            onClick={handleGenerate}
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition"
                        >
                            Generate Flashcards
                        </button>
                    </>
                )}

            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
                Your PDF will be processed to generate important questions and answers.
            </p>

        </div>
    );
};

export default UploadBox;