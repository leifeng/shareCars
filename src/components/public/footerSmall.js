var React = require('react');
var ReactDom = require('react-dom');
class Footer extends React.Component {
    componentDidMount() {
        var footer = this.footer;
        var h = document.body.scrollHeight + 70;
        footer.style.top = h + 'px';
    }

    render() {
        return (
            <div className="footerSmall" ref={(ref)=>{this.footer=ref}}>
                <em>知豆会员|新大洋|ZD</em>
                <em>@zd.com 京ICP证110507号 京ICP备10046444号 京公网安备1101080212535号 京网文[2014]0059-0009号</em>
            </div>
        )
    }
}
ReactDom.render(<Footer/>, document.getElementById('footer'));