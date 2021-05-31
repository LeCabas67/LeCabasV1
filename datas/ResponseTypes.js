class Data {
    constructor(datas = undefined) {
        this.data = datas;
        this.success = true;
    }
}

class Error {
    constructor(error) {
        this.error = error;
        this.success = false;
    }
}

module.exports = { Data, Error } ;
