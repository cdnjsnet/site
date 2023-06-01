function getQueryString(name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

var appInfo = new Vue({
    el: '#cdn',
    data: {
        allInfo: '',
        pkgVersion: '',
        url: ''
    },
    created: function () {
        var name = getQueryString("name");
        var request = new XMLHttpRequest();
        request.open("GET", "https://api.cdnjs.net/libraries/" + name + ");
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                appInfo.allInfo = JSON.parse(request.responseText);
                appInfo.pkgVersion = JSON.parse(request.responseText).assets;
                appInfo.url = JSON.parse(request.responseText).repository.url;
            }
            else {
                console.log('statusText:' + request.statusText);
            }
        };
    },
    methods: {
        doCopy: function (index, flag) {
            //这个是获取当前menuItem值，用index来区分当前元素是v-for 产生的数组中的第几个数
            var getMenuText = this.$refs.menuItem[index].innerText;
            if (flag) {
                // 正则表达式判断是CSS还是JS，然后进行拼接
                this.$copyText(/\.css$/.test(getMenuText) ? s = '<link href="' + getMenuText + '" rel="stylesheet">' : (s = '<script src="' + getMenuText + '"><\/script>')).then(function (e) {
                    alert('It has been Copied:\n\n'+e.text);
                    console.log(e)
                }, function (e) {
                    alert('Your browser does not support copying this content to the clipboard.');
                    console.log(e)
                })
            } else {
                this.$copyText(getMenuText).then(function (e) {
                    alert('It has been Copied:\n\n'+e.text);
                    console.log(e)
                }, function (e) {
                    alert('Your browser does not support copying this content to the clipboard.');
                    console.log(e)
                })
            }
        }
    }
});
