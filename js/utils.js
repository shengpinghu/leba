var dataUtil = function() {

	_dataUtil = {

		local: {
			getItem: function(key) {

				return localStorage.getItem(key);
			},
			setItem: function(key, value) {

				localStorage.setItem(key, value);
			},
			/**
			 * 获取local数据 返回object 对象
			 * @param {Object} key
			 */
			getItemObj: function(key) {

				return JSON.parse(localStorage.getItem(key));

			},
			/**
			 * 设置local 数据，value 类型为 object
			 * @param {String} key
			 * @param {Object} value
			 */
			setItemObj: function(key, value) {

				localStorage.setItem(key, JSON.stringify(value));
			},
			removeItem: function(key) {

				localStorage.removeItem(key);
			},
			clear: function() {
				localStorage.clear();

			}
		},

		session: {

			getItem: function(key) {

				return sessionStorage.getItem(key);
			},
			setItem: function(key, value) {

				sessionStorage.setItem(key, value);
			},
			/**
			 * 获取session数据 返回object 对象
			 * @param {Object} key
			 */
			getItemObj: function(key) {

				return JSON.parse(sessionStorage.getItem(key));

			},
			/**
			 * 设置session 数据，value 类型为 object
			 * @param {String} key
			 * @param {Object} value
			 */
			setItemObj: function(key, value) {

				sessionStorage.setItem(key, JSON.stringify(value));
			},
			removeItem: function(key) {
				sessionStorage.removeItem(key);
			},
			clear: function() {
				sessionStorage.clear();

			}

		}

	};

	return _dataUtil;

}

var getUserInfo = function() {
	return dataUtil().local.getItemObj('userInfo')
}

var setUserInfo = function(obj) {
	dataUtil().local.setItemObj('userInfo', obj)
}

const baseUrl = 'http://23.83.233.91:8321/';
// const baseUrl = '/apis/';
var httpRequest = function(option) {
	const data = getUserInfo();
	return new Promise((resolve, reject) => {
		mui.ajax({
			url: baseUrl + option.url,
			type: option.type || 'GET',
			data: option.data || '',
			contentType: 'application/json',
			headers: {
				"token": data && data.token || ''
			},
			success: function(res) {
				if (res.status === 0) {
					resolve(res)
				} else {
					reject(res)
				}
			},
			error: function(err) {
				reject(err)
			}
		})
	})
}

var getUserAccount = function() {
	return new Promise((resolve, reject) => {
		httpRequest({
			url: 'api/user',
			type: 'GET'
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err);
		})
	})
}
