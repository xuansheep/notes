import axios from 'axios'
import qs from 'qs'
import {Message} from 'view-design'


const TIME_OUT_MS = 20 * 1000; // 默认请求超时时间

/*
 * @param response 返回数据列表
 */
function handleResults (response) {
    let remoteResponse = response.data;
    return remoteResponse.data;
}

function handleUrl (url) {
    return url
}

/*
 * @param data 参数列表
 * @return
 */
function handleParams (data) {
    return data
}

function handleParamsUpload(data) {
    let params = new FormData();
    params.append('file',data);
    return params;
}

function getBearer (){
    let bearer = window.localStorage.getItem('bearer');
    return bearer;
}

export default {

    serverUrl:'https://notes.xuanss.com',
    webSocketUrl:'ws://notes.xuanss.com',
    // serverUrl:'http://127.0.0.1:10001',
    // webSocketUrl: 'ws://127.0.0.1:10001',


    /*
     * @param url
     * @param data
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    post (url, data, response, exception) {
        axios({
            method: 'post',
            url: this.serverUrl+url,
            data: handleParams(data),
            timeout: TIME_OUT_MS,
            transformRequest:[data => qs.stringify(data)],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': getBearer()
            }
        }).then(
            (result) => {
                // console.log(url,result.data);
                if (result.data.success) {
                    response(handleResults(result))
                }else {
                    let msg = !!result.data.message ? result.data.message : "服务器错误";
                    Message.error(msg);
                    if (result.data.code === 400004) {
                        window.location.href = '/';
                        window.localStorage.removeItem('user');
                    }
                    exception(result.data);
                }
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
                if (!!error.response && error.response.status === 502) {
                    Message.error('无法连接到服务器~');
                }
            }
        )
    },

    postJson (url, data, response, exception) {
        axios({
            method: 'post',
            url: this.serverUrl+url,
            data: handleParams(data),
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': getBearer(),
            }
        }).then(
            (result) => {
                console.log(url,result.data);
                if (result.data.success) {
                    response(handleResults(result))
                }else {
                    let msg = !!result.data.message ? result.data.message : "服务器错误";
                    Message.error(msg);
                    if (result.data.code === 400004) {
                        window.location.href = '/';
                        window.localStorage.removeItem('user');
                    }
                    exception(result.data);
                }
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
                if (!!error.response && error.response.status === 502) {
                    Message.error('无法连接到服务器~');
                }
            }
        )
    },

    /*
     * get 请求
     * @param url
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    get (url, response, exception) {
        axios({
            method: 'get',
            url: this.serverUrl + url,
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(
            (result) => {
                response(handleResults(result))
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
                if (!!error.response && error.response.status === 502) {
                    Message.error('无法连接到服务器~');
                }
            }
        )
    },
    /*
     * 导入文件
     * @param url
     * @param data
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    uploadFile (url, data, response, exception) {
        axios({
            method: 'post',
            url: this.serverUrl + url,
            data: handleParams(data),
            dataType: 'json',
            processData: false,
            contentType: false
        }).then(
            (result) => {
                response(handleResults(result, data))
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
                if (!!error.response && error.response.status === 502) {
                    Message.error('无法连接到服务器~');
                }
            }
        )
    },
    /*
     * 下载文件用，导出 Excel 表格可以用这个方法
     * @param url
     * @param param
     * @param fileName 如果是导出 Excel 表格文件名后缀最好用.xls 而不是.xlsx，否则文件可能会因为格式错误导致无法打开
     * @param exception 异常的回调函数
     */
    downloadFile (url, data, fileName, exception) {
        axios({
            method: 'post',
            url: this.serverUrl + url,
            data: handleParams(data),
            responseType: 'blob'
        }).then(
            (result) => {
                const excelBlob = result.data
                if ('msSaveOrOpenBlob' in navigator) {
                    // Microsoft Edge and Microsoft Internet Explorer 10-11
                    window.navigator.msSaveOrOpenBlob(excelBlob, fileName)
                } else {
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    const blob = new Blob([excelBlob])
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    document.body.removeChild(elink)
                }
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
                if (!!error.response && error.response.status === 502) {
                    Message.error('无法连接到服务器~');
                }
            }
        )
    },
    uploadFileFormData (url, data, response, exception) {
        axios({
            method: 'post',
            url: this.serverUrl + url,
            data: handleParamsUpload(data),
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'multipart/form-data; boundary='+123,
                'Authorization': getBearer()
            }
        }).then(
            (result) => {
                console.log(url,result.data);
                if (result.data.success) {
                    response(handleResults(result))
                }else {
                    Message.error(result.data.message);
                    exception(result.data);
                }
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
                if (!!error.response && error.response.status === 502) {
                    Message.error('无法连接到服务器~');
                }
            }
        )
    }
}