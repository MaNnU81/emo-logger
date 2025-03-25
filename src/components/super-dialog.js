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
    
    }

}

customElements.define('super-dialog', SuperDialog);