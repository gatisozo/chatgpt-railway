const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: "You are a chatbot for a medical clinic." },
                       { role: "user", content: userMessage }],
        });

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
