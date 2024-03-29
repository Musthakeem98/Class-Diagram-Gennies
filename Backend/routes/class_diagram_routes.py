import flask
from prompt.prompt_engineer import preprocess_case_study

class_diagram_blueprint = flask.Blueprint('class_diagram', __name__)

@class_diagram_blueprint.route('/generate_class_diagram', methods=['POST'])

def generate_class_diagram_route():
    case_study = flask.request.json.get('case_study')
    corrected_plantuml_code = preprocess_case_study(case_study)
    return flask.jsonify({'plantuml_code': corrected_plantuml_code})