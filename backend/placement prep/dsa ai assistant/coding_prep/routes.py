from flask import Blueprint, request, jsonify
from .services import solve_problem

coding_bp = Blueprint('coding', __name__)

@coding_bp.route('/solve', methods=['POST'])
def solve():
    data = request.json
    response = solve_problem(data)
    return jsonify(response)
