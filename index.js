// HTTP 模块同时支持 Express 和 WebSocket
const http = require('http');
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');

const path = require('path');

// 引入配置文件
const config = require('./config');

// 引入集成方法的接口
const BaseFun = require('./src/BaseFun');


// 引入返回 json 信息的格式化接口
const Ibase = require('./src/IBase');

// 引入封装 note 的数据格式
const INote = require('./src/INote');

// 创建一个 express 实例
const app = express();



// 实现获取所有notes信息
app.use('/getnotelist', (request, response, next) => {

    BaseFun.getNotelist(function (getlistresult) {
        if (getlistresult != '') {
            // console.log('getalldatas:', getlistresult);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            // 用于格式化返回数据，便于前端处理请求
            var backdatas = new Ibase("正常：操作成功!", true, getlistresult);
            response.end(JSON.stringify(backdatas));
        } else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatasfail = new Ibase("异常：操作失败!", true, null);
            response.end(JSON.stringify(backdatasfail));
        }
    })
});
// test getnotelist string
// http://localhost:8888/getnotelist



// 添加一条note信息
app.use('/addonenote', (request, response, next) => {
    //从前端获取的参数
    var note = String(request.query.note);
    var time = String(request.query.time);
    var backup = String(request.query.backup);
    //将整体作为参数传入方法
    var onenoterecord = [note, time, backup];
    BaseFun.addnewRecord(onenoterecord, function (addrecord) {
        if (addrecord != '') {
            // console.log('getalldatas:', addrecord);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            // 用于格式化返回数据，便于前端处理请求
            var backdatas = new Ibase("正常：操作成功!", true, addrecord);
            response.end(JSON.stringify(backdatas));
        } else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatasfail = new Ibase("异常：操作失败!", false, null);
            response.end(JSON.stringify(backdatasfail));
        }
    });
})
// test add string




// 修改一条笔记信息 通过 ID 确认修改
app.use('/updateonenote', (request, response, next) => {
    var noteid = String(request.query.id);
    var note = String(request.query.note);
    var time = String(request.query.time);
    var backup = String(request.query.backup);
    var updatenoterecord = new INote(noteid, note, time, backup);
    BaseFun.updateoneRecord(updatenoterecord, function (updaterecord) {
        if (updaterecord != '') {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatas = new Ibase("正常：操作成功!", true, updaterecord);
            response.end(JSON.stringify(backdatas));
        } else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatasfail = new Ibase("异常：操作失败!", false, null);
            response.end(JSON.stringify(backdatasfail));
        }
    });
})

// test string





// 删除一条笔记记录
app.use('/deleteonenote', (request, response, next) => {
    var numid = String(request.query.id);
    var controlcode = String(request.query.code);
    var onenumid = [numid];
    BaseFun.deleteRecord(onenumid, function (deleterecord) {
        if (deleterecord != '') {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatas = new Ibase("正常：操作成功!", true, deleterecord);
            response.end(JSON.stringify(backdatas));
        } else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatasfail = new Ibase("异常：操作失败!", false, null);
            response.end(JSON.stringify(backdatasfail));
        }
    });
})
// 测试删除记录
// http://localhost:8888/deleteonenote?id=4



// 查询当前笔记总数量
app.use('/getlistcount', (request, response, next) => {

    BaseFun.getNoteCount(function (getcountresult) {
        if (getcountresult != '') {
            // console.log('getalldatas:', getcountresult);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatas = new Ibase("正常：操作成功!", true, getcountresult);
            response.end(JSON.stringify(backdatas));
        } else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatasfail = new Ibase("异常：操作失败!", true, null);
            response.end(JSON.stringify(backdatasfail));
        }
    })
});

// 模糊查找相关信息  
app.use('/findrecords', (request, response, next) => {
    var keywords = String(request.query.keywords);

    console.log('this keywords is :' + keywords);
    BaseFun.findRecords(keywords, function (findrecord) {
        if (findrecord != '') {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatas = new Ibase("正常：操作成功!", true, findrecord);
            response.end(JSON.stringify(backdatas));
        } else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            var backdatasfail = new Ibase("未检索到匹配项!", false, null);
            response.end(JSON.stringify(backdatasfail));
        }
    });
})



// 测试接口数据
app.use('/hello', (request, response, next) => {
    response.write("hello from server!");
    response.end();

});

// 设置静态资源文件访问
app.use(express.static(path.join(__dirname, 'public')))


// 创建 HTTP Server 而不是直接使用 express 监听
const server = http.createServer(app);


// 启动 HTTP 服务
server.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);