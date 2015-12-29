var React = require('react');
class Star extends React.Component{
    render(){
        var list=[];
        var starNum=Math.floor(this.props.starNum);
        for(var i=0;i<5;i++){
            if(i<starNum){
                list.push(
                    <span className="star1" key={i}></span>
                )
            }else{
                list.push(
                    <span className="star2" key={i}></span>
                )
            }

        }
        return(
            <a className="star">
                {list}
            </a>
        )
    }
}
exports['default']=Star;