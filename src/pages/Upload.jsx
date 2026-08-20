import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";

const Upload = () => {

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-16">

                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Turn Your PDF Into Flashcards
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Upload your study material and generate
                        flashcards from it.
                    </p>

                </div>

                <UploadBox />

            </main>

        </div>
    );
};

export default Upload;