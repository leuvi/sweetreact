import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {remLayout} from './util'

import Home from './Home'
import Demos from './Demos.jsx'
import components from './components'

import './index.styl'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			slideName: 'swipeLeft'
		}
	}
	componentWillReceiveProps(nextProps) {
		let newPath = nextProps.location.pathname
		let oldPath = this.props.location.pathname
		if(newPath !== oldPath) {
			this.setState({
				slideName: newPath.length >= oldPath.length ? 'swipeLeft' : 'swipeRight'
			}, () => {
				window.scrollTo(0, 0)
			})
		}
	}
	render() {
		return (
			<div className="app">
				<ReactCSSTransitionGroup
			      component="div"
			      transitionName={this.state.slideName}
			      transitionEnterTimeout={500}
			      transitionLeaveTimeout={500}
			    >
			      {React.cloneElement(this.props.children, {
			        key: this.props.location.pathname
			      })}
			    </ReactCSSTransitionGroup>
			</div>	
		)
	}
}


ReactDOM.render(
	<Router history={hashHistory}>
	  	<Route path="/" component={App}>
		  	<IndexRoute component={Home} />
		  	<Route path="demos" component={Demos} />
		  	<Route path="about" component={components.About} />
		  	<Route path="contact" component={components.Contact} />
		  	<Route path="demo/tab" component={components.Tab} />
		  	<Route path="demo/slide" component={components.Slide} />
		  	<Route path="demo/totop" component={components.ToTop} />
		  	<Route path="demo/actionsheet" component={components.ActionSheet} />
		  	<Route path="demo/dialog" component={components.Dialog} />
		  	<Route path="demo/animate" component={components.Animate} />
		  	<Route path="demo/toast" component={components.Toast} />
		  	<Route path="demo/fullpage" component={components.FullPage} />
		  	<Route path="demo/fullpagex" component={components.FullPageX} />
		  	<Route path="demo/gesture" component={components.Gesture} />
		  	<Route path="demo/countdown" component={components.CountDown} />
		  	<Route path="demo/switch" component={components.Switch} />
		  	<Route path="demo/refresh" component={components.Refresh} />
		  	<Route path="demo/infiniteload" component={components.InfiniteLoad} />
		  	<Route path="demo/progress" component={components.Progress} />
		  	<Route path="demo/citypicker" component={components.CityPicker} />
		  	<Route path="demo/datepicker" component={components.DatePicker} />
		  	<Route path="demo/login" component={components.Login} />
		  	<Route path="demo/regist" component={components.Regist} />
	  	</Route>
	</Router>,
	document.getElementById('app')
)
remLayout()