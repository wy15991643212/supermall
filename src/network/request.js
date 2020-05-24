import axios from 'axios'
export function request(config){
    //创建axios实例
    const request1 = axios.create({
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000
    })

    // axios的拦截器  一般使用axios实例.interceptros.request.use()，不会去使用全局的axios
    request1.interceptors.request.use( config => {
        // console.log(config); 
        //    请求成功    
        return config;
    }, err => {
        //请求失败 
        // console.log(err);
        return err
    })
    // 响应拦截
    request1.interceptors.response.use( res => {
        //响应成功
        // console.log(res);
        //我们一般只需要用到请求结果里的data信息
        return res.data;
    }, err => {
        //响应失败
        // console.log(err)
        return err
    })
    // 发送网络请求
    return request1(config)
}