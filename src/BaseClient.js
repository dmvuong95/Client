import axios from 'axios'
const defaultMethods = ['new', 'edit', 'delete', 'get', 'getAll']

export default class BaseClient {
  constructor ({tableName}) {
    defaultMethods.forEach(method => {
      this[method] = function (data) {
        return new Promise((resolve, reject) => {
          axios.post(`/${tableName}/${method}`, data).then(result => resolve(result.data)).catch(error => reject(error))
        })
      }
    })
  }
}
