import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { WhcRequestInterceptors, WhcRequestConfig } from './type'

const DEFAULT_LOADING = true

class WhcRequest {
  instance: AxiosInstance
  interceptors?: WhcRequestInterceptors
  showLoading = true

  constructor(config: WhcRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用拦截器
    // 1. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor, //这里报错解决了
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求成功拦截')
        if (this.showLoading) {
          console.log('执行loading')
        }

        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应成功拦截')
        if (this.showLoading) {
          console.log('loading关闭')
        }
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败～，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败拦截')
        //例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误～')
        }
        return err
      }
    )
  }

  request<T>(config: WhcRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(
          config as InternalAxiosRequestConfig
        ) //这个as是我自己加的
      }

      //判断是否需要显示laoding
      if (config.showLoading === false) {
        this.showLoading = false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res) //有问题，先注释掉
          }

          // 2. 再将showLoading再设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3. 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          //再将showLoading再设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: WhcRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: WhcRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  DELETE<T>(config: WhcRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: WhcRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default WhcRequest
