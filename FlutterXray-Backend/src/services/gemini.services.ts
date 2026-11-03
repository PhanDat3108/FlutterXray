import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateFlutterFromImage = async (imageUrl: string): Promise<string> => {
    try {
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        const mimeType = response.headers.get('content-type') || 'image/jpeg';

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

        const prompt = `
        You are an Expert Flutter Developer. 
        Analyze the provided UI wireframe/design image and convert it into production-ready Flutter code.
        
        CRITICAL RULES:
        1. Return ONLY valid Dart code. NO markdown formatting, NO backticks (\`\`\`dart), NO explanations, NO pleasantries. 
        2. The output must start exactly with 'import' and end with the last closing brace.
        3. Use Material 3 widgets. Ensure the layout is responsive and structurally sound (e.g., using SafeArea, Scaffold, Column, Row, Expanded).
        4. Break down complex parts into local stateless widgets if necessary, but keep it all in one file for easy copy-pasting.
        5. Use placeholder data/images (e.g., from network) if the design has specific images.
        `;

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();

        const cleanCode = responseText.replace(/```dart\n/g, '').replace(/```/g, '').trim();

        return cleanCode;
    } catch (error) {
        console.error("Lỗi Gemini Service:", error);
        throw new Error("Không thể sinh code từ AI vào lúc này!");
    }
};
