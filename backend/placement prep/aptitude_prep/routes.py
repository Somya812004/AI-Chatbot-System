from flask import Blueprint, request, jsonify
from .services import generate_question

aptitude_bp = Blueprint('aptitude', __name__)

@aptitude_bp.route('/question', methods=['GET'])
def question():
    response = generate_question()
    return jsonify(response)
