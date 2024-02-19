from flask import Flask,jsonify,request
from flask_cors import CORS
import numpy as np
import pickle
from Roberta import *
from summarizer import *

 
app = Flask(__name__)
cors = CORS(app)

prices=[]
prices.append("0")
senti=[]
senti.append("0")
summary1=[]
sy={
      "main":".",
      "max":3,
      "min":0
    }
summary1.append(sy)

model=pickle.load(open('model/model.pk1','rb'))
model2=pickle.load(open('model/model2.pk1','rb'))


@app.route("/home" ,methods=["Get","POST"])
def hello_world():
  if request.method =='POST':
    Area = int(request.json['Area'])
    bedroom=int(request.json['bedroom'])
    bathroom=int(request.json['bathroom'])
    stories=int(request.json['stories'])
    basement=int(request.json['basement'])
    parking=int(request.json['parking'])
    price=model.predict([[Area,bedroom,bathroom,stories,basement,1,parking]])[0]
    prices.append(price)
    return jsonify(Area,bedroom,bathroom,stories,basement,parking)
      
  if request.method =='GET':
    data={
    "message":str(prices[-1]) 
    }
   
    return jsonify(data)
  
@app.route("/freespace1",methods=["GET","POST"])
def freespace():
  if request.method =='GET':
    text=senti[-1]
    res=sentimental_analysis(text)
    Max=max(res['Negative'],res['Neutral'],res['Positive'])
    if(Max==res['Negative']):
      Maxele="Negative"
    elif(Max==res['Neutral']):
      Maxele="Neutral"
    else:
      Maxele="Positive"
      
    data={
    "Negative":str(round(res['Negative']*100,2)),
    "Neutral":str(round(res['Neutral']*100,2)),
    "Positive":str(round(res['Positive']*100,2)),
    "Max":Maxele
    }
    return jsonify(data)
  
  if request.method =='POST':
    sometext=request.json['sometext']
    senti.append(sometext)
    print(senti)
    return "hi"
  

@app.route("/",methods=["GET","POST"])
def root():
  if request.method =="GET":
    return "Welcome to home route"
  
  if request.method =='POST':
    return "post request response"
  

@app.route("/summary",methods=["GET","POST"])
def summary():
  if request.method =="GET":
    text1=summary1[-1]
    
    text=model2(text1["main"],max_length=text1["max"],min_length=text1["min"],do_sample=False)
    datayo={
      "summary7":text[0]['summary_text']
    }
    return jsonify(datayo)
  
  if request.method =="POST":
    tobesummary=request.json['somettext']
    maxtext=int(request.json['maxtext'])
    mintext=int(request.json['mintext'])
    sy={
      "main":tobesummary,
      "max":maxtext,
      "min":mintext
    }
    summary1.append(sy)
    
    return "hi"


if __name__ == '__main__':
    app.run(debug=True)