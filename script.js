// Gestione Menu Mobile
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// Array di curiosità
const facts = [
    "Le Caretta caretta tornano sempre a deporre le uova sulla stessa spiaggia dove sono nate.",
    "Il sesso dei nascituri dipende dalla temperatura della sabbia durante l'incubazione.",
    "Possono trattenere il respiro sott'acqua per diverse ore mentre riposano.",
    "Riescono a percepire il campo magnetico terrestre per orientarsi durante le migrazioni.",
    "Ogni nido può contenere mediamente 100 uova."
];

function getNewFact() {
    const textElement = document.getElementById('fact-text');
    const randomIndex = Math.floor(Math.random() * facts.length);
    
    // Animazione semplice di dissolvenza
    textElement.style.opacity = 0;
    setTimeout(() => {
        textElement.innerText = facts[randomIndex];
        textElement.style.opacity = 1;
    }, 300);
}