# Dynamic API Web App

This project is a simple dynamic web application that fetches and displays data from the free Rick and Morty public API. It demonstrates the following learning objectives:

- Fetch data from a public API using the `fetch()` API
- Process JSON responses and render them dynamically
- Display at least 10 records with 5 fields each
- Apply basic styling and a visually appealing background
- Handle asynchronous requests and errors
- Implement search/filter functionality and a loading spinner

## Features

1. **API integration**: Uses `https://rickandmortyapi.com/api/character` to retrieve character data.
2. **Dynamic rendering**: Characters are rendered in cards with image, name, status, species, gender, and origin.
3. **Search**: Filter by character name via the input box.
4. **Styling**: CSS provides gradient background animation, card layout, and spinner.
5. **Error handling**: Displays an error message if the API call fails.
6. **Bonus**: Loading spinner while data loads.

## How to open the app manually

1. **No server required**: Simply open the `index.html` file in your browser.
   - Navigate to the project directory: `c:\Users\GRACE\Desktop\DYNAMIC-API(PART 2)`.
   - Double-click `index.html` or right-click and choose *Open with...* your web browser (Chrome, Edge, Firefox, etc.).

2. **Optional: run with a local HTTP server** (recommended for avoiding CORS/file restrictions):
   - If you have Python installed, open a terminal in the project directory and run:
     ```powershell
     python -m http.server 8000
     ```
     Then open your browser to `http://localhost:8000`.
   - Alternatively, you can use VS Code's Live Server extension or any static-file server.

3. **Interact**: The page will automatically fetch and display characters. Use the search box to filter.

## How it works (brief overview)

- `script.js` performs the fetch request, updates the DOM, and handles search input.
- `style.css` contains layout and animation rules.
- `index.html` defines the structure and elements.

Feel free to modify or extend the app (add pagination, filtering by status, image rotation, etc.).

---

Enjoy exploring the Rick and Morty universe! 🚀
