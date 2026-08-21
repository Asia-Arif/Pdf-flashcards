import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";

const Processing = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const file = location.state?.file;

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        if (!file) {
            navigate("/");
            return;
        }

        const interval = setInterval(() => {

            setProgress((previousProgress) => {

                if (previousProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                return previousProgress + 10;
            });

        }, 400);

        return () => clearInterval(interval);

    }, [file, navigate]);

    useEffect(() => {

        if (progress === 100) {
            navigate("/flashcards");
        }

    }, [progress]);

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6">

                <div className="w-full max-w-xl text-center">

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10">

                        <div className="flex justify-center mb-6">

                            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Creating your flashcards
                        </h1>

                        <p className="text-gray-500 mt-2 mb-8">
                            We are processing your PDF and generating important questions.
                        </p>

                        <ProgressBar progress={progress} />

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Processing;