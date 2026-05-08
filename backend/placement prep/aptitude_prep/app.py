from flask import Flask, render_template, request
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()
groq_api_key = os.getenv("groq_api_key")

app = Flask(__name__, template_folder='templates')

llm = ChatGroq(
    temperature=0,
    groq_api_key=groq_api_key,
    model="llama-3.1-8b-instant"
)

APTITUDE_PROMPT = """
You are an expert Aptitude Trainer for placement preparation. 
Your goal is to help students master quantitative, logical, and verbal reasoning.

Guidelines:
- Explain the concept clearly.
- Provide step-by-step solutions.
- ALWAYS provide a 'Shortcut Method' or 'Fast Calculation Trick'.
- Mention common mistakes to avoid.
- Ask one follow-up practice question at the end.

Question:
{question}
"""

APTITUDE_TOPICS = {
    "Quantitative": [
        "Percentage & Profit Loss",
        "Time and Work",
        "Ratio and Proportion",
        "Number Systems",
        "Averages & Mixtures"
    ],
    "Logical Reasoning": [
        "Blood Relations",
        "Syllogisms",
        "Seating Arrangement",
        "Coding-Decoding",
        "Data Sufficiency"
    ],
    "Verbal Ability": [
        "Reading Comprehension",
        "Sentence Correction",
        "Antonyms & Synonyms",
        "Idioms & Phrases"
    ]
}

def ask_aptitude(question):
    prompt = APTITUDE_PROMPT.format(question=question)
    response = llm.invoke(prompt)
    return response.content

@app.route("/", methods=["GET", "POST"])
def index():
    answer = None
    question = ""

    if request.method == "POST":
        posted_question = request.form.get("question")
        if posted_question:
            answer = ask_aptitude(posted_question)
            # Basic markdown to HTML conversion
            if "```" in answer:
                answer = answer.replace("```python", "<pre><code>").replace("```", "</code></pre>")
            answer = answer.replace("\n", "<br>")
            question = ""

    return render_template(
        "index.html",
        answer=answer,
        question=question,
        topics=APTITUDE_TOPICS,
        title="Aptitude Assistant"
    )

if __name__ == "__main__":
    app.run(debug=True, port=5002)
