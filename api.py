from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/current_weather', methods=['GET'])
def get_current_weather():
    # Get latitude and longitude from the request's query parameters
    latitude = '33.79'
    longitude = '-84.36'
    with open('.secret', 'r') as apiSecret:
        apiKey = apiSecret.read().strip()
    
    url = f'https://api.openweathermap.org/data/3.0/onecall?lat={latitude}&lon={longitude}&exclude=minutely,hourly,daily,alerts&appid={apiKey}&units=imperial'
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch weather data'}), 500
    response = response.json().get('current', {})

    temp = response.get('temp')
    humidity = response.get('humidity')
    icon_name = response['weather'][0]['icon']

    print(temp, humidity, icon_name)
    weather={'temp':temp, 'humidity':humidity, 'icon_name':icon_name}


    return weather

@app.route('/calendar', methods=['GET'])
def get_calendar():
    with open('.calendarURL', 'r') as file:
        calendar_url = file.read().strip()

    return jsonify({"url": calendar_url})

if __name__ == '__main__':
    app.run(debug=True)
