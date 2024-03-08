from bson import ObjectId
from flask import Blueprint, request, jsonify
from flask_bcrypt import check_password_hash, generate_password_hash
from mongodb.models.user_model import User
from mongodb.connection import initialize_mongodb

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/adduser', methods=["POST"])
def add_user():
    # Retrieve user data from request.json
    user_data = request.json
    name = user_data.get('name')
    email = user_data.get('email')
    username = user_data.get('username')
    password = user_data.get('password')

    hashed_password = generate_password_hash(password).decode('utf-8')
    # Initialize MongoDB connection
    db = initialize_mongodb()
    collection = db['users']

    # Create a new User object
    new_user = User(name, email, username, hashed_password)

    # Insert the new user into the database
    result = collection.insert_one(new_user.to_dict())

    if result.inserted_id:
        return "User added successfully"
    else:
        return "Failed to add user"



@user_blueprint.route('/getall', methods=["GET"])
def getusers():
    db = initialize_mongodb()
    collection = db['users']
    
    cursor = collection.find()
    documents_list = []
    for document in cursor:
        # Convert ObjectId to string for each document
        document['_id'] = str(document['_id'])
        documents_list.append(document)
    # Convert cursor object to a list of dictionaries

    print("Document :", documents_list)
    return jsonify(documents_list)


#delete the user
@user_blueprint.route('/deleteuser', methods=["DELETE"])
def deluser():
    db = initialize_mongodb()
    collection = db['users']

    user_id = request.args.get('id')

    if not user_id:
        return jsonify({"error": "User ID is required for deletion"}), 400
    
    result = collection.delete_one({'_id': ObjectId(user_id)})

    if result.deleted_count > 0:
        return "User deleted successfully"
    else:
        return "Failed to delete user", 404


@user_blueprint.route('/login', methods=['POST'])
def login():
    login_data = request.json
    username = login_data.get('username')
    password = login_data.get('password')

    db = initialize_mongodb()
    collection = db['users']

    # Retrieve user document from the database based on the provided username
    user = collection.find_one({'username': username})

    if user:
        # Extract the hashed password from the user document
        stored_password_hash = user.get('password')

        # Compare the provided password with the stored hashed password
        if check_password_hash(stored_password_hash, password):
            # Passwords match, login successful
            return jsonify({"message": "Login successful"})
        else:
            # Passwords do not match, login failed
            return jsonify({"error": "Invalid username or password"}), 401
    else:
        # User not found, login failed
        return jsonify({"error": "User not found"}), 404


