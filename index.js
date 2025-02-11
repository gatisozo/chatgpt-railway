const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "You are a chatbot for a medical clinic." },
                       { role: "user", content: userMessage }],
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

