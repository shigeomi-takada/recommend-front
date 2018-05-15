;(function(){

    function get_params() {
        var vars = new Object, params;
        var temp_params = decodeURI(window.location.search).substring(1).split('&');
        for(var i = 0; i <temp_params.length; i++) {
            params = temp_params[i].split('=');
            if(!params[0] || !params[1]) {
                return null
            }
            vars[params[0]] = params[1];
        }

        return params[1]
    }

    //url = 'http://192.168.100.19:8000/v1/recommend'
    url = 'http://127.0.0.1:5000/v1/designs'
    axios.defaults.headers.common['Content-Type'] = 'application/json';

  /**
    * ****************************************************
    *  DOMの構築が完了してから実行する
    * ****************************************************
    */

  $(function() {

    Vue.component('result-component', {
        template:
            '<div class="column">' +
                '<a target="_blank" :href="detail_path">' +
                    '<div class="card">' +
                       '<div class="card-image">' +
                            '<img class="responsive-img" :src="image" />' +
                        '</div>' +
                        '<div class="card-action">' +
                           '<p>{{ title }}</p>' +
                        '</div>' +
                    '</div>' +
                '</a>' +
            '</div>',
        props: ['image', 'title', 'name', 'detail_path']
    });

    var recommend_result = new Vue({
        // ${} これだと動かない模様
        //delimiters: ['${', '}'],
        el: '#recommend-result',
        data:  {
            uploads: [],
            isActive: true
        }
    });

    var recommend_search_button = new Vue({
        delimiters: ['${', '}'],
        el: '#recommend-search-form',
        methods: {
            submit: function() {

                NProgress.start()
                recommend_result.items = []

                if (param) {
                    var keywords = get_params()
                } else {
                    var keywords = $('#recommend-search-input-text').val()
                }

                param = null

                // 一瞬でも時間差で実行しないとanimationが動いているように見えない
                setTimeout(function(){
                    axios.get(url + '/search', {
                        params: {
                            // スペースはプラスで置き換えてくれる模様
                            keywords: keywords
                        }
                    })
                    .then(function (response) {
                        if(response.data.uploads) {
                            recommend_result.uploads = response.data.uploads
                        } else {
                            M.toast({
                               html: 'No Contents',
                               classes: 'red lighten-1'
                            });
                        }
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

    if (get_params()) {
        $('#recommend-search-input-text').val(get_params());
        var param = get_params()
        recommend_search_button.submit()
    }

  });
})();
