
from __future__ import division, print_function

#Keras
import cv2
from tensorflow.keras.models import load_model

#numpy
import numpy as np

#flask utils
from flask import Flask, request, jsonify

#Defining the flask app
app = Flask(__name__)

#saving the model name and extension to model_path
MODEL_PATH = 'C:/Users/Hetti/Desktop/model2.h5'

#loading my trained model
model = load_model(MODEL_PATH)
model.compile(loss="categorical_crossentropy", optimizer='Adam', metrics=["accuracy"])

#resizing the image
def image_resize(inputImage):
    img=cv2.resize(inputImage,(96,96))
    img=np.expand_dims(img,axis=0)
    img=img.astype('float32')
    img=img/255
    return img

@app.route('/flask/predict',methods=['POST'])
def predictor():
    fileName = request.args.get('filename')
    image_path = "E:/IIT 2nd year/SDGP/IMPLEMENTATION/SkinDoc/Backend/uploads/" + fileName
    loadImage = cv2.imread(image_path)
    resizedImage =image_resize(loadImage)
    probabilities = model.predict(resizedImage)
    image_class = np.argmax(probabilities,axis=1)
    if image_class == 0:
        return jsonify({'Prediction':'Benign', 'Probability':(round(float(probabilities[0][0]*100),2))})
    else:
        return jsonify({'Prediction': 'Malignant', 'Probability': (round(float(probabilities[0][1]*100),2))})

if __name__ == "__main__":
    app.run(debug=True,threaded=False)