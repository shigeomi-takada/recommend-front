;(function(){

    //url = 'http://192.168.100.19:8000/v1/recommend'
    url = 'http://127.0.0.1:8000/v1/recommend'
    axios.defaults.headers.common['Content-Type'] = 'application/json';

  /**
    * ****************************************************
    *  DOMの構築が完了してから実行する
    * ****************************************************
    */

  $(function() {

    Vue.component('result-component', {
        template:
            '<div class="col s12 m4 l2">' +
                '<div class="card">' +
                    '<div class="card-image">' +
                        '<img class="responsive-img" :src="image" />' +
                    '</div>' +
                    '<div class="card-content">' +
                        '<p>I am a very simple card. I am good at containing small bit</p>' +
                    '</div>' +
                '</div>' +
            '</div>',
        props: ['image', 'title', 'message']
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
                    axios.get(url + '/prototype', {
                        params: {
                            // スペースはプラスで置き換えてくれる模様
                            keywords: $('#recommend-search-input-text').val()
                        }
                    })
                    .then(function (response) {
                        recommend_result.items = response.data.images
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

  });
})();
