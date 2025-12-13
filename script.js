// Funzione per il Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Previene il comportamento di default del link
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animazione di apparizione delle sezioni (Fade-in on Scroll)
const observerOptions = {
    // La sezione appare quando il 10% della sua area è visibile
    threshold: 0.1, 
    // Un margine negativo in modo che l'animazione inizi un po' prima
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Se la sezione è visibile, applica lo stile finale
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            // Smetti di osservare l'elemento una volta che è apparso
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Applica lo stile iniziale e l'osservatore a tutte le sezioni
document.querySelectorAll('section').forEach(section => {
    // Stato iniziale nascosto e leggermente spostato verso il basso
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)'; // Aumentato a 30px per un effetto più marcato
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    
    // Osserva la sezione
    observer.observe(section);
});