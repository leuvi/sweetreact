import React, {Component} from 'react'
import Layout from './Layout'
import SweetAnimate from './SweetAnimate'
import {timeFormat, time2md, time2w} from '../util'
import {TabBox} from './Tab'


export class DatePickerBox extends Component {
	monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			start: props.start,
			end: props.end,
			count: 0
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.show) {
			this.setState({
				show: true,
				start: nextProps.start,
				end: nextProps.end
			})
		}
    }
    componentDidUpdate() {
    	const id = this.state.start.slice(0, 7)
    	const elem = document.getElementById(id)
		if(elem) {
			elem.scrollIntoView()
		}
	}
	render() {
		const div = this.state.show ? (<div className="datepicker">
				<div className="datebar head">
					<div className="back" onClick={this.back.bind(this)}><i className="iconfont icon-xitongfanhui"></i></div>
					<h1>选择日期</h1>
				</div>
				<ul className="weekbar">
					<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
				</ul>
				{this.createDom()}
			</div>) : null
		return (
			<SweetAnimate
				component="span"
			    enter="slideInRight"
			    leave="slideOutRight"
			    durationEnter={500}
			    durationLeave={500}>
			    {div}
			</SweetAnimate>
		)
	}
	createDom() {
		const date = this.props.now.split('-')
		this.year = parseInt(date[0], 10)
		this.month = parseInt(date[1], 10)
		this.day = parseInt(date[2], 10)
		this.months = this.props.months + 1 || 7

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

		const specialDay = Object.assign({
			'10-1': '国庆节',
			'5-1': '劳动节',
			'12-24': '平安夜',
			'12-25': '圣诞节',
			'1-1': '元旦',
			'2-14': '情人节',
			'3-8': '妇女节',
			'6-1': '儿童节',
		}, this.props.specialDay)

		const dayLength = this.isLeap(year) && month === 2 ? this.monthArr[month - 1] + 1 : this.monthArr[month - 1]
		const emptyLi = [...Array(new Date(year, month - 1, 1).getDay())]
						.map((v, k) => <li key={k}></li>)
		const dayLi = [...Array(dayLength)].map((v, k) => {
			const day = month + '-' + (k + 1)
			const sday = day in specialDay ? <em>{specialDay[day]}</em> : null
			const isStartDay = this.state.start === this.date2Str(year, month, k + 1)

			if(year === this.year && month === this.month) {
				const disabled = k + 1 < this.day
				return <li 
							key={k} 
							className={disabled ? 'disabled' : isStartDay ? 'on' : null}
							onClick={!disabled ? this.selectDay.bind(this, {year, month, day: k + 1}) : null}
						>
							{this.props.now === this.date2Str(year, month, k + 1) ? <span>今天</span> : null}
							{k+1}
							{sday}
						</li>
			}else if((year === this.year && month - this.month === this.months - 1)
				|| (year > this.year && this.month + this.months === month + 13)) {
				const disabled = k + 1 > this.day
				return <li 
							key={k} 
							className={disabled ? 'disabled' : isStartDay ? 'on' : null}
							onClick={!disabled ? this.selectDay.bind(this, {year, month, day: k + 1}) : null}
						>
							{k+1}
							{sday}
						</li>
			}
			return <li 
						key={k} 
						className={isStartDay ? 'on' : null}
						onClick={this.selectDay.bind(this, {year, month, day: k + 1})}
					>
						{k+1}
						{sday}
					</li>
		})

		return (
			<dl>
				<dt id={`${year}-${month < 10 ? '0' + month : month}`}>{year}年{month}月</dt>
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
	selectDay(date) {
		console.log(this.state.count)
		const {year, month, day} = date
		
		if(this.props.type === 1) {
			this.setState({
				start: this.date2Str(year, month, day)
			}, () => {
				this.close(this.props.callback.bind(this, {
					start: this.date2Str(year, month, day),
					end: this.props.end
				}))
			})
		} else {
			if(this.state.count === 0) {
				this.setState({
					start: this.date2Str(year, month, day),
					count: this.state.count + 1
				})
			} else {
				this.setState({
					start: this.state.start,
					end: this.date2Str(year, month, day),
					count: 0
				}, () => {
					this.close(this.props.callback.bind(this, {
						start: this.state.start,
						end: this.date2Str(year, month, day)
					}))
				})
			}
		}
		
		
		
	}
	date2Str(year, month, day) {
		const m = month > 9 ? month : '0' + month
		const d = day > 9 ? day : '0' + day
		return year + '-' + m + '-' + d
	}
	back() {
		this.close(this.props.callback.bind(this, {
			start: this.state.start,
			end: this.state.end
		}))
	}
	close(fn) {
		this.setState({
			show: false
		})
		if(typeof fn === 'function') {
			fn()
		}
	}
}

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			datepicker: {
				show: false,
				type: 1,
				now: timeFormat(Date.now()),
				start: timeFormat(Date.now()),
				end: timeFormat(Date.now())
			}
		}
	}
	render() {
		const datepicker = this.state.datepicker
		const props = Object.assign(datepicker, {
			months: 12
		})
		const oneway = <ul className="datecont" onClick={this.onewayHandler.bind(this)}>
			<li>
				{time2md(datepicker.start)}
				<span>{time2w(datepicker.start)}</span>
			</li>
		</ul>
		const ply = <ul className="datecont" onClick={this.plyHandler.bind(this)}>
			<li>
				{time2md(datepicker.start)}
				<span>{time2w(datepicker.start)}</span>
			</li>
			<li>
				{time2md(datepicker.end)}
				<span>{time2w(datepicker.end)}</span>
			</li>
		</ul>
		const tab = {
			title: ['单程', '往返'],
			cont: [oneway, ply]
		}
		return (
			<Layout name="DatePicker">
				<div className="datepickerdemo">
					<TabBox {...tab} />
				</div>
				<DatePickerBox {...props} callback={this.callback.bind(this)} />
			</Layout>
		)
	}
	onewayHandler() {
		this.setState({
			datepicker: {
				show: true,
				type: 1,
				now: timeFormat(Date.now()),
				start: this.state.datepicker.start,
				end: this.state.datepicker.end
			}
		})
	}
	plyHandler() {
		this.setState({
			datepicker: {
				show: true,
				type: 2,
				now: timeFormat(Date.now()),
				start: this.state.datepicker.start,
				end: this.state.datepicker.end
			}
		})
	}
	callback(date) {
		console.log(date)
		this.setState({
			datepicker: {
				show: false,
				start: date.start,
				end: date.end
			}
		})
	}
}