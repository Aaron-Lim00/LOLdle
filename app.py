from flask import Flask, render_template

app = Flask(__name__)

# Route for the home page. The majority of the page will be displayed here. 
@app.route('/')
def index():
    return render_template('index.html')

# Set debug=true here so that the page can just be refreshed. Remove later. 
if __name__ == "__main__":
    app.run(debug=True)
