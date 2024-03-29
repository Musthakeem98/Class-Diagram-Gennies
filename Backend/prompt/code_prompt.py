from openai_connector import send_openAI

def generate_code(input_plantuml_code):
    prompt = f"Given the following PlantUML code representing a class diagram:\n\n{input_plantuml_code}\n\nGenerate a README.md file explaining the Java implementation based on this class diagram. Include an introduction, folder structure, and Java code for each class. Provide detailed explanations for each class and its attributes/methods.\n"
    return send_openAI(prompt)