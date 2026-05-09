from flask import Flask
from flask_cors import CORS
from coding_prep.routes import coding_bp
from aptitude_prep.routes import aptitude_bp
from research.routes import research_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(coding_bp, url_prefix='/coding')
app.register_blueprint(aptitude_bp, url_prefix='/aptitude')
app.register_blueprint(research_bp, url_prefix='/research')

@app.route('/')
def home():
    return {"message": "AI Placement Platform API is running"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
