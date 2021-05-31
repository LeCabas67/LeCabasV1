const createModelOptions = (type, required = false, unique = false, ref = undefined) => {
    let obj =  {type: type, required: required, unique: unique};
    if (ref)
        obj['ref'] = ref;
    return obj;
}

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = { createModelOptions, ObjectId};
