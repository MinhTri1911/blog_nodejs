const domain = 'http://localhost:3000/'
class Request {
    constructor () {
        this.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        }

        if (localStorage.getItem('x-auth')) {
            this.headers['x-auth'] = localStorage.getItem('x-auth')
        }
    }

    async get (url, param) {
        try {
            console.log('here')
            return await fetch(domain + url, {
                method: 'get',
                headers: this.headers,
                body: param
            }).then(res => res.json())
            .then(
                (result) => {
                    return result
                },
                (error) => {
                    throw new Error(error)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async post (url, param) {
        try {
            return await fetch(domain + url, {
                method: 'post',
                headers: this.headers,
                body: JSON.stringify(param)
            })
            .then(res => res.json())
            .then(
                (result) => {
                    return result
                },
                (error) => {
                    throw new Error(error)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export const Api = new Request()
