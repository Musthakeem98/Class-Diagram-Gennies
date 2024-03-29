from openai_connector import send_openAI

# Example function for further prompt engineering
def preprocess_case_study(case_study):
    prompt = f"Generate a PlantUML class diagram based on the following case study:\n\n{case_study}\n\nProvide only the PlantUML code representing the class diagram.\ndon't add ```plantuml just give the plantuml code/n"
    return send_openAI(prompt)
