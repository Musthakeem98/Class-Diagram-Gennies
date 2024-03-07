from pymongo import MongoClient

def initialize_mongodb():
    client = MongoClient("mongodb://localhost:27019")
    mydb = client["ClassDiagram"]
    print("connected to mongoDb")
    return mydb