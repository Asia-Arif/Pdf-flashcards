import { BrowserRouter, Routes, Route } from "react-router-dom";

import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Flashcards from "./pages/Flashcards";
import Dashboard from "./pages/Dashboard";
import ChapterFlashcards from "./pages/ChapterFlashcards";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Upload />}
                />

                <Route
                    path="/processing"
                    element={<Processing />}
                />

                <Route
                    path="/flashcards"
                    element={<Flashcards />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/chapter/:chapterId"
                    element={<ChapterFlashcards />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;