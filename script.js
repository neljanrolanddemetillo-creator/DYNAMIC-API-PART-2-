const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');
const errorDiv = document.getElementById('error');
const searchInput = document.getElementById('search');
const loadMoreBtn = document.getElementById('loadMore');
let characters = [];
let allCharactersLoaded = [];
let currentPage = 1;
let totalPages = 1;
let lastSearchTerm = '';

// Audio context for click sounds
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound() {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.1);
}

function playClappingSound() {
    const now = audioCtx.currentTime;
    const duration = 0.2;
    
    for (let i = 0; i < 3; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        filter.type = 'highpass';
        filter.frequency.value = 2000 + Math.random() * 1000;
        
        osc.frequency.setValueAtTime(50 + Math.random() * 100, now + i * 0.08);
        osc.frequency.exponentialRampToValueAtTime(200 + Math.random() * 100, now + i * 0.08 + 0.05);
        
        gain.gain.setValueAtTime(0.4, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0, now + i * 0.08 + duration);
        
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + duration);
    }
}

async function fetchPage(page = 1) {
    try {
        const res = await fetch(`${API_URL}?page=${page}`, { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        totalPages = data.info.pages;
        // merge results and remove duplicates
        allCharactersLoaded = allCharactersLoaded.concat(data.results);
        characters = [...new Set(allCharactersLoaded.map(c => c.id))].map(id => 
            allCharactersLoaded.find(c => c.id === id)
        );
        // re-apply search filter if active
        applySearch();
        updateLoadButton();
        return true;
    } catch (err) {
        console.error('Fetch error:', err);
        showError('Failed to fetch characters: ' + err.message);
        return false;
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
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}" />
            <h2>${char.name}</h2>
            <p><strong>Status:</strong> ${char.status}</p>
            <p><strong>Species:</strong> ${char.species}</p>
            <p><strong>Gender:</strong> ${char.gender}</p>
            <p><strong>Origin:</strong> ${char.origin.name}</p>
        `;
        card.addEventListener('click', () => openModal(char));
        container.appendChild(card);
    });
}

function applySearch() {
    lastSearchTerm = searchInput.value.toLowerCase().trim();
    if (lastSearchTerm === '') {
        render(characters);
    } else {
        const filtered = characters.filter(ch => 
            ch.name.toLowerCase().includes(lastSearchTerm)
        );
        render(filtered);
    }
}

function showSpinner(visible) {
    spinner.classList.toggle('hidden', !visible);
}

function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.classList.remove('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

searchInput.addEventListener('input', () => {
    playClickSound();
    applySearch();
});

// slider navigation
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function scrollSlider(direction) {
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

prevBtn.addEventListener('click', () => {
    playClickSound();
    scrollSlider(-1);
});
nextBtn.addEventListener('click', () => {
    playClickSound();
    scrollSlider(1);
});

loadMoreBtn.addEventListener('click', async () => {
    playClickSound();
    if (currentPage < totalPages) {
        currentPage++;
        showSpinner(true);
        await fetchPage(currentPage);
        showSpinner(false);
    }
});

// Modal Functions
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

function openModal(character) {
    playClappingSound();
    
    document.getElementById('modalName').textContent = character.name;
    document.getElementById('modalImage').src = character.image;
    document.getElementById('modalImage').alt = character.name;
    document.getElementById('modalStatus').textContent = character.status;
    document.getElementById('modalSpecies').textContent = character.species;
    document.getElementById('modalGender').textContent = character.gender;
    document.getElementById('modalOrigin').textContent = character.origin.name;
    document.getElementById('modalLocation').textContent = character.location.name;
    document.getElementById('modalEpisodes').textContent = character.episode.length + ' episodes';
    
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// initial load - fetch first 5 pages for more characters
async function initLoad() {
    showSpinner(true);
    try {
        for (let i = 1; i <= 5; i++) {
            currentPage = i;
            const success = await fetchPage(i);
            if (!success) {
                console.warn(`Failed to load page ${i}, continuing with loaded data`);
                break;
            }
        }
    } catch (err) {
        console.error('Initial load error:', err);
        showError('Failed to load initial characters');
    } finally {
        showSpinner(false);
    }
}

initLoad();
