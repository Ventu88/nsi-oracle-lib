require("dotenv").config();
const async = require("async");
const connectionGetter = require("./connection");
const querier = require("./queries");
const invoker = require("./procedures");

function getAllFromTable(table, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                querier.selectAllFromTable(
                    connection,
                    table,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function getNullFieldFromTable(field, table, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                querier.selectNullFieldFromTable(
                    connection,
                    field,
                    table,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function getSingleFieldEqualsValueFromTable(field, value, table, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                querier.selectSingleFieldEqualsValueFromTable(
                    connection,
                    field,
                    value,
                    table,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function getSingleFieldStartWithValueFromTable(field, value, table, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                querier.selectSingleFieldLikeValueFromTable(
                    connection,
                    field,
                    value + "%",
                    table,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function getSingleFieldLikeValueFromTable(field, value, table, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                querier.selectSingleFieldLikeValueFromTable(
                    connection,
                    field,
                    value,
                    table,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function getDoubleFieldEqualsValueFromTable(field1, value1, field2, value2, table, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                querier.selectDoubleFieldEqualsValueFromTable(
                    connection,
                    field1,
                    value1,
                    field2,
                    value2,
                    table,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function getYesterdayFieldFromTable(field, table, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                querier.selectYesterdayFieldFromTable(
                    connection,
                    field,
                    table,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function callProcedure(name, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                invoker.procedure(
                    connection,
                    name,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function callOneParamProcedure(name, param, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                invoker.oneParamProcedure(
                    connection,
                    name,
                    param,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function callTwoParamProcedure(name, param1, param2, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                invoker.twoParamProcedure(
                    connection,
                    name,
                    param1,
                    param2,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

function logError(source, message, callback) {
    logSomething(
        source,
        `ERROR: ${message}`,
        (err, result) => callback(err, result)
    );
}

function logWarning(source, message, callback) {
    logSomething(
        source,
        `WARNING: ${message}`,
        (err, result) => callback(err, result)
    );
}

function logInfo(source, message, callback) {
    logSomething(
        source,
        `INFO: ${message}`,
        (err, result) => callback(err, result)
    );
}

function logSomething(source, message, callback) {
    async.waterfall([
            connectionGetter.getConnection,
            (connection, callback) => {
                invoker.twoParamProcedure(
                    connection,
                    process.env.LOG_PROCEDURE,
                    source,
                    message,
                    (err, result) => callback(err, result)
                );
            }
        ],(err, result) => {
            callback(err, result)
        }
    );
}

module.exports.getAllFromTable = getAllFromTable;
module.exports.getNullFieldFromTable = getNullFieldFromTable;
module.exports.getSingleFieldEqualsValueFromTable = getSingleFieldEqualsValueFromTable;
module.exports.getSingleFieldStartWithValueFromTable = getSingleFieldStartWithValueFromTable;
module.exports.getSingleFieldLikeValueFromTable = getSingleFieldLikeValueFromTable;
module.exports.getDoubleFieldEqualsValueFromTable = getDoubleFieldEqualsValueFromTable;
module.exports.getYesterdayFieldFromTable = getYesterdayFieldFromTable;
module.exports.callProcedure = callProcedure;
module.exports.callOneParamProcedure = callOneParamProcedure;
module.exports.callTwoParamProcedure = callTwoParamProcedure;
if(process.env.LOG_PROCEDURE) {
    module.exports.logError = logError;
    module.exports.logWarning = logWarning;
    module.exports.logInfo = logInfo;
}
