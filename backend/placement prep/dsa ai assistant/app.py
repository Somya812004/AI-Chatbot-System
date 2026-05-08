# ===================== LIBRARIES =====================
from flask import Flask, render_template, request
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

# ===================== LOAD ENV =====================
load_dotenv()
# Note: Using 'groq_api_key' to match your .env file
Grok = os.getenv("groq_api_key")

# ===================== INITIALIZE FLASK =====================
app = Flask(__name__)

# ===================== INITIALIZE GROQ =====================
llm = ChatGroq(
    temperature=0,
    groq_api_key=Grok,
    model="llama-3.1-8b-instant"
)

# ===================== PROMPT =====================
DSA_PROMPT = """
You are a DSA Preparation Assistant for coding interviews.

Guidelines:
- Explain concepts step by step
- Use simple language
- Give examples
- Mention time and space complexity
- Provide optimal approach
- If code is needed, use Python
- Ask one follow-up question at the end

Question:
{question}
"""

# ===================== FUNCTION =====================
def ask_dsa(question):
    prompt = DSA_PROMPT.format(question=question)
    response = llm.invoke(prompt)
    return response.content

# ===================== DSA TOPICS =====================
DSA_TOPICS = {
    "Arrays": [
        "Explain arrays with example",
        "Two Sum problem",
        "Kadane’s Algorithm"
    ],
    "Linked List": [
        "Singly vs Doubly Linked List",
        "Reverse a linked list",
        "Detect cycle in linked list"
    ],
    "Stack": [
        "Stack operations",
        "Valid Parentheses problem",
        "Next Greater Element"
    ],
    "Queue": [
        "Queue vs Deque",
        "Implement queue using stack",
        "Sliding Window Maximum"
    ],
    "Hashing": [
        "HashMap and HashSet",
        "Frequency counting",
        "Two Sum using hashing"
    ],
    "Recursion": [
        "Explain recursion with example",
        "Recursion vs Iteration",
        "Tower of Hanoi"
    ],
    "Binary Search": [
        "Binary Search algorithm",
        "Search in rotated array",
        "First and last occurrence"
    ],
    "Trees": [
        "Binary Tree vs BST",
        "Tree traversals",
        "Height of a binary tree"
    ],
    "Heaps": [
        "Min Heap vs Max Heap",
        "Heap sort",
        "Top K elements"
    ],
    "Graphs": [
        "BFS vs DFS",
        "Detect cycle in graph",
        "Dijkstra’s algorithm"
    ],
    "Dynamic Programming": [
        "What is DP?",
        "0/1 Knapsack",
        "Longest Common Subsequence"
    ],
    "Greedy": [
        "Greedy algorithm concept",
        "Activity Selection",
        "Fractional Knapsack"
    ],
    "Sorting": [
        "Merge Sort",
        "Quick Sort",
        "Time complexity of sorting algorithms"
    ],
    "Bit Manipulation": [
        "Basics of bit manipulation",
        "Check if number is power of 2",
        "Count set bits"
    ]
}

# ===================== ROUTES =====================
@app.route("/", methods=["GET", "POST"])
def index():
    answer = None
    question = ""

    if request.method == "POST":
        posted_question = request.form.get("question")
        if posted_question:
            answer = ask_dsa(posted_question)
            # Basic markdown to HTML conversion for code blocks
            if "```" in answer:
                answer = answer.replace("```python", "<pre><code>").replace("```", "</code></pre>")
            answer = answer.replace("\n", "<br>")
            question = ""

    return render_template(
        "index.html",
        answer=answer,
        question=question,
        topics=DSA_TOPICS
    )

# ===================== RUN =====================
if __name__ == "__main__":
    app.run(debug=True, port=5001)
