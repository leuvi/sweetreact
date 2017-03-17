import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {remLayout} from './util'

import Home from './Home'
import Demos from './Demos.jsx'
import {
	About,
	Contact,
	Tab,
	Slide,
	ToTop,
	ActionSheet,
	Dialog,
	Animate,
	Toast,
	FullPage,
	Gesture,
	CountDown,
	Switch,
	Refresh,
	InfiniteLoad,
	Progress,
	CityPicker,
	FullPageX
} from './components'

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
				slideName: newPath.length > oldPath.length ? 'swipeLeft' : 'swipeRight'
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
		  	<Route path="about" component={About} />
		  	<Route path="contact" component={Contact} />
		  	<Route path="demo/tab" component={Tab} />
		  	<Route path="demo/slide" component={Slide} />
		  	<Route path="demo/totop" component={ToTop} />
		  	<Route path="demo/actionsheet" component={ActionSheet} />
		  	<Route path="demo/dialog" component={Dialog} />
		  	<Route path="demo/animate" component={Animate} />
		  	<Route path="demo/toast" component={Toast} />
		  	<Route path="demo/fullpage" component={FullPage} />
		  	<Route path="demo/fullpagex" component={FullPageX} />
		  	<Route path="demo/gesture" component={Gesture} />
		  	<Route path="demo/countdown" component={CountDown} />
		  	<Route path="demo/switch" component={Switch} />
		  	<Route path="demo/refresh" component={Refresh} />
		  	<Route path="demo/infiniteload" component={InfiniteLoad} />
		  	<Route path="demo/progress" component={Progress} />
		  	<Route path="demo/citypicker" component={CityPicker} />
	  	</Route>
	</Router>,
	document.getElementById('app')
)
remLayout()