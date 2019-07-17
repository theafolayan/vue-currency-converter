new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: '',
        to: '',
        result: 0
    },
    mounted(){
        
        this.getCurrencies();

    },
    computed: {
 formattedCurrencies(){
     return Object.values(this.currencies);
 },
 calculateResult(){

    return (Number(this.amount) * this.result).toFixed(3);
},
disabled(){
    return this.amount === 0 || !this.amount;
}
    },
    methods: {
            getCurrencies(){
                const currencies = localStorage.getItem('curencies');
                if(currencies){
                    this.currencies = JSON.parse(currencies);


                    return;
                }
const theurl = 'https://free.currconv.com/api/v7/currencies?apiKey=58ab21ec84d5a9453b2f';
                axios.get(theurl)
                .then(response =>{
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results));
                }); 
                  
            },
            convertCurrency(){
                const key = `${this.from}_${this.to}`;
                var adress = `https://free.currconv.com/api/v7/convert?q=${key}&apiKey=58ab21ec84d5a9453b2f`;
                axios.get(adress).then((response) => {
                    console.log(response.data.results[key].val);
                    this.result = response.data.results[key].val;
                })
            },
          
    }
    

});