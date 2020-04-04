import { baseUrl,baseAuthenUrl } from './env'
import * as mutil from './mUtils'
import * as constants from './constants'
import  myvue from '../main'
export default async(url = '', data = {}, type = 'GET', method = 'fetch',header={},server='yewu') => {

	type = type.toUpperCase();

	if(server == 'authen'){
    url = baseAuthenUrl + url;
  }else{
    url = baseUrl + url;
  }
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'omit',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
        'Authorization':mutil.getStore(constants.TOKEN)

			},
			mode: "cors",
			cache: "default"
		}
    Object.keys(header).forEach(key => {
      requestConfig.headers[key]=header[key];
    })


		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}

		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			if(responseJson.status==-1&&
        responseJson.msg=='请重新登录'){
        myvue.$router.push('/login')

      }
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);

      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.setRequestHeader("Authorization",mutil.getStore(constants.TOKEN));
      Object.keys(header).forEach(key => {
        requestObj.setRequestHeader(key, header[key]);
      })

			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}

