export default class SuperDialog extends HTMLElement {
    
    
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.style();
        this.render();
    }

    emojiList() {
        const angryEmoji = '😠​';
        const saddyEmoji = '😞​';
        const mediumEmoji = '🤨​';
        const happyEmoji = '🙂';
        const superEmoji = '​😁​';
    }

    style() {
    
    }
    
    render() {
        this.dialog = document.createElement('dialog');
        this.dialog.setAttribute('id', 'dialog');
        this.dialog.innerHTML = `
            <form id="form">
                <label for="emo">Seleziona un'emoticon:</label>
                <div id="emoji-container">
                    <button type="button" class="emoji-btn" data-emoji="😠">😠</button>
                    <button type="button" class="emoji-btn" data-emoji="😞">😞</button>
                    <button type="button" class="emoji-btn" data-emoji="🤨">🤨</button>
                    <button type="button" class="emoji-btn" data-emoji="🙂">🙂</button>
                    <button type="button" class="emoji-btn" data-emoji="😁">😁</button>
                </div>
                <input type="hidden" name="emo" id="emo"> <!-- Campo nascosto per l'emoticon -->
            </form>
        `;
    
        // Bottone per salvare
        const okBtn = document.createElement('button');
        okBtn.textContent = 'Salva';
        okBtn.addEventListener('click', (event) => this.dispatchValore(event));
        this.dialog.appendChild(okBtn);
    
        // Bottone per eliminare
        this.deleteBtn = document.createElement('button');
        this.deleteBtn.textContent = 'Cancella';
        this.deleteBtn.style.display = 'none'; // Nascondi inizialmente
        this.deleteBtn.addEventListener('click', () => this.dispatchDelete());
        this.dialog.appendChild(this.deleteBtn);
    
        this.shadow.appendChild(this.dialog);
    
        // Aggiungi event listener ai bottoni delle emoticon
        this.shadow.querySelectorAll('.emoji-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                const selectedEmoji = event.target.getAttribute('data-emoji');
                this.shadow.getElementById('emo').value = selectedEmoji; // Imposta il valore nel campo nascosto
                console.log('Emoticon selezionata:', selectedEmoji); // Debug
            });
        });
    }
    dispatchValore(event) {
        event.preventDefault();
        const form = this.shadow.getElementById('form');
        const data = new FormData(form);
        const valore = {
            emo: data.get('emo'),
            date: new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\..+/, '') // Formatta la data
        };
    
        if (this.isEdit) {
            const editEvent = new CustomEvent('valore-edited', { detail: { index: this.index, valore } });
            this.dispatchEvent(editEvent); // Emissione evento per modifica
        } else {
            const addEvent = new CustomEvent('valore-added', { detail: valore });
            this.dispatchEvent(addEvent); // Emissione evento per aggiunta
        }
        this.dialog.close();
    }
    setupForm(valore) {
        const form = this.shadow.getElementById('form');
        form.reset();
    
        if (valore) {
            this.isEdit = true;
            this.index = valore.date; // Usa l'index per l'elemento specifico
            this.shadow.getElementById('emo').value = valore.emo;
            this.deleteBtn.style.display = 'inline'; // Mostra il tasto Cancella
        } else {
            this.isEdit = false;
            this.index = null; // Nessun indice per un nuovo valore
            this.shadow.getElementById('emo').value = ''; // Resetta il campo emoticon
            this.deleteBtn.style.display = 'none'; // Nascondi il tasto Cancella
        }
    }

    editValore(valore, index){
        this.isEdit = true;
        this.index = index;
        this.setupForm(valore)
        this.dialog.showModal()
    }

    dispatchDelete() {
        const deleteEvent = new CustomEvent('valore-deleted', { detail: { index: this.index } });
        this.dispatchEvent(deleteEvent);
        this.dialog.close();
    }
}

customElements.define('super-dialog', SuperDialog);