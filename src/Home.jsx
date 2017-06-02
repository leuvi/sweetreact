import React, { Component } from 'react'
import Layout from './components/Layout'
import {Link} from 'react-router'
import Logo from './Logo'
import wavesButton from './plugins/wavesButton'


class Home extends Component {
	componentDidMount() {
		//波浪按钮
		;[...document.querySelectorAll('li')].forEach(li => {
			new wavesButton(li, '#ff348b')
		})
	}
	render() {
		return (
			<Layout name="welcome.!" back={false}>
				<div className="home">
					<Logo />
					<h2>Based on React development</h2>
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
									<i className="iconfont rotateicon icon-zhinengyouhua"></i>
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
				</div>
				<footer>©{new Date().getFullYear()} 苹果熊</footer>
			</Layout>
		)
	}
}

module.exports = Home

// function Logo() {
// 	return (
// 		<div className="logo">
// 			<div className="border">
// 				<span className="circle"><i className="iconfont icon-xiangqufill"></i></span>
// 			</div>
// 		</div>
// 	)
// }