import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";

const Processing = () => {

    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {

        const interval = setInterval(() => {

            setProgress((previous) => {

                if (previous >= 100) {

                    clearInterval(interval);

                    setTimeout(() => {
                        navigate("/flashcards");
                    }, 500);

                    return 100;
                }

                return previous + 10;
            });

        }, 400);

        return () => clearInterval(interval);

    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-20">

                <div className="bg-white rounded-2xl shadow-md border p-10 text-center">

                    <div className="text-5xl mb-6">
                        ⚙️
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Processing Your PDF
                    </h1>

                    <p className="text-gray-500 mt-3 mb-10">
                        We're analyzing your PDF and generating flashcards.
                    </p>

                    <ProgressBar progress={progress} />

                    <p className="text-sm text-gray-500 mt-6">
                        Please wait while your flashcards are being generated...
                    </p>

                </div>

            </main>

        </div>
    );
};

export default Processing;