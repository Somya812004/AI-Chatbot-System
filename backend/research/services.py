import pandas as pd
import os
from langchain_groq import ChatGroq
from config import Config

llm = ChatGroq(
    temperature=0.2,
    groq_api_key=Config.GROQ_API_KEY,
    model="llama-3.1-8b-instant"
)

def get_companies(filters=None):
    file_path = 'research/datasets/companies.xlsx'
    if not os.path.exists(file_path):
        return {"error": "Company dataset not found"}
    
    try:
        df = pd.read_excel(file_path)
        # Apply filters
        if filters:
            if 'location' in filters and filters['location']:
                df = df[df['Location'].str.contains(filters['location'], case=False, na=False)]
            if 'industry' in filters and filters['industry']:
                df = df[df['Industry'].str.contains(filters['industry'], case=False, na=False)]
            if 'role' in filters and filters['role']:
                # Assuming a 'Roles' column exists or using industry as proxy
                pass
                
        return df.head(100).to_dict(orient='records')
    except Exception as e:
        return {"error": str(e)}

def get_company_details(company_id):
    # Mock data for now, would typically fetch from DB or large Excel
    return {
        "id": company_id,
        "name": "Google",
        "overview": "Tech giant specializing in search, AI, and advertising.",
        "hiring_process": "4-5 rounds including Technical Screening, Coding, and System Design.",
        "interview_rounds": ["Online Assessment", "Technical Round 1", "Technical Round 2", "Googliness Round"],
        "skills_required": ["Data Structures", "Algorithms", "System Design", "Cloud Computing"],
        "salary_insights": "₹20L - ₹50L for freshers",
        "work_culture": "Innovative, inclusive, and high-performance.",
        "tech_stack": ["Python", "C++", "Java", "Go", "TensorFlow"],
        "placement_tips": "Focus on competitive programming and fundamental CS concepts."
    }

def get_roles():
    return [
        {"role": "Software Engineer", "demand": "High"},
        {"role": "AI Engineer", "demand": "Very High"},
        {"role": "Data Analyst", "demand": "Medium"},
        {"role": "Cybersecurity Analyst", "demand": "High"}
    ]

def get_industry_trends():
    return {
        "trending_tech": ["Generative AI", "Quantum Computing", "Blockchain"],
        "in_demand_skills": ["Prompt Engineering", "Cloud Architecture", "Cybersecurity"],
        "hiring_growth": "+15% in AI sector"
    }

def analyze_skill_gap(resume_text, target_role):
    prompt = f"""
    Compare the following resume with the requirements for the role of '{target_role}'.
    Identify missing skills, suggest projects, and provide a learning roadmap.
    Resume: {resume_text}
    """
    response = llm.invoke([("system", "You are an AI Career Expert."), ("human", prompt)])
    return {"analysis": response.content}

def get_roadmaps(role):
    prompt = f"Create a structured learning roadmap from beginner to advanced for the role of '{role}'."
    response = llm.invoke([("system", "You are an AI Education Consultant."), ("human", prompt)])
    return {"roadmap": response.content}

def get_interview_experiences(company):
    # Mock experiences
    return [
        {"user": "Rahul", "company": company, "experience": "The technical rounds were challenging but fair."},
        {"user": "Sneha", "company": company, "experience": "Focused heavily on behavioral questions."}
    ]

def get_salary_insights(role):
    return {
        "role": role,
        "avg_salary": "₹12,00,000",
        "range": "₹6,00,000 - ₹25,00,000"
    }

def get_career_guidance(query):
    response = llm.invoke([("system", "You are a career guidance AI."), ("human", query)])
    return {"response": response.content}
