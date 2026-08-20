import { useState, useEffect } from "react";

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Card change hone par reset to question side
    useEffect(() => {
        setIsFlipped(false);
    }, [question]);

    return (
        <div className="w-full flex justify-center perspective-1000">
            <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`w-full max-w-xl h-80 relative cursor-pointer select-none transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""
                    }`}
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {/* FRONT (Question) */}
                <div
                    className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-3xl shadow-xl p-8 flex flex-col justify-between backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="flex justify-between items-center">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                            Question
                        </span>
                        <span className="text-xs text-gray-400">Click card to reveal</span>
                    </div>

                    <div className="my-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                            {question}
                        </h2>
                    </div>

                    <div className="text-center text-xs text-gray-400 font-medium">
                        Tap anywhere to flip 🔄
                    </div>
                </div>

                {/* BACK (Answer) */}
                <div
                    className="absolute inset-0 w-full h-full bg-slate-900 text-white border border-slate-800 rounded-3xl shadow-xl p-8 flex flex-col justify-between backface-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="flex justify-between items-center">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                            Answer
                        </span>
                        <span className="text-xs text-slate-400">Click card to hide</span>
                    </div>

                    <div className="my-auto text-center">
                        <p className="text-lg font-medium text-slate-100 leading-relaxed">
                            {answer}
                        </p>
                    </div>

                    <div className="text-center text-xs text-slate-400 font-medium">
                        Tap anywhere to flip back 🔄
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;