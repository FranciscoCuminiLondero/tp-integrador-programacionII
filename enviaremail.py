from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/enviar-mensaje', methods=['POST'])
def enviar_mensaje():
    data = request.json
    
    nombre = data.get('name')
    email = data.get('email')
    mensaje = data.get('message')

    emailjs_data = {
        'service_id': 'service_0i1s0w6',
        'template_id': 'template_bkjb6zi',
        'user_id': '95lMaor51U6ONt6KR',
        'accessToken': 'tVHPPWi0n46VkpE4nNPsY',
        'template_params': {
            'from_name': nombre,
            'to_name': 'Francisco, Sabrina y Martin',
            'message': mensaje
        }
    }

    headers = {
        'Content-Type': 'application/json',
    }

    try:
        response = requests.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            data=json.dumps(emailjs_data),
            headers=headers
        )
        response.raise_for_status()
        return jsonify({'status': 'success', 'message': 'Correo enviado correctamente'}), 200
    except requests.exceptions.RequestException as error:
        return jsonify({'status': 'error', 'message': str(error)}), 500


if __name__ == '__main__':
    app.run(debug=True)
