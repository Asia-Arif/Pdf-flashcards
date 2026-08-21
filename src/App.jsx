import { BrowserRouter, Routes, Route } from "react-router-dom";

import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Flashcards from "./pages/Flashcards";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Upload />} />

                <Route path="/processing" element={<Processing />} />

                <Route path="/flashcards" element={<Flashcards />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;