from transformers import pipeline
summarizer = pipeline('summarization')


def summarize(text, per):

    return summarizer(text,max_length=130,min_length=100,do_sample=False)