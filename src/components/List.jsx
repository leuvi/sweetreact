import React, {Component} from 'react'
import Layout from './Layout'
import ListView from './ListView'
import {getJSON} from '../util'


export default class List extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			page: 1
		}
	}
	componentDidMount() {
		const api = `http://www.sweetui.com/demo/api/dataset.php?start=${this.state.page}&count=15`
		getJSON(api).then(data => {
			this.timer = setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.concat(data)
				})
			}, 500)
		})
	}
	componentWillUnmount() {
		clearTimeout(this.timer)
	}
	render() {
		return (
			<Layout name="ListView">
				<ListView
					dataSource={this.state.dataSource}
					renderRow={rowData => <div className="listdemo"><h2>{rowData}</h2></div>}
					onEndReached={this.getData.bind(this)}
					showGesture={true}
					actionCallback={this.getCallback.bind(this)}
				/>
			</Layout>
		)
	}
	getCallback(key) {
		this.state.dataSource.splice(key, 1)
		console.log(this.state.page)
	}
	getData() {
		this.setState({
			page: this.state.page + 15
		})
		const api = `http://www.sweetui.com/demo/api/dataset.php?start=${this.state.page}&count=15`
		return new Promise((resolve, reject) => {
			this.timer = setTimeout(() => {
				getJSON(api).then(data => {
					this.setState({
						dataSource: this.state.dataSource.concat(data)
					})
					resolve()
				}).catch(e => {
					reject('请求数据失败')
				})
			}, 500)
		})
	}
}

