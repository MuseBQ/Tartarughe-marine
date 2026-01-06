// Turtle Facts Database
const turtleFacts = [
    {
        fact: "La Caretta Caretta può percorrere fino a 12.000 km in un anno durante le migrazioni!",
        icon: "fa-route",
        category: "Migrazione"
    },
    {
        fact: "Le tartarughe marine esistono da oltre 110 milioni di anni, sopravvivendo ai dinosauri.",
        icon: "fa-history",
        category: "Evoluzione"
    },
    {
        fact: "Il sesso dei piccoli è determinato dalla temperatura della sabbia durante l'incubazione.",
        icon: "fa-thermometer-half",
        category: "Riproduzione"
    },
    {
        fact: "Possono immergersi fino a 200 metri di profondità e trattenere il respiro per 4-5 ore.",
        icon: "fa-water",
        category: "Fisiologia"
    },
    {
        fact: "Le Caretta Caretta ritornano esattamente sulla spiaggia dove sono nate per deporre le uova.",
        icon: "fa-map-marker-alt",
        category: "Navigazione"
    },
    {
        fact: "Possiedono una bussola magnetica naturale che le guida attraverso gli oceani.",
        icon: "fa-compass",
        category: "Biologia"
    },
    {
        fact: "Il loro carapace ospita spesso alghe, cirripedi e piccoli crostacei come 'passeggeri'.",
        icon: "fa-users",
        category: "Ecologia"
    },
    {
        fact: "Possono vivere fino a 67 anni in natura, diventando sessualmente mature a 17-33 anni.",
        icon: "fa-birthday-cake",
        category: "Longevità"
    },
    {
        fact: "Le femmine depongono in media 110 uova per nido, ma solo 1 su 1000 raggiunge l'età adulta.",
        icon: "fa-egg",
        category: "Riproduzione"
    },
    {
        fact: "Le tartarughe marine piangono per espellere il sale in eccesso ingerito con l'acqua di mare.",
        icon: "fa-tint",
        category: "Fisiologia"
    },
    {
        fact: "Hanno un eccellente senso dell'orientamento e possono percepire il campo magnetico terrestre.",
        icon: "fa-magnet",
        category: "Navigazione"
    },
    {
        fact: "I piccoli impiegano circa 3 giorni per emergere dalla sabbia dopo la schiusa.",
        icon: "fa-clock",
        category: "Sviluppo"
    },
    {
        fact: "Le tartarughe marine dormono sott'acqua, emergendo solo per respirare.",
        icon: "fa-bed",
        category: "Comportamento"
    },
    {
        fact: "Il loro olfatto è così sviluppato da individuare le spiagge di nascita dopo 30 anni.",
        icon: "fa-wind",
        category: "Sensi"
    },
    {
        fact: "Le Caretta Caretta comunicano tra loro attraverso suoni subacquei impercettibili all'uomo.",
        icon: "fa-comments",
        category: "Comunicazione"
    }
];

// Current fact index and DOM elements
let currentFactIndex = 0;
let factInterval;

// Initialize facts section
function initFacts() {
    // Set total facts count
    document.getElementById('fact-total').textContent = turtleFacts.length;
    
    // Set initial fact
    updateFactDisplay(0);
    
    // Auto-cycle facts every 10 seconds
    startFactRotation();
    
    // Pause rotation on hover
    const factsContainer = document.querySelector('.facts-container');
    factsContainer.addEventListener('mouseenter', pauseFactRotation);
    factsContainer.addEventListener('mouseleave', startFactRotation);
    
    // Touch support for mobile
    factsContainer.addEventListener('touchstart', pauseFactRotation);
    factsContainer.addEventListener('touchend', startFactRotation);
}

// Get new random fact
function getNewFact() {
    let newIndex;
    
    // Ensure we don't show the same fact twice in a row
    do {
        newIndex = Math.floor(Math.random() * turtleFacts.length);
    } while (newIndex === currentFactIndex && turtleFacts.length > 1);
    
    updateFactDisplay(newIndex);
    
    // Provide haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Track fact view (for analytics if implemented later)
    trackFactView(newIndex);
}

// Update fact display with animation
function updateFactDisplay(index) {
    const factText = document.getElementById('fact-text');
    const factIcon = document.querySelector('.fact-icon i');
    const factIndex = document.getElementById('fact-index');
    
    if (!factText || !factIcon) return;
    
    const fact = turtleFacts[index];
    
    // Fade out animation
    factText.style.opacity = '0';
    factText.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        // Update content
        factText.textContent = fact.fact;
        factIcon.className = `fas ${fact.icon}`;
        factIndex.textContent = index + 1;
        currentFactIndex = index;
        
        // Fade in animation
        factText.style.opacity = '1';
        factText.style.transform = 'translateY(0)';
        
        // Add highlight effect
        factText.classList.add('highlight');
        setTimeout(() => {
            factText.classList.remove('highlight');
        }, 1000);
        
    }, 300);
}

// Auto-rotate facts
function startFactRotation() {
    if (factInterval) clearInterval(factInterval);
    
    factInterval = setInterval(() => {
        let nextIndex = currentFactIndex + 1;
        if (nextIndex >= turtleFacts.length) {
            nextIndex = 0;
        }
        updateFactDisplay(nextIndex);
    }, 10000); // Change fact every 10 seconds
}

// Pause rotation
function pauseFactRotation() {
    if (factInterval) {
        clearInterval(factInterval);
        factInterval = null;
    }
}

// Get next fact in sequence
function getNextFact() {
    let nextIndex = currentFactIndex + 1;
    if (nextIndex >= turtleFacts.length) {
        nextIndex = 0;
    }
    updateFactDisplay(nextIndex);
}

// Get previous fact in sequence
function getPreviousFact() {
    let prevIndex = currentFactIndex - 1;
    if (prevIndex < 0) {
        prevIndex = turtleFacts.length - 1;
    }
    updateFactDisplay(prevIndex);
}

// Track fact views (for future analytics)
function trackFactView(index) {
    // Store in localStorage for simple tracking
    const views = JSON.parse(localStorage.getItem('turtleFactViews') || '{}');
    views[index] = (views[index] || 0) + 1;
    localStorage.setItem('turtleFactViews', JSON.stringify(views));
    
    // Could send to analytics service here
    if (window.ga) {
        window.ga('send', 'event', 'Facts', 'view', `fact_${index}`);
    }
}

// Get most viewed facts
function getPopularFacts(limit = 5) {
    const views = JSON.parse(localStorage.getItem('turtleFactViews') || '{}');
    
    return Object.entries(views)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([index, count]) => ({
            fact: turtleFacts[index],
            views: count
        }));
}

// Share current fact
function shareCurrentFact() {
    const currentFact = turtleFacts[currentFactIndex];
    const shareText = `Sapevi che... ${currentFact.fact}\n\nScopri altre curiosità su Caretta Caretta: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Curiosità sulla Caretta Caretta',
            text: currentFact.fact,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Curiosità copiata negli appunti! Condividila con i tuoi amici.');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFacts);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    const factsSection = document.querySelector('.facts-section');
    const isFactsVisible = factsSection.getBoundingClientRect().top < window.innerHeight;
    
    if (isFactsVisible && document.activeElement.tagName !== 'INPUT') {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                getNewFact();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                getPreviousFact();
                break;
        }
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fact-text {
        transition: all 0.3s ease;
    }
    
    .fact-text.highlight {
        background: linear-gradient(90deg, transparent, rgba(0, 180, 216, 0.1), transparent);
    }
    
    .fact-icon i {
        transition: all 0.3s ease;
    }
    
    .facts-controls {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
    .fact-nav {
        display: flex;
        gap: 0.5rem;
    }
    
    .fact-nav-button {
        background: transparent;
        border: 2px solid var(--accent-teal);
        color: var(--accent-teal);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .fact-nav-button:hover {
        background: var(--accent-teal);
        color: var(--dark-blue);
        transform: scale(1.1);
    }
    
    .share-button {
        margin-left: auto;
    }
`;
document.head.appendChild(style);