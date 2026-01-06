// Selezioniamo tutti gli elementi con la classe "reveal"
const reveals = document.querySelectorAll(".reveal");
// Funzione che controlla se gli elementi sono visibili nello schermo
function checkReveal() {
  // Altezza della finestra visibile
  const windowHeight = window.innerHeight;

  // Scorriamo tutti gli elementi con la classe "reveal"
  reveals.forEach((el) => {
    // Otteniamo la posizione superiore dell'elemento rispetto alla finestra
    const revealTop = el.getBoundingClientRect().top;
    // Valore soglia per avviare l'animazione (più è basso, più tardi parte)
    const revealPoint = 150;

    // Se l'elemento è abbastanza vicino alla finestra visibile, aggiungiamo la classe "active"
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active"); // opzionale: rimuove l'effetto quando si esce dal campo visivo
    }
  });
}
// Eseguiamo la funzione ogni volta che l'utente scrolla la pagina
window.addEventListener("scroll", checkReveal);

// Eseguiamo la funzione anche una volta al caricamento iniziale
checkReveal();