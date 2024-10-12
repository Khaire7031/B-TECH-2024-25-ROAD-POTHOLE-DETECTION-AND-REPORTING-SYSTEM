from flask import Flask, render_template, request
from ultralytics import YOLO
import cv2
import numpy as np
import os

app = Flask(__name__)

# Load the YOLO model
model = YOLO("best.pt")

# Create directories if they don't exist
os.makedirs('static/uploads', exist_ok=True)
os.makedirs('static/output', exist_ok=True)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
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

            # Save the modified image (with bounding boxes) in the uploads folder
            modified_image_path = os.path.join('static/uploads', f'modified_{file.filename}')
            cv2.imwrite(modified_image_path, detected_image)

            return render_template('index.html', original_image=file_path, detected_image=output_path, pothole_count=pothole_count, modified_image=modified_image_path)

    return render_template('index.html')

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
            if confidence > 0.40:  # Only consider detections with confidence > 0.70
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Get bounding box coordinates
                class_id = int(box.cls[0])
                class_name = model.names[class_id]

                # Draw bounding box
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(img, f'{class_name} {confidence:.2f}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

                pothole_count += 1

    return img, pothole_count  # Return only the modified image and count

if __name__ == '__main__':
    app.run(debug=True)
