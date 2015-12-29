var React = require('react');
var Cookies = require('cookies-js');
var Area = React.createClass({
    render() {
        var cls = '';
        var items = this.props.areas.map(item=> {
            cls = (item.areaCode - 0 === this.props.areaId - 0) ? 'selected' : '';
            return (
                <a key={item.areaCode} data-id={item.areaCode} href="javascript:;" className={cls}>{item.areaName}</a>)
        });
        return (
            <div className="area">
                <label>区域：</label>{items}
            </div>
        )

    }
});
exports['default'] = Area;