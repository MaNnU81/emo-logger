import EmoService from "../services/emo-services.js";
import ValoriCard from "./valori-card.js";

export default class SuperGrid extends HTMLElement {
    
    
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        this.EmoServ = new EmoService();
        this.valori = await this.EmoServ.loadValori();
        this.style();
        this.render();
    
        const dialog = document.getElementById('valore-dialog');
    
        dialog.addEventListener('valore-deleted', (event) => {
            const { index } = event.detail;
            console.log('Valore da cancellare:', index);
    
            // Rimuovi il valore dal servizio
            this.EmoServ.valori = this.EmoServ.valori.filter((valore) => valore.date !== index);
            this.EmoServ.saveValori();
    
            // Aggiorna la griglia
            this.render();
        });
    }
  

    style() {
    
    }
    
    render() {
    if(!this.container){
        this.container = document.createElement('div');
        this.shadow.appendChild(this.container);
        }else{
            this.container.innerHTML = '';
        }

       

        const main = document.createElement('div');
        main.classList.add('grid');
        main.innerHTML = '';


        for (const valore of this.EmoServ.valori) {

            const card = document.createElement('valori-card');
            card.setAttribute('selected-valore', JSON.stringify(valore));
            card.EmoServ = this.EmoServ;
            main.appendChild(card);
        }
        this.shadow.appendChild(main);
    }
}

customElements.define('super-grid', SuperGrid);