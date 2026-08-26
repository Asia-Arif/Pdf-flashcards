const API_URL = import.meta.env.VITE_API_URL;


// Get logged-in user's token
const getToken = () => {
    return localStorage.getItem("token");
};


// Upload PDF
export const uploadPdf = async (file) => {
    const formData = new FormData();

    formData.append("pdf", file);

    const response = await fetch(`${API_URL}/pdf/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "PDF upload failed");
    }

    return data;
};


// Get logged-in user's PDFs
export const getPdfs = async () => {
    const response = await fetch(`${API_URL}/pdf`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch PDFs");
    }

    return data;
};


// Get chapter flashcards
export const getChapterFlashcards = async (chapterId) => {
    const response = await fetch(
        `${API_URL}/pdf/chapter/${chapterId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch chapter flashcards"
        );
    }

    return data;
};