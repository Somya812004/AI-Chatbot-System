from flask import Blueprint, request, jsonify
from .services import PlacementPrepService

placement_prep_bp = Blueprint('placement_prep', __name__)

@placement_prep_bp.route('/aptitude/chat', methods=['POST'])
def aptitude_chat():
    data = request.json
    messages = data.get('messages', [])
    response = PlacementPrepService.get_aptitude_response(messages)
    return jsonify({"response": response})

@placement_prep_bp.route('/coding/chat', methods=['POST'])
def coding_chat():
    data = request.json
    messages = data.get('messages', [])
    response = PlacementPrepService.get_coding_response(messages)
    return jsonify({"response": response})

@placement_prep_bp.route('/interview/chat', methods=['POST'])
def interview_chat():
    data = request.json
    messages = data.get('messages', [])
    response = PlacementPrepService.get_interview_response(messages)
    return jsonify({"response": response})

@placement_prep_bp.route('/skill-gap/chat', methods=['POST'])
def skill_gap_chat():
    data = request.json
    messages = data.get('messages', [])
    response = PlacementPrepService.get_skill_gap_response(messages)
    return jsonify({"response": response})
