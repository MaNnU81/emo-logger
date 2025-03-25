export default class ValoriCard extends HTMLElement {
    
    
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }


get valori(){
const valoriStr = this.getAttribute('selected-valori');
if (valoriStr) {
    return JSON.parse(valoriStr);
    
} return { "date": "usami per aggiungere veri  valori", "emo": "😁"};

}


get index (){
    return this.getAttribute('selected-index');
}


    connectedCallback() {
        this.style();
        this.render();
    }

 
    style() {
    const style = document.createElement('style');
    style.innerText =`
            .card{
                border-radius: 8px;
                border: solid 1px #313131;
                padding: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `
        this.shadow.appendChild(style);
    }
    
    render() {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('card');
    mainDiv.innerHTML = `
            <div>
                <strong>emoticon: </strong><span>${this.valori.emo}</span>
            </div>
            <div>
                <strong>data: </strong><span>${this.valori.date}</span>
            </div>
        `;
        const modificaBtn = document.createElement('button');
    modificaBtn.textContent = 'Modifica';
    modificaBtn.addEventListener('click', () => {
        const modificaEvent = new CustomEvent('modifica-valore', { detail: { valore, index: valore.date } });
        this.dispatchEvent(modificaEvent);
    }); 
    mainDiv.appendChild(modificaBtn);

    this.shadow.appendChild(mainDiv);
}





}


customElements.define('valori-card', ValoriCard);