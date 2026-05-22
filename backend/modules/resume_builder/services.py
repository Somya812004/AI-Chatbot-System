from langchain_groq import ChatGroq
from config import Config
from .prompts import RESUME_SYSTEM_PROMPT

llm = ChatGroq(
    temperature=0.5,
    groq_api_key=Config.GROQ_API_KEY,
    model="llama-3.1-8b-instant"
)

class ResumeService:
    @staticmethod
    def handle_chat(messages):
        formatted_messages = [("system", RESUME_SYSTEM_PROMPT)]
        for msg in messages:
            role = "human" if msg['role'] == 'user' else "ai"
            formatted_messages.append((role, msg['content']))
        
        response = llm.invoke(formatted_messages)
        return response.content
