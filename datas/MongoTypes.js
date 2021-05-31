const ConnectionType = require('./ConnectionTypes');

const UnRequiredString = {
    required: false,
    type: String
}

const RequiredString = {
    required: true,
    type: String
}

const RequiredUniqueString = {
    required: true,
    type: String,
    unique: true
}

const RequireConnectionType = {
    required: true,
    type: ConnectionType
}

const RequiredBoolean = {
    required: true,
    type: Boolean
}

module.exports = { UnRequiredString, RequiredString, RequiredUniqueString, RequireConnectionType, RequiredBoolean}
