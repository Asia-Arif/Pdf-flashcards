import { useNavigate } from "react-router-dom";

const ChapterCard = ({ chapter }) => {

    const navigate = useNavigate();

    const handleStudy = () => {
        navigate(`/chapter/${chapter.id}`);
    };

    return (
        <div className="bg-white border rounded-xl p-6 shadow-sm">

            <div className="flex justify-between items-center">

                <div>
                    <p className="text-sm text-gray-500">
                        Chapter {chapter.id}
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900">
                        {chapter.title}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {chapter.cards} flashcards
                    </p>
                </div>

                <button
                    onClick={handleStudy}
                    className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                    Study
                </button>

            </div>

        </div>
    );
};

export default ChapterCard;