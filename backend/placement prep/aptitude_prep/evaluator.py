def evaluate_aptitude_answer(user_answer, correct_answer):
    if user_answer.strip().lower() == correct_answer.strip().lower():
        return True, "Correct!"
    return False, f"Incorrect. The correct answer is {correct_answer}."
