var data={url:"cdn.html?name="};
Vue.component('todo-item', {
    props: ['todo1'],
    template: '<a :href=" url+todo1[0] " class="package list-group-item" target="_blank">\n' +
    '                <div class="row clearfix">\n' +
    '                    <div class="main-left">\n' +
    '                        <h4 class="package-name">{{ todo1[0] }}</h4>\n' +
    '                    </div>\n' +
    '                    <div class="main-right">\n' +
    '                        <p class="package-description">\n' +
    '                            {{ todo1[1] }}\n' +
    '                        </p>\n' +
    '                    </div>\n' +
    '                    <div class="package-extra-info main-right">\n' +
    '                        <span>★ {{ todo1[2] }}</span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </a>',
    data:function () {
        return data;
    }
});

// 节流函数debounce test1
var delay = (function () {
    // 定时器重置
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
//节流函数debounce test2
function debounce0(method, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(context, args);
        }, delay);
    }
}
var commonPackageList = [
];
var appPackage1 = new Vue({
    el: '#home',
    data: {
        currentList: commonPackageList,
        showList: commonPackageList,
        allList: '',
        noMore: true,
        searchIcon:'☌',
        packageList: ''
    },
    computed: {
        more: function () {
            return this.noMore = false;
        }
    },
    methods:{
        clearText:function () {
            var t=document.getElementsByClassName('form-control')[0];
            t.value='';
            appPackage1.showList = appPackage1.currentList;
        }
    },
    watch: {
        noMore: function () {
            this.showList = appPackage1.allList;
            this.currentList = appPackage1.allList;
            var allBg = document.getElementsByClassName('cdn-header')[0];
        }
        //监听输入框的值并渲染包列表（存在问题：输入框如果键入个字符串后再快速按“回退”键（小于函数限流0.3s），把所有字符删光时，搜索到的包列表闪了一下空值状态的所有列表后又回退到删到最后一个字母时的搜索列表状态；但是如果慢一点回退，它又可以正常显示搜索结果列表状态。怎么解决？？？？？）
        // ,
        // packageList: function (val) {
        //     if (this.packageList === '') {
        //         appPackage1.searchIcon='☌';
        //         appPackage1.showList = appPackage1.currentList;
        //     }
        //     else delay(function () {
        //         appPackage1.searchIcon='×';
        //         appPackage1.showList = [];
        //         for (var i = 0, len = appPackage1.allList.length; i < len; i++) {
        //             if (appPackage1.allList[i][0].indexOf(val) >= 0) {
        //                 appPackage1.showList.push(appPackage1.allList[i]);
        //             }
        //         }
        //     }, 300)
        // }
    }

});
(function () {
    //Ajax请求所有列表数据，并存于root.data下
    var request = new XMLHttpRequest();
    request.open("GET", "../api/libraries.min.json");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            appPackage1.allList = JSON.parse(request.responseText);
        }
        else {
            console.log('statusText:' + request.statusText);
        }
    };
})();
var n=0;
//搜索框
function searchPackages(val) {
    delay(function (){
        console.log('搜索执行第'+(n++)+'次\n搜索值：'+val);
        if (val === '') {
            appPackage1.searchIcon='☌';
            appPackage1.showList = appPackage1.currentList;
        }
        else {
            appPackage1.searchIcon='×';
            appPackage1.showList = [];
            for (var i = 0, len = appPackage1.allList.length; i < len; i++) {
                if (appPackage1.allList[i][0].indexOf(val) >= 0) {
                    appPackage1.showList.push(appPackage1.allList[i]);
                }
            }
        }
    },300)
}
