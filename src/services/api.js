const API_URL = "http://localhost:5000/api";

export const uploadPdf = async (file) => {
    const formData = new FormData();

    formData.append("pdf", file);

    const response = await fetch(`${API_URL}/pdf/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "PDF upload failed");
    }

    return data;
};