# coding: utf-8

from flask import render_template

from app import app
from app.http.validation import Validation
from app.http.connection import Connection
from app.http.recommend import Recommend
from app.http.error import Error


# ---------------------------------------------
# Middleware Routing
# ---------------------------------------------

ver = '/v1/recommend'

@app.before_request
def beforeRequest():
    Validation().before_request()

# ---------------------------------------------
# Main Routing
# ---------------------------------------------


@app.route('/connection/ping', methods=['GET'])
def get_ping():
    return Connection().get_ping()


@app.route('/', methods=['GET'])
def get_index(name=None):
    return render_template('index.html', name=name)


@app.route(ver + '/prototype', methods=['GET'])
def get():
    # Validation().list_messages()
    return Recommend().get()


# ---------------------------------------------
# Error Routing
# ---------------------------------------------


http_error = Error()


@app.errorhandler(400)
def bad_request(error):
    return http_error.bad_request(error.description)


@app.errorhandler(401)
def unauthorized(error):
    return http_error.unauthorized(error.description)


@app.errorhandler(403)
def forbidden(error):
    return http_error.forbidden(error.description)


@app.errorhandler(404)
def not_found(error):
    return http_error.not_found(error.description)


@app.errorhandler(405)
def method_not_allowed(error):
    return http_error.method_not_allowed(error.description)


@app.errorhandler(408)
def request_timeout(error):
    return http_error.request_timeout(error.description)


@app.errorhandler(409)
def conflict(error):
    return http_error.conflict(error.description)


@app.errorhandler(500)
def internal_server_error(error):
    return http_error.internal_server_error(error.description)
