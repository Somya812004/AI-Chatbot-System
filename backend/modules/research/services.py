from .company_engine import CompanyEngine
from .trend_analysis import TrendAnalysis
from .salary_engine import SalaryEngine
from .learning_guidance import LearningGuidance
from langchain_groq import ChatGroq
from config import Config
from .prompts import RESEARCH_SYSTEM_PROMPT

def get_companies(filters=None):
    return CompanyEngine.get_companies(filters)

def get_company_details(company_id):
    return CompanyEngine.get_details(company_id)

def get_roles():
    return [
        {"role": "Software Engineer", "demand": "High"},
        {"role": "AI Engineer", "demand": "Very High"}
    ]

def get_industry_trends():
    return TrendAnalysis.get_trends()

def analyze_skill_gap(resume_text, target_role):
    return LearningGuidance.analyze_skill_gap(resume_text, target_role)

def get_roadmaps(role):
    return LearningGuidance.get_roadmaps(role)

def get_salary_insights(role):
    return SalaryEngine.get_salary_insights(role)

def get_interview_experiences(company):
    return [{"user": "Rahul", "company": company, "experience": "Good"}]

def get_career_guidance(query):
    llm = ChatGroq(
        temperature=0.7,
        groq_api_key=Config.GROQ_API_KEY,
        model="llama-3.1-8b-instant"
    )
    
    messages = [
        ("system", RESEARCH_SYSTEM_PROMPT),
        ("human", query)
    ]
    
    response = llm.invoke(messages)
    return {"response": response.content}
