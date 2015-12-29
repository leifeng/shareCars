var React = require('react');
var Category = React.createClass({
    getInitialState() {
        return {
            categories: [{id: 1, name: '车'}, {id: 2, name: '充电桩'}]
        }
    },
    render() {
        var cls,
            items = this.state.categories.map(item=> {
                cls = (item.id === this.props.categoryId-0) ? 'selected' : '';
                return (<a key={item.id} data-id={item.id} className={cls} href="javascript:;">{item.name}</a>);
            });
        return (
            <div className="category">
                <label>类别：</label>{items}
            </div>
        )
    }
});

exports['default']= Category;