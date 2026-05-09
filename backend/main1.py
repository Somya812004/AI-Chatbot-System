import os
import re
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq
from dotenv import load_dotenv

# ===================== LOAD ENV =====================
load_dotenv()
groq_api_key = os.getenv("groq_api_key")

# ===================== INITIALIZE APP =====================
app = Flask(__name__, template_folder='templates')
CORS(app)  # Enable CORS for frontend communication

# ===================== INITIALIZE LLM =====================
# Set temperature to 0 for consistent logic and math
llm = ChatGroq(
    temperature=0,
    groq_api_key=groq_api_key,
    model="llama-3.1-8b-instant"
)

# ===================== PROMPTS =====================

DSA_SYSTEM_PROMPT = """
You are a Personal Coding Mentor. Your goal is to guide, evaluate, and train the user through a realistic placement preparation journey.

--- GLOBAL BEHAVIOR ---
- Be PROACTIVE. NEVER assume skill levels. ADAPTIVE ANALYSIS of mistakes.
- Use POLITE SUGGESTIONS: "You seem to need more practice in [Topic]..."
- NEVER dump solutions immediately.

--- MODES ---
1. 🧠 SOLVE: ONE problem at a time. WAIT for approach/code. EVALUATE (Correctness, Approach, Complexity, Better Way).
2. 💻 EXPLAIN/🐞 DEBUG: Line-by-line breakdown or syntax/logic fix.
3. 🧩 TOPIC: Concept | Key Pattern | 1 Problem.
"""

INTERVIEW_PROMPT = """
You are an experienced interviewer. Simulate a realistic experience.
- Ask ONLY ONE question at a time. WAIT for response.
- EVALUATE strictly (Score X/10, Result, Strengths, Issues, Suggestions).
- ADAPTIVE follow-ups based on the candidate's answers.
"""

APTITUDE_PROMPT = """
You are an expert aptitude trainer. Focus on Speed, Accuracy, and Shortcuts.
- Format: Score X/10, Result, Step-by-Step, and Shortcut Method (Mandatory).
- Use shortcuts like Net Effect = a + b + ab/100.
"""

RESUME_PROMPT = """You are an AI Career Assistant. Your goal is to lead the user through a premium, conversational resume-building experience."""

GENERAL_PROMPT = "You are a helpful AI Assistant for a Placement Preparation platform."

# ===================== TOPICS =====================
DSA_TOPICS = {
    "Arrays": ["Basics", "Two Pointer", "Sliding Window", "Kadane", "Prefix Sum"],
    "Linked List": ["Reverse", "Detect Cycle", "Fast & Slow Pointer"],
    "Stack/Queue": ["Valid Parentheses", "Monotonic Stack", "Sliding Window Max"],
    "Trees/Graphs": ["Traversals", "BST", "BFS/DFS", "Shortest Path"],
    "Dynamic Programming": ["Knapsack", "LCS", "Fibonacci", "Grids"]
}

APTITUDE_TOPICS = {
    "Quantitative": ["Percentage & Profit Loss", "Time and Work", "Ratio and Proportion", "Number Systems", "Averages & Mixtures"],
    "Logical Reasoning": ["Blood Relations", "Syllogisms", "Seating Arrangement", "Coding-Decoding", "Data Sufficiency"],
    "Verbal Ability": ["Reading Comprehension", "Sentence Correction", "Antonyms & Synonyms", "Idioms & Phrases"]
}

# ===================== HELPER =====================
def format_response(answer):
    # Formatting for UI
    answer = re.sub(r'```python\n?(.*?)```', r'<pre><code class="language-python">\1</code></pre>', answer, flags=re.DOTALL)
    answer = re.sub(r'```\n?(.*?)```', r'<pre><code>\1</code></pre>', answer, flags=re.DOTALL)
    answer = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', answer)
    
    parts = re.split(r'(<pre>.*?</pre>)', answer, flags=re.DOTALL)
    for i in range(len(parts)):
        if not parts[i].startswith('<pre>'):
            parts[i] = parts[i].replace('\n', '<br>')
    return "".join(parts)

# ===================== API ENDPOINT =====================
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages = data.get('messages', [])
        mode = data.get('mode', 'dashboard')
        
        # Select System Prompt
        system_content = GENERAL_PROMPT
        if mode == 'interview': system_content = INTERVIEW_PROMPT
        elif mode == 'aptitude': system_content = APTITUDE_PROMPT
        elif mode == 'coding': system_content = DSA_SYSTEM_PROMPT
        elif mode == 'resume-builder': system_content = RESUME_PROMPT
        
        formatted_messages = [("system", system_content)]
        for msg in messages:
            role = "human" if msg['role'] == 'user' else "ai"
            formatted_messages.append((role, msg['content']))
        
        response = llm.invoke(formatted_messages)
        answer = response.content
        
        # Formatting
        answer = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', answer, flags=re.MULTILINE)
        answer = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', answer, flags=re.MULTILINE)
        answer = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', answer)
        answer = answer.replace('\n', '<br>')
        
        return jsonify({"response": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===================== UI ROUTES =====================

@app.route("/coding", methods=["GET", "POST"])
@app.route("/", methods=["GET", "POST"])
def coding_index():
    answer = None
    question = ""
    if request.method == "POST":
        posted_question = request.form.get("question")
        if posted_question:
            response = llm.invoke([("system", DSA_SYSTEM_PROMPT), ("human", posted_question)])
            answer = format_response(response.content)
            question = ""
    return render_template("coding.html", answer=answer, question=question, topics=DSA_TOPICS)

@app.route("/aptitude", methods=["GET", "POST"])
def aptitude_index():
    answer = None
    question = ""
    if request.method == "POST":
        posted_question = request.form.get("question")
        if posted_question:
            response = llm.invoke([("system", APTITUDE_PROMPT), ("human", posted_question)])
            answer = format_response(response.content)
            question = ""
    return render_template("aptitude.html", answer=answer, question=question, topics=APTITUDE_TOPICS)

@app.route("/interview", methods=["GET", "POST"])
def interview_index():
    answer = None
    question = ""
    if request.method == "POST":
        posted_question = request.form.get("question")
        if posted_question:
            response = llm.invoke([("system", INTERVIEW_PROMPT), ("human", posted_question)])
            answer = format_response(response.content)
            question = ""
    return render_template("interview.html", answer=answer, question=question)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
