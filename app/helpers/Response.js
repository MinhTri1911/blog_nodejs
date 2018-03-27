module.exports = {
    returnSuccess(message, data) {
        return {
            message: message,
            data: data
        }
    },

	returnSuccess(data) {
		return {
			data: data
		}
    },

    render(res, path) {
        return res.status(200).render(path)
    },

    returnError(message, code) {
        return {
            error: {
                message: message,
                code: code
            }
        }
    }
}
