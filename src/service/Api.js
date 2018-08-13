import { isFunction } from 'lodash';

// async function
export async function asyncFetchAll(url, callback) {
  let data = [];
  while(url!==null){
    let response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.status)
    }
    let json = await response.json();
    url = json.next;
    json.results.map( row => {
      return data.push(row);
    })
  }
	if(isFunction(callback)){
		callback(data);
	}
  return data;
}

export async function fetchAll(url, callback) {
	return new Promise((resolve, reject) => {
		try{
			asyncFetchAll(url, data => {resolve(data)})
		} catch(error){
			reject(error)
		}
	})
}
