from langchain_groq import ChatGroq
from config import Config
from .prompts import APTITUDE_PROMPT, CODING_PROMPT, INTERVIEW_PROMPT, SKILL_GAP_PROMPT

llm = ChatGroq(
    temperature=0,
    groq_api_key=Config.GROQ_API_KEY,
    model="llama-3.1-8b-instant"
)

class PlacementPrepService:
    @staticmethod
    def _get_chat_response(messages, system_prompt):
        formatted_messages = [("system", system_prompt)]
        for msg in messages:
            role = "human" if msg['role'] == 'user' else "ai"
            formatted_messages.append((role, msg['content']))
        
        response = llm.invoke(formatted_messages)
        return response.content

    @classmethod
    def get_aptitude_response(cls, messages):
        return cls._get_chat_response(messages, APTITUDE_PROMPT)

    @classmethod
    def get_coding_response(cls, messages):
        return cls._get_chat_response(messages, CODING_PROMPT)

    @classmethod
    def get_interview_response(cls, messages):
        return cls._get_chat_response(messages, INTERVIEW_PROMPT)

    @classmethod
    def get_skill_gap_response(cls, messages):
        return cls._get_chat_response(messages, SKILL_GAP_PROMPT)
