import flask
from routes.class_diagram_routes import class_diagram_blueprint

app = flask.Flask(__name__)
app.register_blueprint(class_diagram_blueprint)

if __name__ == '__main__':
    app.run(port=3005)