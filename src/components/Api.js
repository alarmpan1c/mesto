export default class Api {
  constructor (options) {

      this._url = options.baseUrl;
      this._headers = options.headers;
      this._token = options.headers.authorization;
  }

  getInfo(){
      return fetch(`${this._url}/users/me`, {
         headers: {
             authorization:  this._token
         }
      }).then((res) => {
        return  this._checkResponse(res)
        })}

      _checkResponse(res){
        if(res.ok) {
          return res.json();
        } else {
        return Promise.reject(`${res.status}`);
        }
      }

   getPicture(){
       return fetch(`${this._url}/cards`, {
          headers: {
              authorization:  this._token
          }
       })
      .then((res) => {
      return  this._checkResponse(res)
      })
  }
  addHeartonServer(infoforServer){
      return fetch(`${this._url}/cards/${infoforServer}/likes`, {
          method: 'PUT',
           headers: {
               authorization: this._token,
               'Content-Type': 'application/json'
             },
        })
        .then((res) => {
          return  this._checkResponse(res)
          })
  }
  eraseHeartonServer(infoforServer){
      return fetch(`${this._url}/cards/${infoforServer}/likes`, {
          method: 'DELETE',
           headers: {
               authorization: this._token,
               'Content-Type': 'application/json'
             },
        })
        .then((res) => {
          return  this._checkResponse(res)
          })
  }
  setInfoonServer(infoforServer){
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
           headers: {
               authorization: this._token,
               'Content-Type': 'application/json'
             },
          body: JSON.stringify({
            name: infoforServer.name,
            about: infoforServer.job
          })
        })
        .then((res) => {
          return  this._checkResponse(res)
          })
  }
  setAvataronServer(infoforServer){
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
           headers: {
               authorization: this._token,
               'Content-Type': 'application/json'
             },
          body: JSON.stringify({
            avatar: infoforServer.avatar,
          })
        })
        .then((res) => {
          return  this._checkResponse(res)
          })
  }
  eraseCardonServer(infoforServer){
      return fetch(`${this._url}/cards/${infoforServer}`, {
          method: 'DELETE',
           headers: {
               authorization: this._token,
               'Content-Type': 'application/json'
             },
        })
        .then((res) => {
          return  this._checkResponse(res)
          })
  }
  addCardonServer(infoforServer){
      return fetch(`${this._url}/cards`, {
          method: 'POST',
           headers: {
               authorization: this._token,
               'Content-Type': 'application/json'
             },
          body: JSON.stringify({
            name: infoforServer.place,
            link: infoforServer.link
          })
        })
        .then((res) => {
          return  this._checkResponse(res)
          })
  }
  

}