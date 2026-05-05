import awsgi
from flask import Flask, request, jsonify
import base64
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the YOLO model
model = YOLO("best.pt")
class_names = model.names


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Flask app running successfully'
    }), 200

@app.route('/status', methods=['GET'])
def check_status():
    return jsonify({
        'message': 'Status is OK'
    }), 200


def detect_potholes(image_data):
    # Convert image data to numpy array
    np_img = np.frombuffer(image_data, np.uint8)
    
    # Decode the image
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    # Resize the image to match the model input size
    img_resized = cv2.resize(img, (640, 320))  # Change size based on your model's requirement

    # Run the model on the image
    results = model.predict(img_resized)

    num_potholes = 0
    for r in results:
        boxes = r.boxes  # Boxes object for bbox outputs
        masks = r.masks  # Masks object for segment masks outputs
        
        if masks is not None:
            masks = masks.data.cpu().numpy()
            num_potholes = len(masks)  # Count number of detected potholes

    return num_potholes

@app.route('/upload_image', methods=['POST'])
def upload_image():
    data = request.get_json()

    # Get the image data from the request
    image_data = data['image']

    # Decode the base64 image
    image_data = base64.b64decode(image_data.split(',')[1])

    # Detect potholes and get the number of potholes
    num_potholes = detect_potholes(image_data)

    # Construct message based on prediction
    message = f"Number of potholes detected: {num_potholes}"

    # Return JSON response
    return jsonify({
        'message': message,
        'num_potholes': num_potholes
    }), 200


def lambda_handler(event, context):
    return awsgi.response(app, event, context, base64_content_types={"image/png"})


if __name__ == '__main__':
    app.run(debug=True)
