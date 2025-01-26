from flask import Flask, jsonify
import cv2
from ultralytics import YOLO

app = Flask(__name__)

# Load the YOLO model
yolo = YOLO('yolov8s.pt')

# Initialize video capture (webcam or video source)
videoCap = cv2.VideoCapture(0)

# Function to get class colors
def getColours(cls_num):
    base_colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255)]
    color_index = cls_num % len(base_colors)
    increments = [(1, -2, 1), (-2, 1, -1), (1, -1, 2)]
    color = [base_colors[color_index][i] + increments[color_index][i] *
             (cls_num // len(base_colors)) % 256 for i in range(3)]
    return tuple(color)

@app.route('/check_seats', methods=['GET'])
def check_seats():
    ret, frame = videoCap.read()
    if not ret:
        return jsonify({"error": "Failed to read video frame"}), 500

    count = 0
    results = yolo.track(frame, stream=True)

    for result in results:
        classes_names = result.names

        for box in result.boxes:
            if box.conf[0] > 0.4:  # Confidence greater than 40%
                [x1, y1, x2, y2] = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                cls = int(box.cls[0])
                class_name = classes_names[cls]
                if class_name == "person":
                    count += 1

    # Determine if seats are full or empty based on person count
    if count == 0:
        seat_status = "Looks like a ghost town in here. Plenty of seats!"
    elif 1 <= count <= 10:
        seat_status = "The seats are all yours, no one else is here!"
    elif 11 <= count <= 20:
        seat_status = "A few souls around, but plenty of room for more!"
    elif 21 <= count <= 35:
        seat_status = "It's getting crowded! You might want to grab a seat soon."
    elif 36 <= count <= 50:
        seat_status = "Almost full! Only a few spots left."
    else:
        seat_status = "It's packed in here! Find a seat while you can!"

    # Return the status as a JSON response
    return jsonify({"person_count": count, "seat_status": seat_status})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)