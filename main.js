const vue = new Vue({
    el: '#app',
    data: {

        currentIndex: 0,
        search: '',
        newMessage: '',

        randomAnswers: 
            [
                'È impossibile.', 'Forse sì.', 'Questo non lo sapevo.','Questo anch\'io mi sento capace di affermarlo.',
                'Perché no?', 'Ma è chiaro!', 'Perfetto.', 'E perché non dovrei?', 'Si può anche convenire.', 'ciao'
            ],
        
        contacts: [
            {
                name: 'Michele',
                avatar: '_4',
                visible: true,
                messages: 
                [
                    { date: '10/01/2020 15:30:55', text: 'Hai portato a spasso il cane?', status: 'sent' },
                    { date: '10/01/2020 15:50:00', text: 'Ricordati di dargli da mangiare', status: 'sent' },
                    { date: '10/01/2020 16:15:22', text: 'Tutto fatto!', status: 'received' }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: 
                [
                    { date: '20/03/2020 16:30:00', text: 'Ciao come stai?', status: 'sent' },
                    { date: '20/03/2020 16:30:55', text: 'Bene grazie! Stasera ci vediamo?', status: 'received' },
                    { date: '20/03/2020 16:35:00', text: 'Mi piacerebbe ma devo andare a fare la spesa.', status: 'sent' }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: 
                [
                    { date: '28/03/2020 10:10:40', text: 'La Marianna va in campagna', status: 'received' },
                    { date: '28/03/2020 10:20:10', text: 'Sicuro di non aver sbagliato chat?', status: 'sent' },
                    { date: '28/03/2020 16:15:22', text: 'Ah scusa!', status: 'received' }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_6',
                visible: true,
                messages: 
                [
                    { date: '10/01/2020 15:30:55', text: 'Lo sai che ha aperto una nuova pizzeria?', status: 'sent' },
                    { date: '10/01/2020 15:50:00', text: 'Si, ma preferirei andare al cinema', status: 'received' }
                ],
            },
            {
                name: 'Gianluca',
                avatar: '_8',
                visible: true,
                messages: 
                [
                    { date: '10/01/2020 15:30:55', text: 'Stasera alle 21 al campo da calcio!', status: 'sent' },
                    { date: '10/01/2020 15:50:00', text: 'Non riesco più a venire, problema alla caviglia', status: 'received' }
                ],
            },
        ]
    },
    methods: {
        // creo un metodo che filtra la ricerca dei nomi
        filterContatti(contatto){
            if(this.search == '') {
                return true;
            } else{
                return contatto.name.toLowerCase().includes(this.search.toLowerCase());
            }
        },
        // creo un metodo che al click sul contatto mostri la conversazione del contatto cliccato
        selectChat(index) {
            this.currentIndex = index;
        },
        // Quando l'utente inserisce un messaggio in input digitando 'enter' il testo viene aggiunto alla chat
        sentMessage() {
            if(this.newMessage != '')
                this.contacts[this.currentIndex].messages.push(
                    {
                        text: this.newMessage, date: dayjs().format('DD/MM/YYYY HH:mm:ss'), status: 'sent'
                    }
                ),

                this.newMessage = '';

                // gestione del timer per la risposta
                setTimeout(() => {
                    let random = this.random(this.randomAnswers);
                    this.contacts[this.currentIndex].messages.push(
                        {
                            text: this.randomAnswers[random], date: dayjs().format('DD/MM/YYYY HH:mm:ss'), status: 'received'
                        }
                    )
                }, 1000);

                this.newMessage = '';
            },
            // creo una funzione per generare un numero random
            random (array) {
                const numRandom = Math.floor(Math.random()*array.length);
                return numRandom;
            },
            // Funzione che cambia l'orario dell'ultimo accesso
            lastAccess(){
                let mess = this.contacts[this.currentIndex].messages.length -1; 
                let lastAccessDate = this.contacts[this.currentIndex].messages[mess].date;
                return lastAccessDate;
            },
            lastContactAccess(index) {
                if(this.contacts[index].messages.length > 0){
                    let mess = this.contacts[index].messages.length -1; 
                    let lastAccessDate = this.contacts[index].messages[mess].date;
                    return lastAccessDate;
                }
                return '';
            },
            // Creo una funzione che elimina il messaggio inviato
            deleteMessage(index) {
                this.contacts[this.currentIndex].messages.splice(index, 1);
            }
           
    },
    
})