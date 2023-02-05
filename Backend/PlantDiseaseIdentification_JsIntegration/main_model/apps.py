from django.apps import AppConfig
from PIL import Image
from django.conf import settings
import numpy as np
import os
import tensorflow as tf

class TensorflowLiteClassificationModel:
    def __init__(self, model_path, labels, image_size=224):
        self.interpreter = tf.lite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        self._input_details = self.interpreter.get_input_details()
        self._output_details = self.interpreter.get_output_details()
        self.labels = labels
        self.image_size=image_size

    def run_from_filepath(self, image_path):
        input_data_type = self._input_details[0]["dtype"]
        image = np.array(Image.open(image_path).resize((self.image_size, self.image_size)), dtype=input_data_type)
        image = np.expand_dims(image,axis=0)
        if input_data_type == np.float32:
            image = image / 255.

        if image.shape == (1, 224, 224):
            image = np.stack(image*3, axis=0)

        return self.run(image)

    def run(self, image):

        self.interpreter.set_tensor(self._input_details[0]["index"], image)
        self.interpreter.invoke()
        tflite_interpreter_output = self.interpreter.get_tensor(self._output_details[0]["index"])
        probabilities = np.array(tflite_interpreter_output[0])

        # create list of ["label", probability], ordered descending probability
        label_to_probabilities = []
        for i, probability in enumerate(probabilities):
            label_to_probabilities.append([self.labels[i], float(probability)])
        return sorted(label_to_probabilities, key=lambda element: element[1],reverse=True)

class MainModelConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "main_model"
    
    labels = ['Strawberry Leaf Scorch',
          'Tomato Leaf Mold',
          'Tomato Mosaic Virus',
          'Corn Common Rust',
          'Potato Early Blight',
          'Corn Gray Leaf Spot'
          ]
    # Load TFLite model and allocate tensors.
    model = TensorflowLiteClassificationModel(os.path.join(settings.BASE_DIR,"main_model/cnn_model/model.tflite"),labels=labels)
