import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadBox = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = () => {

        if (!selectedFile) {
            alert("Please select a PDF first.");
            return;
        }

        navigate("/processing");
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border p-8">

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">

                <div className="text-5xl mb-4">
                    📄
                </div>

                <h2 className="text-xl font-semibold mb-2">
                    Upload your PDF
                </h2>

                <p className="text-gray-500 mb-6">
                    Select a PDF file to generate flashcards
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="mb-5"
                />

                {selectedFile && (
                    <p className="text-sm text-gray-600 mb-5">
                        Selected: {selectedFile.name}
                    </p>
                )}

                <button
                    onClick={handleUpload}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium"
                >
                    Upload PDF
                </button>

            </div>

        </div>
    );
};

export default UploadBox;