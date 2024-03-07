class User:
    def __init__(self, name, email, username, password):
        self.name = name
        self.email = email
        self.username = username
        self.password = password

    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'username': self.username,
            'password': self.password
        }
