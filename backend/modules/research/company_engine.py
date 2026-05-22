COMPANIES = [
    {"Company": "Google", "Industry": "Technology", "Location": "USA", "Domain": "Search, AI, Cloud", "Skills": "Python, TensorFlow, Distributed Systems"},
    {"Company": "Microsoft", "Industry": "Technology", "Location": "USA", "Domain": "Cloud, AI, Productivity", "Skills": "Azure, C#, Python, ML"},
    {"Company": "Amazon", "Industry": "E-commerce / Cloud", "Location": "USA", "Domain": "AWS, Logistics, AI", "Skills": "Java, AWS, Distributed Systems"},
    {"Company": "Infosys", "Industry": "IT Services", "Location": "Bangalore", "Domain": "Consulting, Digital, Cloud", "Skills": "Java, Python, Cloud, Agile"},
    {"Company": "TCS", "Industry": "IT Services", "Location": "Mumbai", "Domain": "IT Consulting, BPO, Digital", "Skills": "Java, SAP, Python, Testing"},
    {"Company": "Wipro", "Industry": "IT Services", "Location": "Bangalore", "Domain": "IT, Cloud, Consulting", "Skills": "Cloud, Data Engineering, Python"},
    {"Company": "Flipkart", "Industry": "E-commerce", "Location": "Bangalore", "Domain": "Retail Tech, Logistics, AI", "Skills": "Java, Python, Kafka, ML"},
    {"Company": "Razorpay", "Industry": "FinTech", "Location": "Bangalore", "Domain": "Payments, Banking APIs", "Skills": "Go, Node.js, React, DevOps"},
    {"Company": "NVIDIA", "Industry": "Semiconductor / AI", "Location": "USA", "Domain": "GPU, AI Research, HPC", "Skills": "CUDA, C++, Deep Learning, Python"},
    {"Company": "Zepto", "Industry": "Quick Commerce", "Location": "Mumbai", "Domain": "Supply Chain, ML", "Skills": "Python, React, Kubernetes, Data Science"},
    {"Company": "PhonePe", "Industry": "FinTech", "Location": "Bangalore", "Domain": "Digital Payments, UPI", "Skills": "Kotlin, Python, Distributed Systems"},
    {"Company": "Zomato", "Industry": "Food Tech", "Location": "Delhi", "Domain": "Food Delivery, ML, Logistics", "Skills": "Python, Go, React, Data Engineering"},
]

class CompanyEngine:
    @staticmethod
    def get_companies(filters=None):
        data = COMPANIES
        if filters:
            if filters.get('location'):
                data = [c for c in data if filters['location'].lower() in c['Location'].lower()]
            if filters.get('industry'):
                data = [c for c in data if filters['industry'].lower() in c['Industry'].lower()]
        return data

    @staticmethod
    def get_details(company_id):
        return {
            "id": company_id,
            "name": "Google",
            "overview": "Tech giant specializing in search, AI, and advertising.",
            "hiring_process": "4-5 rounds including Technical Screening, Coding, and System Design."
        }
