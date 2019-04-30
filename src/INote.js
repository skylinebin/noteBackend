/**
 * 
 * 提供笔记的数据格式
 * 
 * **/

module.exports = class INote {

    // 使用对象的形式封装嵌套的json
    constructor(id, note, time, backup) {
        this.id = id;
        this.node = note;
        this.time = time;
        this.backup = backup;
    }
}