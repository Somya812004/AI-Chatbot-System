from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from config import Config
from modules.research.routes import research_bp
from modules.placement_prep.routes import placement_prep_bp
from modules.resume_builder.routes import resume_builder_bp
from modules.ai_assistant.chatbot import ai_assistant_bp
from modules.placement_prep.services import PlacementPrepService

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Register Blueprints
app.register_blueprint(research_bp, url_prefix='/api/research')
app.register_blueprint(placement_prep_bp, url_prefix='/api/placement-prep')
app.register_blueprint(resume_builder_bp, url_prefix='/api/resume-builder')
app.register_blueprint(ai_assistant_bp, url_prefix='/api/ai-assistant')

@app.route('/')
def health_check():
    return jsonify({
        "status": "online",
        "message": "AI Chatbot System Backend is running",
        "version": "1.0.0"
    })

# Placement Prep Template Routes
APTITUDE_TOPICS = {
    "Quantitative": ["Percentage & Profit Loss", "Time and Work", "Ratio and Proportion", "Number Systems", "Averages & Mixtures"],
    "Logical Reasoning": ["Blood Relations", "Syllogisms", "Seating Arrangement", "Coding-Decoding", "Data Sufficiency"],
    "Verbal Ability": ["Reading Comprehension", "Sentence Correction", "Antonyms & Synonyms", "Idioms & Phrases"]
}

CODING_TOPICS = {
    "Data Structures": ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & Graphs", "Hash Tables"],
    "Algorithms": ["Sorting & Searching", "Dynamic Programming", "Greedy Algorithms", "Recursion & Backtracking", "Bit Manipulation"]
}

INTERVIEW_TOPICS = {
    "Behavioral": ["Tell me about yourself", "Strengths & Weaknesses", "Handling Conflict", "Future Goals"],
    "Technical": ["Project Discussion", "System Design Basics", "Core CS Concepts", "Problem Solving Approach"]
}

@app.route('/coding', methods=['GET', 'POST'])
def coding_page():
    answer = None
    name = request.args.get('name', 'User')
    if request.method == 'POST':
        question = request.form.get('question')
        name = request.form.get('name', 'User')
        if question:
            prompt = f"The user's name is {name}. " + question
            answer = PlacementPrepService.get_coding_response([{'role': 'user', 'content': prompt}])
            answer = answer.replace('\n', '<br>')
    return render_template('coding.html', topics=CODING_TOPICS, answer=answer, name=name)

@app.route('/aptitude', methods=['GET', 'POST'])
def aptitude_page():
    answer = None
    name = request.args.get('name', 'User')
    if request.method == 'POST':
        question = request.form.get('question')
        name = request.form.get('name', 'User')
        if question:
            prompt = f"The user's name is {name}. " + question
            answer = PlacementPrepService.get_aptitude_response([{'role': 'user', 'content': prompt}])
            answer = answer.replace('\n', '<br>')
    return render_template('aptitude.html', topics=APTITUDE_TOPICS, answer=answer, name=name)

@app.route('/interview', methods=['GET', 'POST'])
def interview_page():
    answer = None
    name = request.args.get('name', 'User')
    if request.method == 'POST':
        question = request.form.get('question')
        name = request.form.get('name', 'User')
        if question:
            prompt = f"The user's name is {name}. " + question
            answer = PlacementPrepService.get_interview_response([{'role': 'user', 'content': prompt}])
            answer = answer.replace('\n', '<br>')
    return render_template('interview.html', topics=INTERVIEW_TOPICS, answer=answer, name=name)

@app.route('/skill-gap', methods=['GET', 'POST'])
def skill_gap_page():
    answer = None
    name = request.args.get('name', 'User')
    if request.method == 'POST':
        question = request.form.get('question')
        name = request.form.get('name', 'User')
        if question:
            prompt = f"The user's name is {name}. " + question
            answer = PlacementPrepService.get_skill_gap_response([{'role': 'user', 'content': prompt}])
            answer = answer.replace('\n', '<br>')
    # Using INTERVIEW_TOPICS temporarily or we can create SKILL_GAP_TOPICS
    return render_template('skill_gap.html', answer=answer, name=name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=Config.DEBUG)
