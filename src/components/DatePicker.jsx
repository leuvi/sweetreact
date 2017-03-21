import React, {Component} from 'react'
import Layout from './Layout'
import {timeFormat} from '../util'


export class DatePickerBox extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentWillMount() {
		const date = this.props.now.split('-')
		this.months =this.props.months + 1 || 7
		this.specialDay = Object.assign({
			'10-1': '国庆节',
			'5-1': '劳动节',
			'12-24': '平安夜',
			'12-25': '圣诞节',
			'1-1': '元旦',
			'2-14': '情人节',
			'3-8': '妇女节',
			'6-1': '儿童节'
		}, this.props.specialDay)
		this.monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		this.year = parseInt(date[0], 10)
		this.month = parseInt(date[1], 10)
		this.day = parseInt(date[2], 10)
	}
	render() {
		return (
			<div className="datepicker">
				<div className="datebar head">
					<div className="back" onClick={this.back.bind(this)}><i className="iconfont icon-xitongfanhui"></i></div>
					<h1>选择日期</h1>
				</div>
				<ul className="weekbar">
					<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
				</ul>
				{this.createDom()}
			</div>
		)
	}
	createDom() {
		const months = [...Array(this.months)].map((v, k) => {
			const year = this.month + k > 12 ? this.year + 1 : this.year
			const month = this.month + k > 12 ? this.month + k - 12 : this.month + k
			return <div key={k}>{this.createMonth(year, month)}</div>
		})
		return <div className="monthlist">{months}</div>
	}
	createMonth(year, month) {
		year = parseInt(year, 10)
		month = parseInt(month, 10)
		const dayLength = this.isLeap(year) && month === 2 ? this.monthArr[month - 1] + 1 : this.monthArr[month - 1]
		const emptyLi = [...Array(new Date(year, month - 1, 1).getDay())]
						.map((v, k) => <li key={k}></li>)
		const dayLi = [...Array(dayLength)].map((v, k) => {
			const day = month + '-' + (k + 1)
			const sday = day in this.specialDay ? <em>{this.specialDay[day]}</em> : null

			if(year === this.year && month === this.month) {
				const disabled = k + 1 < this.day
				return <li key={k} className={disabled ? 'disabled' : null}>{k+1}{sday}</li>
			}else if((year === this.year && month - this.month === this.months - 1)
				|| (year > this.year && this.month + this.months === month + 13)) {
				const disabled = k + 1 > this.day
				return <li key={k} className={disabled ? 'disabled' : null}>{k+1}{sday}</li>
			}
			return <li key={k}>{k+1}{sday}</li>
		})

		return (
			<dl>
				<dt>{year}年{month}月</dt>
				<dd>
					<ul>{emptyLi}{dayLi}</ul>
				</dd>
			</dl>
		)
	}
	isLeap(year) {
		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
			return true
		} else {
			return false
		}
	}
	back() {
		this.close(this.props.callback.bind(this))
	}
}

export default class extends Component {
	render() {
		const props = {
			now: timeFormat(Date.now())
		}
		return (
			<Layout name="DatePicker">
				<DatePickerBox {...props} />
			</Layout>
		)
	}
}