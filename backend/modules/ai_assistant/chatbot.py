from flask import Blueprint, request, jsonify
from langchain_groq import ChatGroq
from config import Config
from .prompts import GENERAL_ASSISTANT_PROMPT
from .memory import ChatMemory

ai_assistant_bp = Blueprint('ai_assistant', __name__)

llm = ChatGroq(
    temperature=0.7,
    groq_api_key=Config.GROQ_API_KEY,
    model="llama-3.1-8b-instant"
)

memory = ChatMemory()

@ai_assistant_bp.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id', 'default')
    message = data.get('message', '')
    
    # Retrieve context from memory
    history = memory.get_history(user_id)
    
    system_prompt = GENERAL_ASSISTANT_PROMPT
    if user_id and user_id != 'default':
        system_prompt += f"\nThe user's name is {user_id}. Address them by name when appropriate."

    formatted_messages = [("system", system_prompt)]
    for msg in history:
        formatted_messages.append((msg['role'], msg['content']))
    formatted_messages.append(("human", message))
    
    response = llm.invoke(formatted_messages)
    answer = response.content
    
    # Update memory
    memory.add_message(user_id, "human", message)
    memory.add_message(user_id, "ai", answer)
    
    return jsonify({"response": answer})
