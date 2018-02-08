;(function(){

    url = 'http://192.168.100.19:8000/v1/recommend'

    axios.defaults.headers.common['Content-Type'] = 'application/json';

  /**
    * ****************************************************
    *  DOMの構築が完了してから実行する
    * ****************************************************
    */

  $(function() {

    Vue.component('result-component', {
        template:
            '<div class="col s12">' +
                '<div class="card">' +
                    '<span class="recommend-card-username"><a href="#">username</a></span>' +
                    '<div class="card-content recommend-card-content">' +
                        '<h6>ターゲットに届く、広告・ロゴデザインを</h6>' +
                        '<br><p>広告の企画立案から、各種販促物の制作、ロゴ制作など。<br>特にロゴ制作では、インパクトがあり、年月を経ても陳腐化しない、<br>使いやすいロゴデザインを提供します。</p>' +
                        '<br><span>営業・企画 / 個人 60代前半男性 / 神奈川県</span>' +
                        '<br><span>評価数: 21 / 評価: 4.8</span>' +
                        '<br><span>{{ title }}</span>' +
                        '<p>{{ message }}</p>' +
                    '</div>' +
                    '<ul class="collapsible">' +
                        '<li>' +
                            '<div class="collapsible-header"><i class="material-icons">reorder</i>過去の行動</div>' +
                            '<div class="collapsible-body">' +
                                '<div class="collection">' +
                                    '<li class="collection-header"><h6>当選した仕事</h6></li>' +
                                    '<a href="#!" class="collection-item">滋賀初　高地トレーニングジム『HAYA-ASHI』のロゴ</a>' +
                                    '<a href="#!" class="collection-item">新会社Maicoのロゴ</a>' +
                                    '<li class="collection-header"><h6>お気に入りした仕事</h6></li>' +
                                    '<a href="#!" class="collection-item">滋賀初　高地トレーニングジム『HAYA-ASHI』のロゴ</a>' +
                                    '<a href="#!" class="collection-item">新会社Maicoのロゴ</a>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>',
        props: ['title', 'message']
    });

    var recommend_result = new Vue({
        // ${} これだと動かない模様
        //delimiters: ['${', '}'],
        el: '#recommend-result',
        data:  {
            items: [],
            isActive: true
        }
    });

    var recommend_search_button = new Vue({
        delimiters: ['${', '}'],
        el: '#recommend-search-button',
        data: {
            isActive: false
        },
        methods: {
            submit: function() {

                this.isActive = true

                NProgress.start()
                recommend_result.items = []

                // 一瞬でも時間差で実行しないとanimationが動いているように見えない
                setTimeout(function(){

                    axios.get(url + '/lancers', {
                        params: {
                            // スペースはプラスで置き換えてくれる模様
                            q: $('#recommend-search-input-text').val()
                        }
                    })
                    .then(function (response) {
                        recommend_result.items = response.data.lancers

                        // materializecssのCollapsibleを有効にする
                        // こういうことしないと.collapsibleが認識されない
                        setTimeout(function(){
                            var elem = document.querySelector('.collapsible');
                            M.Collapsible.init(elem);
                        }, 200)

                    })
                    .catch(function (error) {
                        M.toast({
                           html: 'エラーが発生しました。ページをリロードしてやり直してください',
                           classes: 'red lighten-1'
                        });
                    });

                    // ここでthisを使うとrecommend_search_buttonを参照しない
                    recommend_search_button.isActive = false
                    NProgress.done()

                }, 200)
            }
        }
    });

    var recommend_control = new Vue({
        delimiters: ['${', '}'],
        el: '#recommend-control',
        data: {
        },
        methods: {
            copy: function() {
                M.toast({
                    html: 'Copied!',
                    classes: 'orange'
                })

            }
        }
    });









  });
})();
