import flask
from prompt.code_prompt import generate_code

code_blueprint = flask.Blueprint('code_gen', __name__)

@code_blueprint.route('/code', methods=['POST'])

def generate_class_diagram_route():
    plntuml_code = flask.request.json.get('plant_uml')
    corrected_code = generate_code(plntuml_code)
    return flask.jsonify({'plantuml_code': corrected_code})