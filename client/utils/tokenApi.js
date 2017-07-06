import request from 'superagent'
import AuthService from './auth0'

const baseUrl = '/api/v1'

export default function consume (method = 'get', endpoint, data = {}) {
  const dataMethod = method.toLowerCase() === 'get' && 'query' || 'send'
  const token = AuthService.getToken()
  const headers = {
    Accept: 'application/json'
  }
  if (AuthService.loggedIn()) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return request[method](baseUrl + endpoint)
    .set(headers)[dataMethod](data)
    .then(res => {
      return res
    })
}

export function uploadImage (files, callback) {
  request.post('https://api.cloudinary.com/v1_1/dnyp01dqk/upload')
    .field('upload_preset', process.env.PRESET)
    .field('file', files)
    .end((err, res) => {
      if (err) {
        callback(err)
      } else if (res.body.secure_url !== '') {
        callback(null, res.body.secure_url)
      }
    })
}
