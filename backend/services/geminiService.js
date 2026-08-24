const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const generateFlashcardsFromPdf = async (
    buffer,
    mimeType = "application/pdf"
) => {

    try {

        // Convert ORIGINAL PDF to Base64
        const base64Pdf = buffer.toString("base64");


        const prompt = `
You are an expert educational assistant.

Analyze the entire PDF carefully.

The PDF may contain:
- normal text
- headings
- chapters
- sections
- tables
- diagrams
- images
- scanned pages

Your task is to:

1. Identify the meaningful chapters or major sections in the PDF.
2. Keep the chapters in the same logical order as they appear in the PDF.
3. For every chapter, generate important study flashcards.
4. Each flashcard must contain one question and one answer.
5. Questions should test important concepts, definitions, facts, explanations,
   comparisons, processes, or other useful study information.
6. Use ONLY information that exists in the PDF.
7. Do NOT invent information.
8. Do NOT create a chapter if there is no meaningful content for it.
9. Generate multiple useful flashcards for each meaningful chapter.
10. Return ONLY valid JSON.
11. Do not use markdown.
12. Do not write anything before or after the JSON.

Return exactly this structure:

{
  "chapters": [
    {
      "title": "Chapter title",
      "order": 1,
      "flashcards": [
        {
          "question": "Question",
          "answer": "Answer"
        }
      ]
    }
  ]
}

Make sure:
- "order" starts from 1.
- Every chapter has a unique order.
- Every chapter has at least one flashcard.
- Every question has an answer.
- Questions and answers must be based only on the PDF.
`;


        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: [
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: base64Pdf
                    }
                },
                {
                    text: prompt
                }
            ]

        });


        const text = response.text;

        if (!text) {
            throw new Error(
                "Gemini returned an empty response."
            );
        }


        // Remove markdown code fences if Gemini adds them
        let cleanedText = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();


        // Find JSON if Gemini accidentally adds extra text
        const firstBrace = cleanedText.indexOf("{");
        const lastBrace = cleanedText.lastIndexOf("}");

        if (firstBrace === -1 || lastBrace === -1) {
            throw new Error(
                "Gemini did not return valid JSON."
            );
        }

        cleanedText = cleanedText.substring(
            firstBrace,
            lastBrace + 1
        );


        const result = JSON.parse(cleanedText);


        // Validate response structure
        if (
            !result ||
            !Array.isArray(result.chapters)
        ) {
            throw new Error(
                "Invalid Gemini response structure."
            );
        }


        for (const chapter of result.chapters) {

            if (
                !chapter.title ||
                typeof chapter.order !== "number" ||
                !Array.isArray(chapter.flashcards)
            ) {
                throw new Error(
                    "Invalid chapter data returned by Gemini."
                );
            }


            for (const card of chapter.flashcards) {

                if (
                    !card.question ||
                    !card.answer
                ) {
                    throw new Error(
                        "Invalid flashcard data returned by Gemini."
                    );
                }

            }

        }


        return result;

    } catch (error) {

        console.error(
            "Gemini flashcard generation error:",
            error
        );

        throw new Error(
            error.message ||
            "Failed to generate flashcards from PDF."
        );
    }
};


module.exports = {
    generateFlashcardsFromPdf
};