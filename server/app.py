from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import gensim
from gensim.models import Word2Vec
from indicnlp.tokenize import indic_tokenize
import json

app = Flask(__name__)
CORS(app)

model = gensim.models.KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)
hindi_model = gensim.models.KeyedVectors.load_word2vec_format('wiki.hi.vec', binary=False)

def preprocess(text):
    tokens = []
    for sent in indic_tokenize.trivial_tokenize(text):
        tokens.extend([word for word in sent if word.isalnum()])
    return tokens


@app.route("/") 
def index():
    print("index page")
    return '350 projects'


@app.route('/words_similarity',methods=['GET'])
def words_similarity():
    modelname = request.args.get('model') 
    word1 = request.args.get('word1')
    word2 = request.args.get('word2')

    print(modelname,word1,word2)

    similarity = 0
    if modelname=="google-negative-300":
        similarity = str(model.similarity(word1, word2))

        data = {
            "status":'ok',
            "result":similarity
        }

        return jsonify(data)
    elif modelname=="wiki-hindi":
        similarity = str(hindi_model.similarity(word1,word2))

        data = {
            "status":'ok',
            "result":similarity
        }

        return jsonify(data)
    
    data = {
        "status":'ok',
        "result":similarity
    }
    return jsonify(data)




@app.route('/nearest_words',methods=['GET'])
def nearest_words():
    modelname = request.args.get('model') 
    word = request.args.get('word')
    print(modelname,word)

    nearest_words = []

    if modelname=="google-negative-300":
        nearest_words = model.most_similar(word)
    elif modelname=="wiki-hindi":
        # word = 'भारत'
        nearest_words = hindi_model.most_similar(word)    

    data = {
        "status":'ok',
        "result":nearest_words
    }

    return jsonify(data)



@app.route('/multi_words',methods=['POST'])
def multi_words():

    body = json.loads(request.get_data().decode('utf-8'))
    modelname = body['model']
    keys=body['words']

    print(modelname,keys,type(keys))

    if modelname=="google-negative-300":
        embedding_clusters = []
        word_clusters = []
        for word in keys:
            embeddings = []
            words = []
            for similar_word, _ in model.most_similar(word, topn=10):
                words.append(similar_word)
                embeddings.append(model[similar_word])
            embedding_clusters.append(embeddings)
            word_clusters.append(words)

        # print(type(word_clusters),type(embedding_clusters))

        embedding_clusters = [emb.tolist() for emb_list in embedding_clusters for emb in emb_list]

        data = {
            "status":'ok',
            "result":{
                "word_clusters":word_clusters,
                "embedding_clusters":embedding_clusters
            }
        }

        return jsonify(data)
    else:
        embedding_clusters = []
        word_clusters = []
        for word in keys:
            embeddings = []
            words = []
            for similar_word, _ in hindi_model.most_similar(word, topn=10):
                words.append(similar_word)
                embeddings.append(hindi_model[similar_word])
            embedding_clusters.append(embeddings)
            word_clusters.append(words)

        # print(type(word_clusters),type(embedding_clusters))

        embedding_clusters = [emb.tolist() for emb_list in embedding_clusters for emb in emb_list]

        data = {
            "status":'ok',
            "result":{
                "word_clusters":word_clusters,
                "embedding_clusters":embedding_clusters
            }
        }

        return jsonify(data)

    


if __name__ == "__main__":
    app.run(debug=True)