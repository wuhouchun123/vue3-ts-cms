export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容',
      triggle: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字',
      triggle: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容',
      triggle: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的个字母或者数字',
      triggle: 'blur'
    }
  ]
}
