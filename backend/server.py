import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

# Initialize Groq client
api_key = os.getenv("groq_api_key")
client = Groq(api_key=api_key)

SYSTEM_PROMPT = """
Act as a smart AI Resume Builder.

GOAL:
Collect user information step-by-step by asking ONLY ONE question at a time.

STRICT RULES:
- Ask ONLY ONE question
- Wait for user response before continuing
- Do NOT ask multiple fields together
- Do NOT show full form or list
- Do NOT repeat already answered questions
- Keep questions short and simple
- Do NOT use markdown symbols like ** or *

FLOW ORDER (STRICT - IN THIS EXACT ORDER):
1. Full Name
2. City and State
3. Phone Number
4. Email
5. LinkedIn
6. GitHub (optional)
7. College Name
8. Degree + CGPA
9. College Location
10. Coursework / Skills
11. Projects (one project at a time)
12. Experience
13. Technical Skills
14. Extracurricular
15. Certifications

BEHAVIOR:
- After each answer, confirm briefly (e.g., "Got it").
- Then immediately ask the next question.
- Keep conversation natural like chat.
- Clean, minimal interaction. No long paragraphs.

FINAL STEP:
- After all data is collected (up to step 15), generate the ONE-PAGE resume automatically.
- Output ONLY the final raw HTML resume. Do not output any explanation or conversational text with the resume.

FINAL RESUME FORMATTING (HTML):
Generate the resume using this EXACT HTML structure to match the academic layout:

```html
<div class="resume-container" style="font-family: 'Times New Roman', Times, serif; color: #000; padding: 0.5in; max-width: 8.5in; margin: auto; line-height: 1.15; font-size: 10pt;">
    <style>
        .resume-container h1 { text-align: center; margin: 0; font-size: 22pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #000 !important; }
        .resume-location { text-align: center; font-size: 11pt; margin-top: 2px; color: #000; }
        .resume-contact { text-align: center; font-size: 10pt; margin: 2px 0 10px 0; color: #000; }
        .resume-section-title { font-size: 11pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; margin: 12px 0 4px 0; padding-bottom: 1px; color: #000; }
        .resume-row { display: flex; justify-content: space-between; margin-top: 3px; font-weight: bold; color: #000; }
        .resume-sub-row { display: flex; justify-content: space-between; margin-top: 1px; color: #000; }
        .resume-list { margin: 2px 0 6px 15px; padding: 0; list-style-type: disc; color: #000; }
        .resume-list li { margin-bottom: 1px; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; margin: 4px 0; padding-left: 15px; }
        .skills-grid li { list-style-type: disc; margin-bottom: 1px; color: #000; }
        .skills-grid-2 { display: grid; grid-template-columns: 1fr 1fr; margin: 4px 0; padding-left: 15px; }
        .skills-grid-2 li { list-style-type: disc; margin-bottom: 1px; color: #000; }
        .tech-skills { margin: 4px 0; color: #000; }
        .date-align { text-align: right; font-weight: normal; color: #000; }
        .italic { font-style: italic; font-weight: normal; color: #000; }
    </style>

    <h1>[FULL NAME]</h1>
    <div class="resume-location">[City, State]</div>
    <div class="resume-contact">
        [Phone] | [Email] | [LinkedIn] | [GitHub]
    </div>

    <div class="resume-section-title">EDUCATION</div>
    <div class="resume-row">
        <span>[College Name]</span>
        <span class="date-align">[Dates]</span>
    </div>
    <div class="resume-sub-row">
        <span>[Degree]</span>
        <span class="date-align">[Location]</span>
    </div>
    <div class="resume-sub-row">
        <span>CGPA/Percentage: [Score]</span>
    </div>

    <div class="resume-section-title">COURSEWORK / SKILLS</div>
    <ul class="skills-grid">
        <li>[Course 1]</li>
        <li>[Course 2]</li>
        <li>[Course 3]</li>
    </ul>

    <div class="resume-section-title">PROJECTS</div>
    <div class="resume-row">
        <span>[Project Name] | [Tech Stack]</span>
        <span class="date-align">[Dates]</span>
    </div>
    <ul class="resume-list">
        <li>[Bullet 1]</li>
        <li>[Bullet 2]</li>
    </ul>

    <div class="resume-section-title">INTERNSHIP / EXPERIENCE</div>
    <div class="resume-row">
        <span>[Company Name]</span>
        <span class="date-align">[Dates]</span>
    </div>
    <div class="italic">[Role Name]</div>
    <ul class="resume-list">
        <li>[Bullet 1]</li>
        <li>[Bullet 2]</li>
    </ul>

    <div class="resume-section-title">TECHNICAL SKILLS</div>
    <div class="tech-skills">
        <b>Languages:</b> [List]<br/>
        <b>Developer Tools:</b> [List]<br/>
        <b>Technologies/Frameworks:</b> [List]
    </div>

    <div class="resume-section-title">EXTRACURRICULAR</div>
    <div class="resume-row">
        <span>[Organization Name]</span>
        <span class="date-align">[Dates]</span>
    </div>
    <div class="italic">[Role]</div>
    <ul class="resume-list">
        <li>[Bullet 1]</li>
    </ul>

    <div class="resume-section-title">CERTIFICATIONS</div>
    <ul class="skills-grid-2">
        <li>[Cert 1]</li>
        <li>[Cert 2]</li>
    </ul>
</div>
```
"""


@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="Groq API key not configured")

    try:
        # Prepare messages including system prompt
        api_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in request.messages:
            api_messages.append({"role": msg.role, "content": msg.content})

        chat_completion = client.chat.completions.create(
            messages=api_messages,
            model="llama-3.1-8b-instant",
            temperature=1,
            max_completion_tokens=2000,
            top_p=1,
        )
        return {"response": chat_completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
