from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/books')
def books():
    book_base_url = url_for('book', book_id=0)[:-1]

    return render_template('books.html', book_base_url=book_base_url)


@app.route('/book/<int:book_id>')
def book(book_id):
    return render_template('book.html')


if __name__ == "__main__":
    app.run()
