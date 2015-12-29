var React = require('react');
var ReactDom = require('react-dom');
var Header = require('../public/header.js').default;
var Footer = require('../public/footer.js').default;

class Index extends React.Component {
    render() {
        return (
            <div>
                <Header/>

                <div className="img404">
                    <div className="img404-1">
                        <img src="./images/404.png"/>
                        <a>返回</a>
                    </div>

                </div>
                <Footer/>
            </div>
        )
    }
}
ReactDom.render(<Index/>, document.getElementById('main'));