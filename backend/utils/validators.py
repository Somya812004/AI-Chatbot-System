def validate_request_data(data, required_fields):
    for field in required_fields:
        if field not in data:
            return False, f"Missing field: {field}"
    return True, None
