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
app = Flask(__name__, template_folder='placement prep/dsa ai assistant/templates')
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

RESUME_PROMPT = """You are an AI Career Assistant. Your goal is to lead the user through a premium, conversational resume-building experience.

--- CONVERSATION RULES ---
1. Ask ONLY ONE question at a time.
2. Keep questions short, friendly, and professional.
3. Use emojis subtly (🚀, ✨, 💼).
4. Do NOT ask for multiple details in one message.
5. If the user provides a partial answer, politely ask for the missing part.
6. If the user wants to skip, move to the next section smoothly.

--- THE FLOW ---
1. Name: Ask for their full name.
2. Target Role: Ask what job/role they are targeting.
3. College/University: Ask for their current or last college/university.
4. Degree: Ask for the degree they are pursuing.
5. Skills: Ask for their top technical/soft skills.
6. Projects: Ask for 1-2 key projects.
7. Experience: Ask for any internships or work experience.
8. Certifications: Ask for any relevant certifications.
9. Preferred Style: Ask if they want 'Modern', 'ATS Friendly', or 'Minimal'.

--- PROGRESS TRACKING ---
At the start of each question, include a progress indicator like "Step 2 of 9".

--- FINAL GENERATION ---
Once ALL details are collected, generate a complete, professionally formatted resume.
Use <h1> for the name and <h2> for section headers.
"""

GENERAL_PROMPT = "You are a helpful AI Assistant for a Placement Preparation platform."

# ===================== DSA TOPICS =====================
DSA_TOPICS = {
    "Arrays": ["Basics", "Two Pointer", "Sliding Window", "Kadane", "Prefix Sum"],
    "Linked List": ["Reverse", "Detect Cycle", "Fast & Slow Pointer"],
    "Stack/Queue": ["Valid Parentheses", "Monotonic Stack", "Sliding Window Max"],
    "Trees/Graphs": ["Traversals", "BST", "BFS/DFS", "Shortest Path"],
    "Dynamic Programming": ["Knapsack", "LCS", "Fibonacci", "Grids"]
}

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

# ===================== UI ENDPOINT (DSA) =====================
@app.route("/", methods=["GET", "POST"])
def index():
    answer = None
    question = ""
    current_mode = request.form.get("mode", "topic")
    current_context = request.form.get("context", "General")

    if request.method == "POST":
        posted_question = request.form.get("question")
        posted_code = request.form.get("code")
        
        if posted_question:
            # Format input for LLM
            user_input = posted_question
            if posted_code and posted_code.strip():
                user_input = f"{posted_question}\n\n[USER CODE]:\n```python\n{posted_code}\n```"
            
            full_query = [
                ("system", DSA_SYSTEM_PROMPT),
                ("human", f"Context: {current_context}\nMode: {current_mode}\nMessage: {user_input}")
            ]
            
            response = llm.invoke(full_query)
            answer = response.content
            
            # Formatting for UI
            answer = re.sub(r'```python\n?(.*?)```', r'<pre><code class="language-python">\1</code></pre>', answer, flags=re.DOTALL)
            answer = re.sub(r'```\n?(.*?)```', r'<pre><code>\1</code></pre>', answer, flags=re.DOTALL)
            answer = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', answer)
            
            parts = re.split(r'(<pre>.*?</pre>)', answer, flags=re.DOTALL)
            for i in range(len(parts)):
                if not parts[i].startswith('<pre>'):
                    parts[i] = parts[i].replace('\n', '<br>')
            answer = "".join(parts)
            question = posted_question

    return render_template(
        "index.html",
        answer=answer,
        question=question,
        topics=DSA_TOPICS,
        mode=current_mode,
        context=current_context
    )

if __name__ == "__main__":
    app.run(debug=True, port=5000)
