import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios'

// export interface WhcRequestInterceptors extends InternalAxiosRequestConfig {
//   abc: 1
// }
export interface WhcRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T //responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
type Milliseconds = number

export interface WhcRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: WhcRequestInterceptors<T>
  showLoading?: boolean
}
