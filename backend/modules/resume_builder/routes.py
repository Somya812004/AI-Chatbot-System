from flask import Blueprint, request, jsonify
from .services import ResumeService

resume_builder_bp = Blueprint('resume_builder', __name__)

@resume_builder_bp.route('/generate', methods=['POST'])
def generate_resume():
    data = request.json
    messages = data.get('messages', [])
    response = ResumeService.handle_chat(messages)
    return jsonify({"response": response})
