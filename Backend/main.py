import flask
from routes.class_diagram_routes import class_diagram_blueprint
from routes.user_routes import user_blueprint

app = flask.Flask(__name__)
app.register_blueprint(class_diagram_blueprint)
app.register_blueprint(user_blueprint)

if __name__ == '__main__':
    app.run(port=3005)