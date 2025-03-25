export default class EmoService {


    constructor() {
        
     }



    async loadValori() {
        this.valori = JSON.parse(localStorage.getItem('valori'));

        if (!this.valori) {
            this.valori = await this.getValoriFromJson()
            this.saveValori(this.valori);
        }
        return console.log(this.valori);
        
        
        
    }



    async getValoriFromJson() {
        const response = await fetch('./assets/valori-base.json');
        const data = await response.json();
        console.log('Valori caricati dal JSON:', data); // Log dei dati caricati
        return data;
    }
    

    saveValori(){
        localStorage.setItem('students', JSON.stringify(this.valori));
        return this.valori;
    }

}