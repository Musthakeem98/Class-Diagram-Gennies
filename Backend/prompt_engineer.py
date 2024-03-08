from openai_connector import generate_class_diagram

# Example function for further prompt engineering
def preprocess_case_study(case_study):
    prompt = f"Generate a PlantUML class diagram based on the following case study:\n\n{case_study}\n\nProvide only the PlantUML code representing the class diagram.\n"
    return generate_class_diagram(prompt)
