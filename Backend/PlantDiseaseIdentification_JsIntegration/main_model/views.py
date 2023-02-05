from django.shortcuts import render

# Create your views here.
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .apps import MainModelConfig
import os

class call_model(APIView):
    
    def get(self,request):
        # return render(request,'index.html')
        return Response({"Info":"Upload images to get disease predition values! , img var sentFile"})
    def post(self,request):
        
        f=request.data['sentFile'] 
        file_name = "pic.jpg"
        file_name_2 = default_storage.save(file_name, f)
        file_url = default_storage.url(file_name_2)
        response = MainModelConfig.model.run_from_filepath(os.path.join(settings.MEDIA_ROOT,file_name_2))[0]
        # return HttpResponse("Disease Name : {}\nScore : {}".format(response[0],response[1]))
        return Response({"Disease_Name" : response[0] , "Score" : response[1]})