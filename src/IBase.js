/*******
 * 
 * 提供返回json的接口
 * 
 * 
 * ****** */

module.exports = class IBase {

    //  正常状态的json封装
    // 使用对象的形式封装嵌套的json
    constructor(messages, success, result) {
        this.message = messages;
        this.success = success;
        this.result = result;
    }
}