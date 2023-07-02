export default class UserInfo {
    constructor(info){
        this._name = document.querySelector(info.selectorName);
        this._job = document.querySelector(info.selectorJob);
        this._photo = document.querySelector(info.selectorPhoto);
    }
    getUserInfo () {
        return {name: this._name.textContent, job: this._job.textContent};
    }
    setUserInfo ({name, job, photo}) {
        this._name.textContent = name;
        this._job.textContent = job;
        this._photo.src = photo;/////////////////////////////////////////////////////////
    }
};