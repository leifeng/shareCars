(function () {

    function getQuery(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return encodeURI(r[2]);
        return null;
    }

    function payDeposit(payMethod) {
        $.ajax({
            url: '/zd/pay/payDeposit',
            type: 'post',
            dataType: "json",
            data: {payMethod: payMethod}
        }).done(function (data) {

        });
    }

    function payDepositByBank(issInsCode) {
        $.ajax({
            url: '/zd/pay/payDepositByBank',
            type: 'post',
            dataType: "json",
            data: {issInsCode: issInsCode}
        }).done(function (data) {

        });
    }

    var qtype = getQuery('qtype');
    var value = getQuery('value');

    if (qtype === 'payMethod') {
        payDeposit(value);
    } else {
        payDepositByBank(value);
    }

})();