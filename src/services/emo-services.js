export default class EmoService {


    constructor() {
        
     }



     async loadValori() {
        this.valori = JSON.parse(localStorage.getItem('valori')) ;
    
        if (!this.valori || !Array.isArray(this.valori)) {
            this.valori = await this.getValoriFromJson();
            this.saveValori();
        }
    
        return this.valori;
    }



    async getValoriFromJson() {
        const response = await fetch('./assets/valori-base.json');
        const data = await response.json();
        console.log('Valori caricati dal JSON:', data); // Log dei dati caricati
        return data;
    }
    

    saveValori(){
        localStorage.setItem('valori', JSON.stringify(this.valori));
        return this.valori;
        
    }

    editValore(valore) {
        
        // Trova l'indice dell'oggetto in base alla proprietà 'date'
        const index = this.valori.findIndex(item => item.date === valore.date);
    
        if (index !== -1) {
            this.valori[index] = valore; // Aggiorna l'oggetto esistente
            this.saveValori(); // Salva l'array aggiornato in localStorage
            return this.valori; 
        } else {
            console.log('Valore non trovato');
            return null; // Puoi anche gestire un messaggio d'errore o un fallback
        }
    }
}