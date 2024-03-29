import flask
from flask_cors import CORS
from routes.class_diagram_routes import class_diagram_blueprint
from routes.user_routes import user_blueprint
from routes.code_gen import code_blueprint

app = flask.Flask(__name__)
CORS(app)
app.register_blueprint(class_diagram_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(code_blueprint)

if __name__ == '__main__':
    app.run(port=3005)