import { BrowserRouter, Routes, Route } from "react-router-dom";

import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Flashcards from "./pages/Flashcards";
import Dashboard from "./pages/Dashboard";
import ChapterFlashcards from "./pages/ChapterFlashcards";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Protected Routes */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Upload />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/processing"
                    element={
                        <ProtectedRoute>
                            <Processing />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/flashcards"
                    element={
                        <ProtectedRoute>
                            <Flashcards />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chapter/:chapterId"
                    element={
                        <ProtectedRoute>
                            <ChapterFlashcards />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;