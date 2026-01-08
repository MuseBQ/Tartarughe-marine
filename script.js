// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initHeaderScroll();
    initModal();
    initScrollAnimations();
    initArticleTabs();
    
    // Load initial content
    loadArticleContent();
    
    // Set current year in footer
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace('2026', new Date().getFullYear());
    }
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu visibility
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.setAttribute('aria-hidden', isExpanded);
        
        // Toggle body scroll
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Close menu when clicking on links
        const menuLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                body.style.overflow = '';
            });
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && 
            !menuToggle.contains(event.target) && 
            mobileMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            body.style.overflow = '';
        }
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header')?.offsetHeight || 100;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            updateActiveNavLink(targetId);
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        link.setAttribute('aria-current', null);
    });
    
    // Add active class to current link
    const currentLink = document.querySelector(`.nav-link[href="${targetId}"], .mobile-nav-link[href="${targetId}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
        currentLink.setAttribute('aria-current', 'page');
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Article Modal
function initModal() {
    const modal = document.getElementById('articleModal');
    if (!modal) return;
    
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    // Close modal handlers
    [modalClose, modalOverlay].forEach(element => {
        if (element) {
            element.addEventListener('click', function() {
                closeModal();
            });
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(articleContent) {
    const modal = document.getElementById('articleModal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = articleContent;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('articleModal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Clear content after animation
    setTimeout(() => {
        modalBody.innerHTML = '';
    }, 300);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Article Content Loading
function loadArticleContent() {
    const readMoreButtons = document.querySelectorAll('.btn-read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article');
            const articleContent = getArticleContent(articleId);
            
            if (articleContent) {
                openModal(articleContent);
            }
        });
    });
}

// Article Content Database
function getArticleContent(articleId) {
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
    
    return articles[articleId] || '<p>Contenuto non disponibile.</p>';
}

// Article Tabs
function initArticleTabs() {
    const tabs = document.querySelectorAll('.articles-tabs .tab-button');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                content.setAttribute('aria-hidden', 'true');
            });
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            const activeContent = document.getElementById(`tab-${tabId}`);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.setAttribute('aria-hidden', 'false');
            }
        });
    });
}