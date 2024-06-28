import spacy
import sys
from spacytextblob.spacytextblob import SpacyTextBlob

try:
    nlp = spacy.load('en_core_web_sm')
    nlp.add_pipe('spacytextblob')
except Exception as e:
    print(f"Failed to load SpaCy model or add pipe: {e}")
    sys.exit(1)

def analyze_tone(text):
    """
    Analyzes the sentiment tone of the given text.
    
    Parameters:
    text (str): The text to analyze.
    
    Returns:
    str: The sentiment tone of the text (positive, negative, neutral).
    """
    doc = nlp(text)
    polarity = doc._.polarity
    if polarity > 0:
        return 'positive', polarity
    elif polarity < 0:
        return 'negative', polarity
    else:
        return 'neutral', polarity

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_sentiment.py <text>")
        sys.exit(1)
    
    text = sys.argv[1]
    tone, polarity = analyze_tone(text)
    print(f"Tone: {tone}, Polarity: {polarity:.2f}")