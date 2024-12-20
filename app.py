from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)
DATABASE = "correos.db"


def connect_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with connect_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS correos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL,
                mensaje TEXT NOT NULL,
                cotizaciones TEXT
            )
            """
        )
        conn.commit()


class Dolar:
    def __init__(self, nombre, compra, venta, fechaActualizacion):
        self.nombre = nombre
        self.compra = compra
        self.venta = venta
        self.fechaActualizacion = fechaActualizacion

    def to_dict(self):
        return {
            "nombre": self.nombre,
            "compra": self.compra,
            "venta": self.venta,
            "fechaActualizacion": self.fechaActualizacion,
        }


dolar_api = 'https://dolarapi.com/v1/'
argentina_datos = 'https://api.argentinadatos.com/v1/cotizaciones/dolares/'


@app.route('/')
def index():
    endpoints = [
        {"path": "/", "descripcion": "Pagina de inicio (GET)"},
        {"path": "/test", "descripcion": "Endpoint de prueba (GET)"},
        {"path": "/dolares",
            "descripcion": "Obtiene el tipo de cambio de diferentes dolares (GET)"},
        {"path": "/cotizaciones",
            "descripcion": "Obtiene las cotizaciones actuales (GET)"},
        {"path": "/historico",
            "descripcion": "Obtiene datos historicos de cotizaciones (GET)"},
        {"path": "/enviar-email",
            "descripcion": "Envia un correo electronico (POST)"},
        {"path": "/historial-emails",
            "descripcion": "Obtiene el historial de correos enviados (GET)"}
    ]
    return jsonify(endpoints), 200  


@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Flask is working!"})


@app.route('/dolares', methods=['GET'])
def get_dolares():
    try:
        response = requests.get(f'{dolar_api}dolares')
        response.raise_for_status()

        data = response.json()

        dolares = [Dolar(d["nombre"], d["compra"], d["venta"],
                         d["fechaActualizacion"]) for d in data]

        return jsonify([dolar.to_dict() for dolar in dolares])

    except requests.RequestException as e:
        return jsonify({"error": "Error al obtener los datos de la API"}), 500


@app.route('/cotizaciones', methods=['GET'])
def get_cotizaciones():
    try:
        response = requests.get(f'{dolar_api}cotizaciones')
        response.raise_for_status()

        data = response.json()

        dolares = [Dolar(d["nombre"], d["compra"], d["venta"],
                         d["fechaActualizacion"]) for d in data]

        return jsonify([dolar.to_dict() for dolar in dolares])

    except requests.RequestException as e:
        return jsonify({"error": "Error al obtener los datos de la API"}), 500


@app.route('/historico', methods=['GET'])
def get_historico():
    try:
        response = requests.get(f'{argentina_datos}')
        response.raise_for_status()

        data = response.json()

        return jsonify(data)

    except requests.RequestException as e:
        return jsonify({"error": "Error al obtener los datos de la API"}), 500


@app.route('/enviar-email', methods=['POST'])
def send_email():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    cotizaciones = data.get('cotizaciones')

    emailjs_data = {
        "service_id": "service_0y3uksv",
        "template_id": "template_tv3s33j",
        "user_id": "fll3HbyLqGOGoNpXf",
        "template_params": {
            "from_name": name,
            "message": message,
            "cotizaciones": cotizaciones,
            "to_email": email
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://your-website.com',
        'Referer': 'https://your-website.com/'
    }

    try:
        response = requests.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            data=json.dumps(emailjs_data),
            headers=headers
        )

        if response.status_code == 200:
            conn = connect_db()
            conn.execute(
                "INSERT INTO correos (nombre, email, mensaje, cotizaciones) VALUES (?, ?, ?, ?)",
                (name, email, message, cotizaciones)
            )
            conn.commit()
            conn.close()

            return jsonify({"message": "Correo enviado exitosamente"}), 200
        else:
            return jsonify({"message": "Error al enviar el correo"}), response.status_code

    except requests.exceptions.RequestException as error:
        return jsonify({"message": "Error en la solicitud a EmailJS", "error": str(error)}), 500


@app.route('/historial-emails', methods=['GET'])
def historial_emails():
    conn = connect_db()
    correos = conn.execute("SELECT * FROM correos").fetchall()
    conn.close()
    return jsonify([dict(correo) for correo in correos]), 200


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
