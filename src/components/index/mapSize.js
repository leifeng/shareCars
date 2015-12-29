var React = require('react'),
    ClassNames = require('classnames');
var MapSize = React.createClass({
    onClick() {
        this.props.hideHandle(!this.props.hide);
    },
    render() {
        var cls = ClassNames({
            'mapSize': true,
            'mapSizeUp': this.props.hide,
            'mapSizeDown': !this.props.hide

        });
        var text = this.props.hide ? '展开地图' : '收回地图';
        return (
            <a className={cls} onClick={this.onClick}>
                {text}
            </a>
        )
    }
});
exports["default"] =MapSize;