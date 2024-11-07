from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

dolar_api = 'https://dolarapi.com/v1/'
argentina_datos = 'https://api.argentinadatos.com/v1/cotizaciones/dolares/'


@app.route('/')
def index():
    return '<p>Flask is working!</p>'


@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Flask is working!"})


@app.route('/dolares', methods=['GET'])
def get_dolares():
    try:

        response = requests.get(f'{dolar_api}dolares')
        response.raise_for_status()

        data = response.json()

        return jsonify(data)

    except requests.RequestException as e:

        return jsonify({"error": "Error al obtener los datos de la API"}), 500

@app.route('/cotizaciones', methods=['GET'])
def get_cotizaciones():
    try:

        response = requests.get(f'{dolar_api}cotizaciones')
        response.raise_for_status()

        data = response.json()

        return jsonify(data)

    except requests.RequestException as e:

        return jsonify({"error": "Error al obtener los datos de la API"}), 500


@app.route('/historico', methods=['GET'])
def get_historico():
    try:

        response = requests.get(f'{argentina_datos}oficial')
        response.raise_for_status()

        data = response.json()

        return jsonify(data)

    except requests.RequestException as e:

        return jsonify({"error": "Error al obtener los datos de la API"}), 500


if __name__ == "__main__":
    app.run(debug=True)
