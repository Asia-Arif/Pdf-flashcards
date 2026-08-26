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

// Download original PDF
export const downloadPdf = async (pdfId, fileName) => {
    const response = await fetch(
        `${API_URL}/pdf/download/${pdfId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    if (!response.ok) {
        let message = "Failed to download PDF";

        try {
            const data = await response.json();
            message = data.message || message;
        } catch {
            // Ignore JSON parsing error
        }

        throw new Error(message);
    }

    const blob = await response.blob();

    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = downloadUrl;

    const pdfFileName = fileName?.toLowerCase().endsWith(".pdf")
        ? fileName
        : `${fileName}.pdf`;

    link.download = pdfFileName;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(downloadUrl);
};