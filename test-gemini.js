const API_KEY = 'AIzaSyAACpyWJ4FFshFPEMIw1ZXJ9mw11VGSg3E';

async function testGemini() {
    console.log("Testing Gemini API...");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);

        const data = await response.json();
        if (data.models) {
            console.log("--- MODELS START ---");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(m.name);
                }
            });
            console.log("--- MODELS END ---");
        } else {
            console.log("Response:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

testGemini();
