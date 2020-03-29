import Vue from "vue";
import Store from "../store/store";

Vue.mixin({
    watch : {
        quote (){
            this.setTradeQuote();
        },
        trade (){
            this.setTradeQuote();
        }
    },
    methods: {
        transactionTypeText (item){
            if(item.type == 'trustline'){
                return this.$t('trust') + this.$t('gateway');
            }
            if(item.type == 'payment'){

                if(item.specification.source.address == this.rcp_info.release_profit_address){
                    return this.$t('lang152');
                }

                if(item.specification.source.address == this.rcp_info.miner_profit_address){
                    if(item.specification.memos && item.specification.memos.length > 0){
                        let type = item.specification.memos[0].type;
                        if(type == 'wk_x_power'){
                            return this.$t('lang118');
                        }else if(type == 'wk_y_power'){
                            return this.$t('lang119');
                        }else if(type == 'wk_x_coinage_power'){
                            return this.$t('lang120');
                        }else{
                            return this.$t('lang121');
                        }
                    }
                    return this.$t('lang117');
                }

                if(this.rcp_info && this.rcp_info.withdraw_address){
                    let coin = Object.keys(this.rcp_info.withdraw_address);
                    for(let i = 0; i < coin.length; i++){
                        if(this.rcp_info.withdraw_address[coin[i]] == item.specification.destination.address){
                            return this.$t('lang149');
                        }
                    }
                }

                if(item.specification.source.address == this.rcp_info.conv_profit_address){
                    return this.$t('lang86');
                }
                if(item.specification.destination.address == this.rcp_info.conv_address){
                    return this.$t('lang40');
                }
                if(item.specification.source.address == this.rcp_info.conv_address){
                    return this.$t('lang82');
                }
                if(item.specification.source.address == this.rcp_info.airdrop_address){
                    return this.$t('lang83');
                }
                if(item.specification.destination.address == this.rcp_info.active_address){
                    return this.$t('home.home15');
                }
            }
            return this.$t('wallet.fu')
        },
        clickTrade (item){
            this.$store.commit('trade', {
                right : item.right,
                left : item.left
            });
            this.$router.push('/trade');
        },
        toFixedNumber (num, len = 6){
            if(typeof num == 'object'){
                return num.toFixed(len) * 1;
            }
            return this.decimal(num || 0).toFixed(len) * 1;
        },
        getCurrencyItemPrice (item){
            if(typeof item.currency != 'string'){
                return 0;
            }
            let kBox = Object.keys(this.quote);
            for(let i = 0; i < kBox.length; i++){
                let kItem = Object.keys(this.quote[kBox[i]]);
                for(let k = 0; k < kItem.length; k ++){
                    let itemK = this.quote[kBox[i]][kItem[k]];
                    for(let j = 0; j < itemK.length; j++){
                        if(itemK[j].left.currency == item.currency && itemK[j].left.counterparty == item.counterparty){
                            return this.getCurrencyPrice(itemK[j]);
                        }
                        if(itemK[j].right.currency == item.currency && itemK[j].right.counterparty == item.counterparty){
                            let t = this.getCurrencyPrice(itemK[j]);
                            if(itemK[j].price * 1 <= 0){
                                return 0;
                            }else{
                                return this.decimal.div(t, itemK[j].price * 1).toFixed(2);
                            }
                        }
                    }
                }
            }
            return 0;
        },
        getCurrencyPrice (item){
            if(!(item.left && item.left.currency)){
                return 0;
            }
            let title = this.unitCoin(this.$t('title'));
            if(item.left.currency.toUpperCase() == title){
                return this.decimal(this.moneyConvert).toFixed(2);
            }
            if(item.right.currency.toUpperCase() == title){
                return this.decimal.div(1, item.price).mul(this.moneyConvert).toFixed(2);
            }

            let price = 0;
            Object.keys(this.quote).forEach(name => {
                Object.keys(this.quote[name]).forEach(coin => {
                    // if(coin.toUpperCase() == this.$t('title').toUpperCase()){
                        this.quote[name][coin].forEach(elm => {
                            let p = 0;
                            if(elm.left.currency.toUpperCase() == title){
                                p = this.decimal.div(this.moneyConvert, item.price);
                            }
                            if(elm.right.currency.toUpperCase() == title){
                                p = this.decimal.mul(this.moneyConvert, item.price);
                            }
                            if(p != 0){
                                if(elm.right.currency == item.right.currency){
                                    price = this.decimal.div(1, item.price).mul(p).toFixed(2)
                                }
                                if(elm.left.currency == item.right.currency){
                                    price = p.toFixed(2)
                                }
                            }
                        });
                    // }
                })
            });
            return price <= 0 ? '-' : price;
        },
        setTradeQuote (){
            Object.keys(this.quote).forEach(name => {
                Object.keys(this.quote[name]).forEach(coin => {

                    this.quote[name][coin].forEach(item => {
                        if(item.left.currency.toUpperCase() == 'XRP' && item.right.currency.toUpperCase() == 'ADS'){
                            this.$store.commit('newPrice', item.price * 1);
                        }
                        if(item.left.currency.toUpperCase() == this.trade.left.currency.toUpperCase() && item.right.currency.toUpperCase() == this.trade.right.currency.toUpperCase()){
                            this.$store.commit('newTradeQuote', item);
                        }
                    });

                    // if(coin.toUpperCase() == this.trade.right.currency.toUpperCase()){
                    //     this.quote[name][coin].forEach(item => {
                    //         if(item.left.currency.toUpperCase() == this.trade.left.currency.toUpperCase()){
                    //             this.$store.commit('newTradeQuote', item);
                    //         }
                    //     });
                    // }
                    // }
                })
            });
        },
        getMarket (){
            this.axios({
                url: process.env.NODE_ENV == 'development' ? "/service/quote" : 'https://trading.adrchain.org/service/quote',
                params: {
                    name : this.$t('title').toLowerCase(),
                }
            })
                .then(res => {

                    let item;
                    if(res.data.main && res.data.main.xrp && res.data.main.xrp[0]){
                        item = res.data.main.xrp[0];
                        if(Store.state.trade && Store.state.trade.init != false){

                        }else{
                            Store.commit('trade', {
                                right : item.right,
                                left : item.left
                            });
                        }
                    }

                    this.$store.commit('quote', res.data);
                    // console.log(res);
                    setTimeout(this.getMarket, 3000);
                })
                .catch(e => {
                    setTimeout(this.getMarket, 3000);
                    console.log(e.message);
                });
        },
        clickBinding (){
            if(this.isjihuo == false){
                this.$toast.show(this.$t('home.home8'));
                return;
            }
            if(this.invite){
                this.$toast.show(this.$t('home.home13'));
            }else{
                this.$router.push('/binding');
            }
        },
        unitCoin (name){
            if(typeof name != 'string') {
                return '';
            }
            name = name.toUpperCase();
            if(name == "UST"){
                return "USDT";
            }
            if(name == this.$t('title').toUpperCase()){
                return 'XRP'
            }else if(name == 'XRP'){
                return this.$t('title').toUpperCase()
            }
            return name;
        },
        toRoute(path){
            this.$router.push({ path: path});
        }
    }
})