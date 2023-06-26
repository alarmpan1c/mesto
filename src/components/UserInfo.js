export default class UserInfo {
    constructor(info){
        this._name = document.querySelector(info.selectorName);
        this._job = document.querySelector(info.selectorJob);
    }
    getUserInfo () {
        return {name: this._name.textContent, job: this._job.textContent};
    }
    setUserInfo (data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }
};