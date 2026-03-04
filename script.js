const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');
const errorDiv = document.getElementById('error');
const searchInput = document.getElementById('search');
const loadMoreBtn = document.getElementById('loadMore');
let characters = [];
let currentPage = 1;
let totalPages = 1;

async function fetchPage(page = 1) {
    showSpinner(true);
    try {
        const res = await fetch(`${API_URL}?page=${page}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        totalPages = data.info.pages;
        // merge results
        characters = characters.concat(data.results);
        render(characters);
        updateLoadButton();
    } catch (err) {
        showError(err.message);
    } finally {
        showSpinner(false);
    }
}

function updateLoadButton() {
    if (currentPage >= totalPages) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'No more characters';
    } else {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load more characters';
    }
}

function render(list) {
    container.innerHTML = '';
    if (!list || list.length === 0) {
        container.innerHTML = '<p>No records found.</p>';
        return;
    }
    list.forEach(char => {
        // skip entries without a valid image URL
        if (!char.image) return;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}" />
            <h2>${char.name}</h2>
            <p><strong>Status:</strong> ${char.status}</p>
            <p><strong>Species:</strong> ${char.species}</p>
            <p><strong>Gender:</strong> ${char.gender}</p>
            <p><strong>Origin:</strong> ${char.origin.name}</p>
        `;
        container.appendChild(card);
    });
}

function showSpinner(visible) {
    spinner.classList.toggle('hidden', !visible);
}

function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.classList.remove('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

searchInput.addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const filtered = characters.filter(ch => ch.name.toLowerCase().includes(term));
    render(filtered);
});

// slider navigation
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function scrollSlider(direction) {
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

prevBtn.addEventListener('click', () => scrollSlider(-1));
nextBtn.addEventListener('click', () => scrollSlider(1));

loadMoreBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchPage(currentPage);
    }
});

// initial load
fetchPage(currentPage);
