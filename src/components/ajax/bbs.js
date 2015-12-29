var Dir =require('./dir.js').default;
$.ajaxSetup({
    dataType: "json"
});
var bbs = {
    addBBs(rentNum, reViewValue, reViewTxt, cb){
        $.ajax({
            url: Dir + '/comment/add',
            type: 'put',
            data: {rentNum: rentNum, reViewValue: reViewValue, reViewTxt: reViewTxt}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else if(data.flag===-1){
                location.href='/zd/user.html?cb='+encodeURIComponent(location.pathname+location.hash);
            }
        });
    },
    appeal(rentNum, reViewTxt, cb){
        $.ajax({
            url: Dir + '/appeal',
            type: 'put',
            data: {rentNum: rentNum, reViewTxt: reViewTxt}
        }).done(function (data) {
            if (data.flag === 1) {
                cb()
            } else if(data.flag===-1){
                location.href='/zd/user.html?cb='+encodeURIComponent(location.pathname+location.hash);
            }
        });
    }
};
exports['default']=  bbs;