class ChatMemory:
    def __init__(self):
        self.memories = {}

    def get_history(self, user_id):
        return self.memories.get(user_id, [])[-10:]  # Last 10 messages

    def add_message(self, user_id, role, content):
        if user_id not in self.memories:
            self.memories[user_id] = []
        self.memories[user_id].append({"role": role, "content": content})
