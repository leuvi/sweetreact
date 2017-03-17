import React, { Component } from 'react'
import Layout from './components/Layout'
import {Link} from 'react-router'


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			year: new Date().getFullYear()
		}
	}
	render() {
		return (
			<Layout name="home" back={false}>
				<div className="home">
					<Logo />
					<h2>SweetReact <span>Beta</span></h2>
					<ul>
						<li>
							<Link to="/demos">
								<div>
									<p>Demo</p>
									<i className="iconfont icon-listview"></i>
								</div>
							</Link>
						</li>
						<li>
							<Link to="/about">
								<div>
									<p>About</p>
									<i className="iconfont icon-zhinengyouhua"></i>
								</div>
							</Link>
						</li>
						<li>
							<Link to="/contact">
								<div>
									<p>Contact</p>
									<i className="iconfont icon-geren"></i>
								</div>
							</Link>
						</li>
					</ul>
					<footer>©{this.state.year} 苹果熊</footer>
				</div>
			</Layout>
		)
	}
}

export default App

function Logo() {
	return (
		<div className="logo">
			<div className="border">
				<span className="circle"><i className="iconfont icon-xiangqufill"></i></span>
			</div>
		</div>
	)
}