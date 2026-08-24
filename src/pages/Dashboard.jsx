import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getPdfs } from "../services/api";

const Dashboard = () => {
    const navigate = useNavigate();

    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const data = await getPdfs();
                setPdfs(data.pdfs);
            } catch (error) {
                console.error(error);
                setError(error.message || "Failed to load PDFs");
            } finally {
                setLoading(false);
            }
        };

        fetchPdfs();
    }, []);

    const handleViewPdf = (pdfUrl) => {
        if (!pdfUrl) {
            alert("PDF URL is not available");
            return;
        }

        // Agar URL relative path ho (e.g. /uploads/filename.pdf), to backend server path add karein
        const fullUrl = pdfUrl.startsWith("http")
            ? pdfUrl
            : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${pdfUrl}`;

        window.open(fullUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p className="text-blue-600 text-sm font-medium">YOUR LIBRARY</p>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            Your PDF Chapters
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Select a chapter to study its flashcards.
                        </p>
                    </div>

                    {/* Upload New PDF */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition shadow-sm"
                    >
                        <span className="text-lg">+</span>
                        Upload New PDF
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && pdfs.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                            <span className="text-blue-600 text-2xl font-bold">PDF</span>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            No PDFs uploaded yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Upload a PDF to generate your flashcards.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                        >
                            Upload PDF
                        </button>
                    </div>
                )}

                {/* PDFs List */}
                {!loading && !error && pdfs.length > 0 && (
                    <div className="space-y-8">
                        {pdfs.map((pdf) => (
                            <div
                                key={pdf._id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
                            >
                                {/* PDF Header Section */}
                                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                                            <span className="text-red-600 font-bold text-xs">
                                                PDF
                                            </span>
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {pdf.originalName}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                {pdf.chapters?.length || 0} chapters
                                            </p>
                                        </div>
                                    </div>

                                    {/* View Original PDF Button (Moved to Header) */}
                                    <button
                                        onClick={() => handleViewPdf(pdf.url || pdf.filePath)}
                                        className="border border-gray-200 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                                    >
                                        <span>📄</span> View Original PDF
                                    </button>
                                </div>

                                {/* Chapters Section */}
                                {!pdf.chapters || pdf.chapters.length === 0 ? (
                                    <p className="text-gray-500 text-sm">
                                        No chapters found for this PDF.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {pdf.chapters.map((chapter) => (
                                            <button
                                                key={chapter._id}
                                                onClick={() => navigate(`/chapter/${chapter._id}`)}
                                                className="text-left border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:bg-blue-50/30 transition"
                                            >
                                                <p className="text-sm text-blue-600 font-medium">
                                                    Chapter {chapter.order}
                                                </p>

                                                <h3 className="font-semibold text-gray-900 mt-2">
                                                    {chapter.title}
                                                </h3>

                                                <p className="text-sm text-gray-400 mt-3">
                                                    Click to study →
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;