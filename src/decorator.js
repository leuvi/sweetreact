export let timeNow = (time) => {
	return `${time.getHours()}时${time.getMinutes()}分${time.getSeconds()}秒`
}

//操作日志
export function log(target, name, descriptor) {
	const fn = descriptor.value
	return {
		...descriptor,
		value() {
			console.log(`%c${timeNow(new Date())} %c执行了${name}操作`, 'color: red', 'color: #333')
			return fn.apply(this, arguments)
		}
	}
}

//任务耗时
export function time(target, name, descriptor) {
	const fn = descriptor.value
	return {
		...descriptor,
		value(...args) {
			console.time('任务耗时')
			const result = fn.apply(this, args)
			console.timeEnd('任务耗时')
			return result
		}
	}
}

//防抖
export function debounce(wait = 300, immediate = false) {
	return (target, name, descriptor) => {
		const fn = descriptor.value
		let timeout
		return {
			...descriptor,
			value(...args) {
				const callNow = immediate && !timeout
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					timeout = null
					if(!immediate) {
						fn.apply(this, [...args])
					}
				}, wait)
				if(callNow) {
					fn.apply(this, [...args])
				}
			}
		}
	}
}