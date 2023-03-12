<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="name">
        <el-input v-model="phone.name" />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <el-input v-model="phone.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      password: ''
    })

    //编写规则

    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.login-phone {
  margin-top: 15px;
}
</style>
