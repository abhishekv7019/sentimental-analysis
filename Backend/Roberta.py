from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax

def sentimental_analysis(text):
    roberta = "cardiffnlp/twitter-roberta-base-sentiment"
    model = AutoModelForSequenceClassification.from_pretrained(roberta)
    tokenizer = AutoTokenizer.from_pretrained(roberta)
    encoded_tweet = tokenizer(text, return_tensors='pt')
    output = model(**encoded_tweet)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    dict = {'Negative': scores[0], 'Neutral': scores[1] ,'Positive':scores[2]}
    return dict



   