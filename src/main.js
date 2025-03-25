

import SuperGrid from './components/super-grid.js';
import EmoService from './services/emo-services.js';
import SuperDialog from './components/super-dialog.js';
import SuperHeader from './components/super-header.js';
import SuperFooter from './components/super-footer/super-footer.js';
import ValoriCard from './components/valori-card.js';

const emoService = new EmoService();
const dialog = document.getElementById('valore-dialog');

// // Aggiungi valore
// document.getElementById('add-btn').addEventListener('click', () => {
//     dialog.setupForm(); // Modalità "Aggiunta" (senza parametri)
//     dialog.showModal();
// });

// // Modifica valore (quando si clicca su "Modifica" nella card)
// dialog.addEventListener('valore-edited', (event) => {
//     const { index, valore } = event.detail;
//     emoService.editValore(valore, index);
//     refreshUI(); // Funzione che aggiorna la UI
// });

// // Aggiungi valore nuovo (da dialog)
// dialog.addEventListener('valore-added', (event) => {
//     const valore = event.detail;
//     emoService.saveValore(valore); // Salva il nuovo valore
//     refreshUI();
// });

// // Cancellazione
// dialog.addEventListener('valore-deleted', (event) => {
//     const { index } = event.detail;
//     emoService.deleteValore(index);
//     refreshUI();
// });




document.getElementById('add-valore-btn').addEventListener('click', () => {
    const dialog = document.getElementById('valore-dialog');
    dialog.innerHTML = ''; // Svuota il contenuto precedente del dialog
    dialog.setupForm(); // Resetta il form per l'aggiunta di un nuovo valore
    dialog.dialog.showModal();
});