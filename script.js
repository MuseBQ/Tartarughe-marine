// Main JavaScript - Unificato e semplificato
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initFacts();
    initModal();
    initArticleNavigation();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            updateActiveNavLink(targetId);
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavOnScroll, 100));
}

function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const currentLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe cards and stats
    document.querySelectorAll('.stat-card, .article-card, .threat-card').forEach(el => {
        observer.observe(el);
    });
}

// Turtle Facts System
function initFacts() {
    const turtleFacts = [
        "Le Caretta caretta possono percorrere fino a 12.000 km in un anno durante le migrazioni oceaniche!",
        "Esistono da oltre 110 milioni di anni, sopravvivendo all'estinzione dei dinosauri. Fossili risalenti al Cretaceo confermano la loro antica esistenza.",
        "Il sesso dei piccoli è determinato dalla temperatura della sabbia durante l'incubazione: sotto 29°C nascono maschi, sopra nascono femmine.",
        "Possono immergersi fino a 200 metri di profondità e trattenere il respiro per 4-5 ore rallentando il metabolismo.",
        "Ritornano con precisione millimetrica sulla spiaggia dove sono nate per deporre le uova, guidate dal campo magnetico terrestre.",
        "Possiedono una bussola magnetica naturale che le guida attraverso gli oceani durante migrazioni transoceaniche.",
        "Il loro carapace ospita un ecosistema in miniatura: alghe, cirripedi e piccoli crostacei vivono come 'passeggeri' permanenti.",
        "Vivono fino a 67 anni in natura, diventando sessualmente mature tra i 17 e i 33 anni.",
        "Le femmine depongono in media 110 uova per nido, ma solo 1 su 1000 raggiunge l'età adulta in condizioni naturali.",
        "Le tartarughe marine 'piangono' per espellere il sale in eccesso ingerito con l'acqua di mare attraverso ghiandole specializzate.",
        "Hanno un eccellente senso dell'orientamento e possono percepire il campo magnetico terrestre con precisione di 10-20 km.",
        "I piccoli impiegano circa 3 giorni per emergere collettivamente dalla sabbia dopo la schiusa, coordinati da vibrazioni.",
        "Le tartarughe marine dormono sott'acqua, emergendo solo per respirare ogni 4-5 ore durante il riposo.",
        "Il loro olfatto è così sviluppato da individuare le spiagge di nascita dopo 30 anni, riconoscendo odori specifici.",
        "Le Caretta Caretta comunicano tra loro attraverso suoni subacquei impercettibili all'orecchio umano, a frequenze tra 50-1200 Hz.",
        ];
    
    let currentFactIndex = 0;
    const factText = document.getElementById('fact-text');
    const factIndex = document.getElementById('fact-index');
    const factTotal = document.getElementById('fact-total');
    const newFactBtn = document.getElementById('new-fact-btn');
    
    if (!factText || !newFactBtn) return;
    
    // Set total facts count
    if (factTotal) {
        factTotal.textContent = turtleFacts.length;
    }
    
    // Initial fact
    updateFactDisplay();
    
    // New fact button
    newFactBtn.addEventListener('click', () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * turtleFacts.length);
        } while (newIndex === currentFactIndex && turtleFacts.length > 1);
        
        currentFactIndex = newIndex;
        updateFactDisplay();
    });
    
    // Auto rotate facts every 15 seconds
    setInterval(() => {
        let nextIndex = (currentFactIndex + 1) % turtleFacts.length;
        currentFactIndex = nextIndex;
        updateFactDisplay();
    }, 15000);
    
    function updateFactDisplay() {
        if (factText) {
            // Fade out
            factText.style.opacity = '0';
            factText.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                factText.textContent = turtleFacts[currentFactIndex];
                if (factIndex) {
                    factIndex.textContent = currentFactIndex + 1;
                }
                
                // Fade in
                factText.style.opacity = '1';
                factText.style.transform = 'translateY(0)';
            }, 300);
        }
    }
}

// Modal System
function initModal() {
    const modal = document.getElementById('articleModal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = modal?.querySelector('.modal-close');
    
    if (!modal || !modalBody) return;
    
    // Close modal
    modalClose?.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Expose openModal function globally
    window.openModal = function(content) {
        modalBody.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
}

// Article Navigation
function initArticleNavigation() {
    const articles = {
        'focus1': `
            <article class="article-modal">
                <div class="article-modal-header">
                    <span class="article-category">Biologia</span>
                    <time datetime="2019-08-24">24 Agosto 2019</time>
                </div>
                <h2>Le tartarughe non nascono di giorno</h2>
                <p class="article-author">di <strong>Federica Campanelli</strong></p>
                
                <div class="article-content">
                    <p>Grande sorpresa per chi, il 18 agosto, si trovava sulla spiaggia Eloro-Pizzuta di Noto (Siracusa). I bagnanti hanno assistito a un fenomeno davvero inusuale, la nascita di un centinaio di tartarughe comuni (Caretta caretta): inusuale perché sono emerse dalla sabbia prima del tramonto.</p>
                    
                    <p>Diversi litorali italiani, e in particolare quelli della Sicilia, sono luoghi di nidificazione per questa specie. Anzi, l'Italia, pur in maniera limitata rispetto ad altri Paesi, come Grecia e Cipro, è una delle mete predilette di queste tartarughe - quest'anno sono stati segnalati 80 nidi tra Sicilia, Calabria, Basilicata, Puglia, Campania, Marche e Toscana.</p>
                    
                    <h3>L'emersione diurna</h3>
                    <p>L'emersione diurna è anomala: in genere l'abbandono del nido avviene durante la notte, quando il suolo si raffredda, ma «la presenza di ombrelloni e teli da spiaggia sopra la camera del nido», spiega Oleana Olga Prato, operatrice del WWF Italia, «trasmette un falso segnale di raffreddamento», inducendo all'abbandono anticipato del nido.</p>
                    
                    <p>Se ciò avviene di giorno, e per di più nel bel mezzo di una spiaggia affollata, i rischi che molte neonate tartarughe non riescano a raggiungere il mare si moltiplicano. L'uso intensivo delle spiagge è proprio uno dei tanti fattori che minacciano il successo riproduttivo delle tartarughe, che anno dopo anno devono fare i conti con un habitat sempre più degradato.</p>
                    
                    <h3>Come rimediare</h3>
                    <p>Negli ultimi anni molte istituzioni hanno avviato iniziative per incrementare le attività di tutela dei siti di nidificazione delle tartarughe. L'Unione Europea ha avviato, nel 2016, il progetto Life Euroturtles, che coinvolge sei Paesi membri (Italia, Grecia, Croazia, Slovenia, Cipro e Malta) e di cui il WWF Italia è partner.</p>
                    
                    <p>«L'obiettivo è quello di preservare i siti di nidificazione dalle minacce poste dalle attività umane e di migliorare lo stato di conservazione di due specie che popolano il Mediterraneo, la tartaruga comune, la Caretta caretta, e la tartaruga verde, la Chelonia mydas», afferma Olga Prato: «per salvare queste specie, oggi avviate all'estinzione, occorre fare leva sulla sensibilità di chi sfrutta e utilizza i mari e le spiagge.»</p>
                </div>
                
                <div class="article-footer">
                    <p><em>Fonte: Focus Magazine</em></p>
                    <button class="btn btn-primary share-article">Condividi articolo</button>
                </div>
            </article>
        `,
        
        'junior1': `
            <article class="article-modal">
                <div class="article-modal-header">
                    <span class="article-category">Divulgazione</span>
                    <time datetime="2023-07-02">2 Luglio 2023</time>
                </div>
                <h2>Conosciamo l'avventurosa tartaruga di mare (Caretta Caretta)</h2>
                <p class="article-author">di <strong>Dunia Rahwan</strong></p>
                
                <div class="article-content">
                    <p>Capace di lunghe migrazioni, la tartaruga di mare è un rettile molto resistente che per quanto si spinga lontano torna sempre al luogo dove è nata per riprodursi.</p>
                    
                    <h3>Habitat e distribuzione</h3>
                    <p>Caretta caretta è una tartaruga marina che nuota in quasi tutti i mari temperati e tropicali del mondo: Mar Mediterraneo, Mar Nero, Mar dei Caraibi, Oceano Atlantico, Oceano Pacifico e Oceano Indiano.</p>
                    
                    <p>Il suo habitat cambia nel corso della vita: le uova schiudono sulle spiagge sabbiose, i piccoli si lasciano trasportare dalle calde correnti oceaniche per anni, e gli adulti prediligono le acque profonde e tiepide in prossimità delle coste. Non è raro, però, che si spingano anche a 250 km dalla costa oppure si immergano oltre i 100 m di profondità.</p>
                    
                    <h3>Caratteristiche fisiche</h3>
                    <p>Il carapace è a forma di cuore e di colore bruno-rossastro con sfumature verde oliva; inoltre, è spesso ricoperto di organismi come i cirripedi e le alghe. Anche la pelle del dorso è bruno-rossastra e diventa giallo sbiadita sul ventre. Mediamente un adulto pesa 135 kg e ha il carapace lungo 115 cm.</p>
                    
                    <p>C. caretta si distingue dalle altre tartarughe marine per le dimensioni della testa, molto grande in proporzione al corpo.</p>
                    
                    <h3>Comportamenti</h3>
                    <p>Gli accoppiamenti avvengono vicino alla costa, nei pressi della spiaggia scelta per deporre le uova. Le femmine si riproducono la prima volta fra i 10 e i 30 anni e, per nidificare, tornano nello stesso luogo dove sono nate. Per farlo possono migrare anche per 5000 km, guidate da un orientamento che ancora oggi gli scienziati non sono riusciti a spiegare fino in fondo.</p>
                </div>
                
                <div class="article-footer">
                    <p><em>Fonte: Focus Junior</em></p>
                    <button class="btn btn-primary share-article">Condividi articolo</button>
                </div>
            </article>
        `,
        
        'scienza1': `
            <article class="article-modal">
                <div class="article-modal-header">
                    <span class="article-category">Ricerca Scientifica</span>
                    <time datetime="2015-05-30">30 Maggio 2015</time>
                </div>
                <h2>Habitat e distribuzione nel Mediterraneo</h2>
                <p class="article-author">da <strong>Casale P & Margaritoulis D (2010)</strong></p>
                
                <div class="article-content">
                    <h3>Abstract</h3>
                    <p>La specie frequenta sia ambienti costieri sia pelagici; è epipelagica nella fase giovanile, mentre in fase adulta si nutre in ambiente neritico, su profondità inferiori a 50 m.</p>
                    
                    <h3>Distribuzione</h3>
                    <p>La specie è distribuita in mari temperati, sub-tropicali e tropicali. In Mediterraneo è il rettile marino più frequente e in Italia ha siti di nidificazione soprattutto in Sicilia meridionale, Isole Pelagie e Calabria ionica.</p>
                    
                    <h3>Metodologia</h3>
                    <p>Lo studio ha utilizzato dati di telemetria satellitare su 45 individui adulti monitorati tra il 2005 e il 2009, combinati con osservazioni dirette di nidificazione e dati storici di avvistamento.</p>
                    
                    <h3>Risultati principali</h3>
                    <ul>
                        <li>L'Italia ospita il 20-25% dei nidi mediterranei di Caretta caretta</li>
                        <li>Le principali aree di foraggiamento si trovano nell'Adriatico meridionale</li>
                        <li>La migrazione post-riproduttiva coinvolge distanze medie di 450 km</li>
                        <li>La fedeltà al sito di nidificazione è superiore al 90%</li>
                    </ul>
                    
                    <h3>Conclusioni</h3>
                    <p>La protezione dei siti di nidificazione italiani è cruciale per la conservazione della specie a livello mediterraneo. Sono necessarie misure di gestione integrata che considerino sia l'habitat terrestre (spiagge) che marino (aree di foraggiamento).</p>
                </div>
                
                <div class="article-footer">
                    <p><em>Fonte: Mediterranean Marine Science, Vol. 11, No. 1</em></p>
                    <button class="btn btn-primary share-article">Scarica PDF dello studio</button>
                </div>
            </article>
        `
    };
    
    // Read more buttons
    document.querySelectorAll('.btn-read-more').forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article');
            const articleContent = articles[articleId] || '<p>Contenuto non disponibile.</p>';
            window.openModal(articleContent);
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .stat-card, .article-card, .threat-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .stat-card.animate, .article-card.animate, .threat-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fact-text {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .stat-card, .article-card, .threat-card, .fact-text {
                transition: none;
                opacity: 1;
                transform: none;
            }
        }
    </style>
`);