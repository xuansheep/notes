import axios from 'axios'
import qs from 'qs'
import {Message} from 'iview'
import 'iview/dist/styles/iview.css'


const TIME_OUT_MS = 60 * 1000; // 默认请求超时时间

/*
 * @param response 返回数据列表
 */
function handleResults (response) {
    let remoteResponse = response.data;
    return remoteResponse.data;
}

function handleUrl (url) {
    url = 'http://127.0.0.1:10001'+url;
// BASE_URL是接口的ip前缀，比如http:10.100.1.1:8989/
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

function getToken (){
    let user = JSON.parse(window.localStorage.getItem('user'));
    if (!!user){
        return user.token;
    }
    return '';
}

export default {
    /*
     * @param url
     * @param data
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    post (url, data, response, exception) {
        axios({
            method: 'post',
            url: handleUrl(url),
            data: handleParams(data),
            timeout: TIME_OUT_MS,
            transformRequest:[data => qs.stringify(data)],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'token': getToken(),
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
                        window.location.href = '/'
                    }
                }
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
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
            url: handleUrl(url),
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
            url: handleUrl(url),
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
            url: handleUrl(url),
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
            }
        )
    },
    uploadFileFormData (url, data, response, exception) {
        axios({
            method: 'post',
            url: handleUrl(url),
            data: handleParamsUpload(data),
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'multipart/form-data; boundary='+123
            }
        }).then(
            (result) => {
                console.log(url,result.data);
                if (result.data.success) {
                    response(handleResults(result))
                }else {
                    Message.error(result.data.message);
                }
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    }
}