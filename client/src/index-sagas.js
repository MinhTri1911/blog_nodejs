import Api from './api/request'
import LoginSaga from './pages/auth/login/sagas'

const IndexSagas = function* (){
    yield [
		LoginSaga(),
    ]
}

export default IndexSagas
