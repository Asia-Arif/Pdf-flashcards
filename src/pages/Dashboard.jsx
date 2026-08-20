import Navbar from "../components/Navbar";
import ChapterCard from "../components/ChapterCard";

const Dashboard = () => {

    const chapters = [
        {
            id: 1,
            title: "Introduction",
            cards: 3
        },
        {
            id: 2,
            title: "Data Structures",
            cards: 4
        },
        {
            id: 3,
            title: "Algorithms",
            cards: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-12">

                <div className="mb-10">

                    <p className="text-gray-500">
                        Your PDF
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Your PDF — 3 Chapters
                    </h1>

                </div>

                <div className="space-y-4">

                    {chapters.map((chapter) => (
                        <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                        />
                    ))}

                </div>

            </main>

        </div>
    );
};

export default Dashboard;