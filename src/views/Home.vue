<template>
    <div class="home">
        <Header :title="$t(`home.home`)"
                :leftShow='false'
                 ></Header>

        <section class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="../assets/images/banner1.jpg" alt="">
                    </div>
                    <div class="swiper-slide"><img src="../assets/images/banner2.jpg" alt=""></div>
                    <div class="swiper-slide"><img src="../assets/images/banner3.jpg" alt=""></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </section>
        <div class="advert">
            <div class="advert_l" @click="adData[0] ? $router.push('/advertDetails/0') : ''">
                <img src="../assets/images/home_horn@2x.png" alt="" srcset="">
                <div>{{adData[0] && adData[0].title || '-'}}</div>
            </div>
            <div class="advert_r" @click="toRoute('advert')">{{$t(`home.home5`)}}</div>
        </div>
        <div class="fenlei">
            <router-link tag="a" to="/digMine" >
                <div class="thenav">
                    <img src="../assets/images/mining@2x.png" alt="" srcset=""  >
                    <span class="nav-title" >{{$t('adr5')}}</span>
                </div>
            </router-link>
            <router-link tag="a" to="/zhuanqian">
                <div class="thenav">
                    <img src="../assets/images/transfer@2x.png" alt="" srcset="" >
                    <span class="nav-title">{{$t('adr3')}}</span>
                </div>
            </router-link>
            <router-link tag="a"   to="/shoukuan">
                <div class="thenav">
                    <img src="../assets/images/transfer_record@2x.png" alt="" srcset=""  >
                    <span class="nav-title">{{$t('lang182')}}</span>
                </div>
            </router-link>
            <router-link tag="a"   to="/shoukuan">
                <div class="thenav">
                    <img src="../assets/images/receivables_qr@2x.png" alt="" srcset=""  >
                    <span class="nav-title">{{$t('wallet.shoukuan1')}}</span>
                </div>
            </router-link>
        </div>
        
        <!-- <div class="coininfosbox">
            <div class="itembox" v-for="item in mainMarket" :key="item.v" @click="clickTrade(item)">
                <div class="text1">{{unitCoin(item.left.currency)}}/{{unitCoin(item.right.currency)}}</div>
                <div class="text2 up">{{toFixedNumber(item.price, 4) || '-'}} {{unitCoin(item.right.currency)}}</div>
                <div class="text4">≈ {{getCurrencyPrice(item)}} {{moneyUnit}}</div>
            </div>
            <div class="itembox" v-if="mainMarket.length <= 2" v-for="item in mainMarket" @click="clickTrade(item)">
                <div class="text1">{{unitCoin(item.left.currency)}}/{{unitCoin(item.right.currency)}}</div>
                <div class="text2 up">{{toFixedNumber(item.price, 4) || '-'}} {{unitCoin(item.right.currency)}}</div>
                <div class="text4">≈ {{getCurrencyPrice(item)}} {{moneyUnit}}</div>
            </div>
            <div class="itembox" v-if="mainMarket.length <= 1" v-for="item in mainMarket" @click="clickTrade(item)">
                <div class="text1">{{unitCoin(item.left.currency)}}/{{unitCoin(item.right.currency)}}</div>
                <div class="text2 up">{{toFixedNumber(item.price, 4) || '-'}} {{unitCoin(item.right.currency)}}</div>
                <div class="text4">≈ {{getCurrencyPrice(item)}} {{moneyUnit}}</div>
            </div>
        </div> -->
        <div class='earningstitle'>{{$t('adr7')}}</div>
        <section class="earnings">
            <h4>{{ !hidden? $t('adr8') : $t('lang26')}}</h4>
            <div>
                <span>{{toFixedNumber(balancesXRP.value, 4) || '-'}}</span> {{$t('title')}}
                <p>≈ {{toFixedNumber(decimal.mul((balancesXRP.value || 0), moneyConvert), 2)}} {{moneyUnit}}</p>
            </div>
        </section>
        <!-- <section class="markets">
            <div class="title">{{$t('adr9')}}</div>
            <ul class="market-menu">
                <li @click="clickMarketMenu(0)" :class="{active : marketMenuActive == 0}"><span>{{$t('lang28')}}</span></li>
                <li @click="clickMarketMenu(1)" :class="{active : marketMenuActive == 1}"><span>{{$t('lang29')}}</span></li>
                <li @click="clickMarketMenu(2)" :class="{active : marketMenuActive == 2}"><span>{{$t('lang30')}}</span></li>
            </ul>
            <ul class="market-menu market-coin" v-if="coinList.length >= 2" >
                <li @click="clickQuoteCoin(item)" :class="{active : quoteCoin == item}" v-for="item in coinList" :key="item"><span>{{item.toUpperCase()}}</span></li>
            </ul>
            <div class="markebox" v-for="item in marketList" v-if="marketList.length > 0" :key="item.v" @click="clickTrade(item)">
                <div class="le">
                    <div class="top">{{unitCoin(item.left.currency)}}<span>/{{unitCoin(item.right.currency)}}</span></div>
                    <div class="last">24h&nbsp;{{item.v || '-'}}</div>
                </div>
                <div class="cen">
                    <div class="top">{{toFixedNumber(item.price, 4) || '-'}}</div>
                    <div class="last">≈ {{getCurrencyPrice(item)}} {{moneyUnit}}</div>
                </div>
                <div class="rig">
                    <div class="bt" :class="item.ttm * 1 >= 0 ? 'sellbg' : 'buybg'">{{item.ttm}}%</div>
                </div>
            </div>
            <empty v-if="marketList.length <= 0"></empty>
        </section> -->
        <!-- benifit -->
        <div class="last-week-profit calc-power-group">
            <div class="icon-subtitle">
                <i class="icon"></i>
                <span class="subtitle">{{$t('lang116')}}</span>
            </div>
            <div class="divider"></div>
            <canvas class="chart-7Day"></canvas>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import SwiperCss from "swiper/css/swiper.css";
    import Chart from 'chart.js';
    // @ is an alias to /src
    export default {
        name: "home",
        data() {
            return {
                hidden: false,
                isShowPswModal: false,
                swiper: null,
                marketMenuActive: 0,
                mainMarket : [],
                coinList : [],
                marketList : [],
                market : {},
                quoteCoin : '',
                myBarChart : null,
                item : [],
                labels : [],
                data : [],
            };
        },
        watch : {
            quote (){
                this.coinListChange();
                this.marketMenuChange();
            },
            marketMenuActive (){
                this.marketMenuChange();
            }
        },
        mounted() {
            this.getAd();
            this.banner();
            if(this.quote.main){
                this.coinListChange();
                this.marketMenuChange();
            }
            this.getData();
        },
        destroyed() {
            if(this.swiper){
                this.swiper.destroy();
            }
            if(this.myBarChart){
                this.myBarChart.destroy();
            }
        },
        methods: {
            getData (){
                this.axios({
                    url : "/service/wk_info",
                    params : {
                        address : this.account.getAddress()
                        // address : 'rx08'
                    }
                }).then(data => {
                    console.log(data);
                    this.item = data.data || [];
                    this.labels = [];
                    this.data = [];
                    if(this.item._7day_total_profit){
                        let _7day_total_profit = this.item._7day_total_profit || [];
                        _7day_total_profit.forEach(item => {
                            let t = (new Date(item.time));
                            this.labels.push((t.getMonth() + 1) + '/' + t.getDate());
                            this.data.push(item.profit);
                        })
                    }
                    this.chart();
                }).catch(e => {
                    console.log(e.message);
                    // this.chart();
                })
            },
            chart (){
                if(document.querySelector(".chart-7Day")){
                    var ctx = document.querySelector(".chart-7Day").getContext('2d');
                    this.myBarChart = new Chart(ctx, {
                        type: 'line',
                        data:  {
                            labels: this.labels,
                            datasets: [
                                {
                                    borderColor : "#00FF00",
                                    backgroundColor : "#00FF00",
                                    data: this.data,
                                    fill: false,
                                    borderWidth: 1,
                                }
                            ],
                        },
                        options: {
                            legend : false,
                        }
                    });
                }
            },
            coinListChange (){
                if(this.quote.main){
                    this.coinList = Object.keys(this.quote.main);
                    if(this.coinList.length){
                        this.mainMarket = this.quote.main[this.coinList[0]] || [];
                    }else{
                        this.mainMarket = [];
                    }

                }else{
                    this.mainMarket = [];
                }
            },
            clickQuoteCoin (coin){
                this.quoteCoin = coin;
                if(this.market[coin]){
                    this.marketList = this.market[coin];
                }else{
                    this.marketList = [];
                }
            },
            quoteKey (param){
                if(param){
                    this.coinList = Object.keys(param);
                    if(this.coinList.length){
                        this.market = param;
                        this.marketList = param[this.coinList[0]];
                        this.quoteCoin = this.coinList[0];
                    }else{
                        this.marketList = [];
                        this.market = {};
                        this.quoteCoin = '';
                    }
                }else{
                    this.coinList = [];
                    this.marketList = [];
                    this.market = {};
                    this.quoteCoin = '';
                }
            },
            marketMenuChange (){
                if(this.marketMenuActive == 0){
                    this.quoteKey(this.quote.main);
                }else if(this.marketMenuActive == 1){
                    this.quoteKey(this.quote.gem);
                }else{
                    this.quoteKey(this.quote.pink);
                }
            },

            clickMy (){
                this.$router.push("/user");
                return true;
            },
            toacceptCoin (){
                this.$router.push("/scanning");
            },
            dispark (){
                this.$toast.show(this.$t('dispark'));
            },
            handleKeyup() {
                console.log(1);
            },
            handleScroll() {
                console.log(2);
            },
            clickMarketMenu(index) {
                this.marketMenuActive = index;
            },
            banner() {
                this.swiper = new Swiper(".swiper-container", {
                    pagination: {
                        el: ".swiper-pagination",
                        dynamicBullets: true
                    },
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true
                    }
                });
            },
            getAd() {
                this.axios({
                    url: "/service/ad",
                    params: {
                        lan : this.$i18n.locale
                    }
                })
                    .then(res => {
                        // console.log(res);
                        this.$store.commit("adData", res.data || []);
                    })
                    .catch(e => {
                        console.log(e.message);
                        this.$store.commit("adData", []);
                        setTimeout(() => {
                            this.getAd();
                        }, 3000);
                    });
            },
            clickActivate() {},
            toHidden() {
                this.hidden = !this.hidden;
            }
        },
        components: {}
    };
</script>
<style lang="scss">
    .swiper-pagination-bullet-active {
        background: $white;
    }
    .swiper-pagination-bullet {
        opacity: 0.6;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 0px;
    }
</style>
<style lang="scss" scoped>
    .chart-7Day{
        height: 200px;
        margin-top: 15px;
        width: 100%;
    }
    // xm start
    .market-menu{
        display: flex;
        height: 50px;
        padding: 0 30px;
        justify-content: space-between;
        &.market-coin{
            padding: 0;
            height: 40px;
            li{
                font-size: 14px;
                &.active{
                    color: rgba($active, 0.8);
                    span{
                        &:before{
                            border-bottom: solid 2px rgba($active, 0.5);
                        }
                    }
                }
            }
        }
        li{
            display: flex;
            font-size: 16px;
            align-items: center;
            color: $color1;
            cursor: pointer;
            &.active{
                color: $active;
                span{
                    &:before{
                        border-bottom: solid 2px $active;
                    }
                }
            }
            span{
                display: inline-block;
                position: relative;
                padding: 0 8px;
                text-align: center;
                height: 35px;
                line-height: 35px;
                &:before{
                    display: block;
                    content: '';
                    width: 100%;
                    border-bottom: solid 2px transparent;
                    position: absolute;
                    bottom: 0;
                    left: 0px;
                }
            }
        }
    }
    .home {
        padding-top: 50px;
        padding-bottom: 50px;
        .banner {
            background: $border2;
            padding: 0 15px;
            .swiper-container {
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
            .swiper-slide {
                height: 150px;
                color: $border3;
                text-align: center;
                font-size: 18px;
                background: $white;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .advert {
            border-bottom: 1px solid $bg3;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 15px;
            background: $border2;
            height: 50px;
            color: $active;
            .advert_l {
                display: flex;
                align-items: center;
                width: 84%;
                height: 50px;
                font-size: 14px;
                white-space: nowrap;
                line-height: 50px;
                div::-webkit-scrollbar {
                    display: none;
                }
                div {
                    overflow-x: scroll;
                }
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                }
            }
            .advert_r {
                font-size: 14px;
            }
            .advert_r:hover {
                color: $blue;
            }
        }
        .fenlei {
            background: $bg;
            display: flex;
            align-items: center;
            padding-bottom: 15px;
            justify-content: space-around;
            border-bottom: 10px solid #F7F9FC;
            .thenav {
                display: flex;
                flex-direction: column;
                align-items: center;
                line-height: 1.4;
                img {
                    width: 33px;
                    height: 33px;
                }
                span {
                    font-size: 10px;
                    font-weight: 400;
                    margin-top: 7px;
                    color: $color2;
                }
            }
        }
        .coininfosbox::-webkit-scrollbar {
            display: none;
        }
        .coininfosbox {
            background: $bg;
            width: 100%;
            border-top: 10px solid $bg7;
            border-bottom: 10px solid $bg7;
            overflow-y: scroll;
            height: 120px;
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: space-around;
            .itembox {
                flex-shrink: 0;
                text-transform: uppercase;
                display: inline-block;
                text-align: center;
                width: 33vw !important;
                .text1 {
                    font-size: 12px;
                    color: $active;
                }
                .text2 {
                    font-size: 18px;
                }
                .text4 {
                    font-size: 14px;
                    color: $primary;
                }
            }
        }
        .earningstitle {
            color: $active;
            font-size: 18px;
            padding: 15px;
        }
        .earnings {
            
            display: block;
            margin: 0 15px;
            padding: 15px;
            color: $white;
            font-size: 18px;
            background: url("../assets/images/home_assets_bj@2x.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            border-radius: 5px;
            margin-bottom: 20px;
            h4 {
                font-weight: normal;
                font-size: 14px;
                margin-bottom: 10px;
            }
            div {
                span {
                    font-size: 32px;
                    color: $white;
                }
            }
        }
        .markets {
            margin: 10px 15px;
            .title {
                font-size: 18px;
                color: $active;
                border-bottom: 1px solid $bg3;
                padding: 15px 0;
            }
            .markebox {
                border-bottom: 1px solid $bg3;
                padding: 15px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: $active;
                .le {
                    .top {
                        color: $active;
                        font-size: 16px;
                        span {
                            font-size: 12px;
                            color: $primary;
                        }
                    }
                    .last {
                        font-size: 12px;
                        color: $primary;
                    }
                }
                .cen {
                    text-align: center;
                    .top {
                        font-size: 16px;
                        color: $active;
                    }
                    .last {
                        font-size: 12px;
                        color: $primary;
                    }
                }
                .rig {
                    .bt {
                        font-size: 14px;
                        color: $white;
                        width: 75px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                    }
                }
            }
        }
    }
    .last-week-profit {
        position: relative;
        padding: 0 15px;
        .icon {
            background-image: url("../assets/images/mining_profit@2x.png");
        }
        .subtitle{
            font-size: 18px;
        }
        .profit-chart {
            padding: 15px 0;

            .pillar-group {
                display: flex;
                align-items: baseline;
                justify-content: space-between;

                .pillar {
                    height: 50px;
                    width: 16px;
                    border-radius: 100px 100px 0 0;
                    background:linear-gradient(180deg,rgba(1,101,237,1) 0%,rgba(1,101,237,0) 100%);
                }
            }

            .no-data {
                padding: 47px 0;
                text-align: center;
                i.no-data-logo {
                    margin: 0 auto;
                    background-image: url("../assets/images/blank_page@2x.png");
                    background-size: 100% 100%;
                    display: inline-block;
                    border: 1px dashed $color1;
                    width: 80px;
                    height: 80px;
                }

                .no-data-note {
                    color: $color1;
                    font-size: 12px;
                }
            }

            .inside-chart {
                margin: 0;
            }

            .date-group {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                .date {
                    color: $color1;
                    font-size: 10px;
                    line-height: 10px;
                    margin-top: 8px;
                }
            }
        }
    }
</style>

