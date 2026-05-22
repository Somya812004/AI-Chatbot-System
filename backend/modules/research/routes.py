from flask import Blueprint, request, jsonify
from .services import (
    get_companies, get_company_details, get_roles, get_industry_trends,
    analyze_skill_gap, get_roadmaps, get_interview_experiences,
    get_salary_insights, get_career_guidance
)

research_bp = Blueprint('research', __name__)

@research_bp.route('/companies', methods=['GET'])
def companies():
    filters = request.args.to_dict()
    return jsonify(get_companies(filters))

@research_bp.route('/company/<company_id>', methods=['GET'])
def company_details(company_id):
    return jsonify(get_company_details(company_id))

@research_bp.route('/roles', methods=['GET'])
def roles():
    return jsonify(get_roles())

@research_bp.route('/trends', methods=['GET'])
def trends():
    return jsonify(get_industry_trends())

@research_bp.route('/analyze-skills', methods=['POST'])
def analyze_skills():
    # In a real app, handle file upload for resume
    data = request.json
    resume_text = data.get('resume_text', '')
    target_role = data.get('target_role', '')
    return jsonify(analyze_skill_gap(resume_text, target_role))

@research_bp.route('/roadmaps', methods=['GET'])
def roadmaps():
    role = request.args.get('role')
    return jsonify(get_roadmaps(role))

@research_bp.route('/interviews', methods=['GET'])
def interviews():
    company = request.args.get('company')
    return jsonify(get_interview_experiences(company))

@research_bp.route('/salary', methods=['GET'])
def salary():
    role = request.args.get('role')
    return jsonify(get_salary_insights(role))

@research_bp.route('/ai-guidance', methods=['POST'])
def ai_guidance():
    data = request.json
    query = data.get('query', '')
    return jsonify(get_career_guidance(query))

@research_bp.route('/unified', methods=['POST'])
def unified():
    data = request.json
    query = data.get('query', '')
    return jsonify(get_career_guidance(query))
