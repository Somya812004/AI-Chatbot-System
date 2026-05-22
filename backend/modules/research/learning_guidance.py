from langchain_groq import ChatGroq
from config import Config

llm = ChatGroq(
    temperature=0.2,
    groq_api_key=Config.GROQ_API_KEY,
    model="llama-3.1-8b-instant"
)

class LearningGuidance:
    @staticmethod
    def analyze_skill_gap(resume_text, target_role):
        prompt = f"Compare resume with '{target_role}' role requirements and suggest improvements.\nResume: {resume_text}"
        response = llm.invoke([("system", "You are an AI Career Expert."), ("human", prompt)])
        return {"analysis": response.content}

    @staticmethod
    def get_roadmaps(role):
        prompt = f"Create a structured learning roadmap for '{role}'."
        response = llm.invoke([("system", "You are an AI Education Consultant."), ("human", prompt)])
        return {"roadmap": response.content}
