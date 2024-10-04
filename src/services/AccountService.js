import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {

  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  /*** @param {{ id: any; email: any; name: any; picture: any; bio: any; }} accountData*/
  async updateAccount(accountData) {
    const response = await api.put('/account', accountData)
    logger.log('UPDATED ACCCOUNT', response.data)
    const updatedAccount = new Account(response.data)
    AppState.account = updatedAccount
    AppState.profile = updatedAccount
    AppState.blogs.forEach(blog => blog.creator = updatedAccount)
  }
}

export const accountService = new AccountService()
