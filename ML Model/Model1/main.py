from flask import Flask, request, jsonify, send_file
from ultralytics import YOLO
import cv2
import numpy as np
import os
from io import BytesIO
from werkzeug.datastructures import FileStorage

app = Flask(__name__)

# Load the YOLO model
model = YOLO("best.pt")

# Create directories if they don't exist
os.makedirs('static/uploads', exist_ok=True)
os.makedirs('static/output', exist_ok=True)

@app.route('/detect_potholes', methods=['POST'])
def detect_potholes():
    # Get the uploaded file
    file = request.files['image']
    
    if file:
        file_path = os.path.join('static/uploads', file.filename)
        file.save(file_path)

        # Process the image
        detected_image, pothole_count = process_image(file_path)

        # Save the output image with bounding boxes
        output_path = os.path.join('static/output', f'detected_{file.filename}')
        cv2.imwrite(output_path, detected_image)

        # Return the output image and pothole count as a multipart response
        with open(output_path, 'rb') as img_file:
            img_bytes = BytesIO(img_file.read())
            img_bytes.seek(0)

            # Create a response containing both the image and the pothole count
            response = {
                "pothole_count": pothole_count,
                "image": FileStorage(img_bytes, filename=os.path.basename(output_path))
            }

            return jsonify(response), 200

    return jsonify({"error": "No image uploaded"}), 400

def process_image(image_path):
    # Read the image
    img = cv2.imread(image_path)
    h, w, _ = img.shape

    # Predict using the model
    results = model.predict(img)

    pothole_count = 0

    # Draw bounding boxes and count potholes
    for r in results:
        boxes = r.boxes
        for box in boxes:
            confidence = box.conf[0]  # Get the confidence score
            if confidence > 0.5:  # Adjusted confidence threshold
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Get bounding box coordinates
                class_id = int(box.cls[0])
                class_name = model.names[class_id]

                # Draw bounding box
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(img, f'{class_name} {confidence:.2f}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

                pothole_count += 1

    return img, pothole_count  # Return modified image and count

if __name__ == '__main__':
    app.run(debug=True,port=4000)
