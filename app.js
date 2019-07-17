new Vue({
    el: '#app',
    data: {
        currencies: {}
    },
    mounted(){
        
        this.getCurrencies();

    },
    methods: {
            getCurrencies(){
                const currencies = localStorage.getItem('curencies');
                if(currencies){
                    this.currencies = JSON.parse(currencies);


                    return;
                }

                axios.get('https://free.currconv.com/api/v7/currencies?apiKey=sample-key-do-not-use')
                .then(response =>{
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results));
                }); 
                  
            }
    }
    

});