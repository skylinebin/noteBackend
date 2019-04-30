/*****
 * 
 * 请求笔记相关的接口
 * 
 * ***** */

const mysql = require('mysql');
// 引入配置文件
const config = require('../config');
//定义mysql所需对象
const mysqlurl = {
    host: `${config.mysqlHost}`,
    user: `${config.mysqlUser}`,
    password: `${config.mysqlPass}`,
    database: `${config.mysqlDb}`
};


//定义一个全局变量用以存放数据库返回的结果
var listdata;
//封装形成接口
module.exports = class BaseFun {

    /***
     * 插入一条新的笔记记录
     * 成功后返回所有列表数据
     */
    static addnewRecord(noterecord, callback) {
        //函数作用域
        const that = this;
        const connection = mysql.createConnection(mysqlurl);
        //执行连接数据库
        connection.connect();
        const addsql = 'insert into note(id,note,time,backup) values(0,?,?,?)';
        connection.query(addsql, noterecord, function (err, result) {
            if (err) throw err;
            if (result.serverStatus == 2 && result.affectedRows == 1) {
                // listdata = result;
                connection.end();
                // 查询新的列表进行返回
                that.getNotelist(function (getlistresult) {
                    callback(getlistresult);
                })
            } else {
                connection.end();
                callback('');
            }
        });

    }



    /**
     * 
     * 查看所有笔记记录
     * 
     */
    static getNotelist(callback) {

        const connection = mysql.createConnection(mysqlurl);
        connection.connect();
        const listsql = 'select * from note order by time desc';
        connection.query(listsql, function (err, result) {
            if (err) throw err;
            listdata = result;
            connection.end();
            callback(listdata);
        });
        // return applistdata;
    }



    /****
     * 
     * 修改一条笔记记录
     * 修改成功后返回所有列表数据
     * 
     */
    static updateoneRecord(updatenoterecord, callback) {
        const that = this;
        const connection = mysql.createConnection(mysqlurl);
        connection.connect();
        let tempid = updatenoterecord.id;

        // 可以先查询当前记录ID是否存在，再更新，也可以直接写
        const updatesql = 'update note set note = ?, time = ? ,backup = ? where id = ?';
        const newnoterecord = [updatenoterecord.note, updatenoterecord.time, updatenoterecord.backup, updatenoterecord.id];
        connection.query(updatesql, newnoterecord, function (err, result) {
            if (err) throw err;
            if (result.serverStatus == 2 && result.affectedRows == 1) {
                // listdata = result;
                connection.end();
                // 查询新的列表进行返回
                that.getNotelist(function (getlistresult) {
                    callback(getlistresult);
                })
            } else {
                connection.end();
                callback('');
            }
        });

    }



    /**
     * 
     * 删除一条记录
     * 删除成功后返回所有列表数据
     * 
     */

    static deleteRecord(recordid, callback) {
        const that = this;
        const connection = mysql.createConnection(mysqlurl);
        connection.connect();
        const deletesql = 'delete from note where id = ?';
        connection.query(deletesql, recordid, function (err, result) {
            if (err) throw err;
            if (result.serverStatus == 2) {
                // listdata = result;
                connection.end();
                // 查询新的列表进行返回
                that.getNotelist(function (getlistresult) {
                    callback(getlistresult);
                })
            } else {
                connection.end();
                callback('');
            }
        });
    }


    /****
     * 
     * 查询当前数据库总记录数
     * 
     */
    static getNoteCount(callback) {
        const connection = mysql.createConnection(mysqlurl);
        connection.connect();
        const countsql = 'select count(1) from note';
        connection.query(countsql, function (err, result) {
            if (err) throw err;
            listdata = result;
            //将count(1)变成JS里的合法语句
            if (result[0]['count(1)']) {
                listdata = {
                    'records': result[0]['count(1)']
                };
            }
            connection.end();
            callback(listdata);
        });
    }


    /****
     * 
     * 关键词模糊查询数据库记录
     * 
     * 
     */
    static findRecords(keyword, callback) {
        keyword = '%' + keyword + '%';
        // 添加模糊的标准，左右任意字符
        const keywords = [keyword, keyword, keyword, keyword];
        const connection = mysql.createConnection(mysqlurl);
        connection.connect();
        const keysql = 'select * from note where id like ? or note like ? or time like ? or backup like ?';
        connection.query(keysql, keywords, function (err, result) {
            if (err) throw err;
            listdata = result;
            connection.end();
            callback(listdata);
        });
    }

}
