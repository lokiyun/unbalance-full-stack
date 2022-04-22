<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { FetchResult } from '@apollo/client/core';
import { useRouter } from 'vue-router'

const username = ref('')

const password = ref('')

const router = useRouter()

const { mutate: loginResult } = useMutation(gql`
  mutation login($username: String, $password: String!) {
    login(loginInput: { email: $username, password: $password }) {
      email
      username
      token
    }
  }
`, () => ({
  variables: {
    username: username.value,
    password: password.value
  }
})) 

const handlelogin = async () => {
  const result: FetchResult<any, Record<string, any>, Record<string, any>> | null = await loginResult()
  if (result?.data) {
    localStorage.setItem('token', result.data.login.token)
    router.push('/')
  }
}

</script>

<template>
  <div class="login">
    <div class="login-control">
      登录界面
    </div>
    <div class="login-control">
      <el-input v-model="username" placeholder="请输入用户名或邮箱" />
    </div>
    <div class="login-control">
      <el-input type="password" show-password v-model="password" placeholder="请输入密码" />
    </div>
    <div class="login-control login-btn">
      <el-button type="primary" @click="handlelogin">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login-control {
  min-width: 300px;
  max-width: 600px;
  margin-bottom: 2rem;
}

.login-btn {
  min-width: 300px;
  max-width: 600px;
}

.login-btn button {
  width: 100%;
}
</style>
