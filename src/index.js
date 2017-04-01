import React from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {remLayout, activeEffect} from './util'
import childRoutes from './routes'
import store from './store'

import Home from './Home'
import './index.styl'


class App extends React.Component {
	static childContextTypes = {
		loading: React.PropTypes.func
	}
	constructor(props) {
		super(props)
		this.state = {
			slideName: 'swipeLeft',
			loading: false
		}
	}
	getChildContext() {
		return {
			loading: this.hiddenLoading.bind(this)
		}
	}
	hiddenLoading(value) {
		this.setState({
			loading: value
		})
	}
	componentWillReceiveProps(nextProps) {
		let newPath = nextProps.location.pathname
		let oldPath = this.props.location.pathname
		if(newPath !== oldPath) {
			let slideName = ''
			if(oldPath === '/404') {
				slideName = 'swipeRight'
			} else if (newPath === '/404' || newPath.length >= oldPath.length) {
				slideName = 'swipeLeft'
			} else {
				slideName = 'swipeRight'
			}
			store.dispatch({type: 'HIDDEN', display: false})
			this.setState({slideName}, () => window.scrollTo(0, 0))
		}

	}
	shouldComponentUpdate(nextProps) {
		return nextProps.location.action === 'POP'
	}
	componentDidMount() {
		remLayout()
		activeEffect()
		
		store.subscribe(() => {
			this.setState({
				loading: store.getState()
			})
		})
		
	}	
	render() {
		const loading = this.state.loading ? <div className="isloading" onTouchMove={e => e.preventDefault()}>
			    	<div className="loading"></div>
			    	<p>正在加载</p>
			    </div> : null
		return (
			<div className="app">
				{loading}
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



const routes = [
	{
		path: '/',
		component: App,
		indexRoute: {
			component: Home
		},
		childRoutes,
		onChange(prevState, nextState) {
			if(nextState.location.action === 'PUSH') {
				store.dispatch({type: 'SHOW', display: true})
			}
		}
	},
	{
		path: '*',
		indexRoute: {
            onEnter(nextState, replace) {
                replace('/404')
            }
        }
	}
]

ReactDOM.render(
	<Router history={hashHistory} routes={routes} />,
	document.getElementById('app')
)
