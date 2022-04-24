<template>
  <div>
    <header>
      <el-button type="primary" @click="dialogVisible = true"
        >添加用户</el-button
      >
    </header>
    <el-table :data="tableList" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="email" label="密码" width="180" />
      <el-table-column prop="user_level" label="用户等级" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDeleteUser(scope.row)"
            >Delete</el-button
          >
          <!-- <el-popconfirm title="确定要删除该用户吗?">
            <template #reference>
              <el-button
                size="small"
                type="danger"
                @click="handleDeleteUser(scope.row)"
                >Delete</el-button
              >
            </template>
          </el-popconfirm> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="count"
      @size-change="handleSizeChange"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="添加用户"
    width="30%"
    :before-close="handleClose"
  >
    <div class="dialog-field">
      <span class="dialog-field-label">用户邮箱: </span
      ><el-input type="text" v-model="email" />
    </div>
    <div class="dialog-field">
      <span class="dialog-field-label">用户名称: </span
      ><el-input type="text" v-model="username" />
    </div>
    <div class="dialog-field">
      <span class="dialog-field-label">用户密码: </span
      ><el-input type="password" v-model="password" />
    </div>
    <div class="dialog-field">
      <span class="dialog-field-label">用户等级: </span
      ><el-select
        v-model="userLevel"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="item in UserLevel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleAddUser">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { ElMessageBox } from "element-plus";
import {
  provideApolloClient,
  useMutation,
  useQuery,
  useResult,
} from "@vue/apollo-composable";
import gql from "graphql-tag";

const dialogVisible = ref(false);

const tableList = ref([]);

const username = ref("");
const password = ref("");
const email = ref("");
const userLevel = ref("normal");

const usersOffset = ref(0);
const usersLimit = ref(10);

const currentPage = ref(1);

const count = ref(0);

const selectedEmail = ref('')

const handleCurrentChange = (index: number) => {
  console.log(index);
  usersOffset.value = (index - 1) * 10;
  currentPage.value = index;
  refetch();
};

  const { mutate: deleteUserMutate } = useMutation(
    gql`
      mutation removeUser($email: String!) {
        removeUser(deleteUserInput: { email: $email }) {
          email
          username
        }
      }
    `
  );

const handleSizeChange = () => {};

const { result, refetch } = useQuery(
  gql`
    query getUsers($offset: Int!, $limit: Int!) {
      getUsers(queryUsersInput: { offset: $offset, limit: $limit }) {
        count
        list {
          username
          email
          user_level
        }
      }
    }
  `,
  () => ({
    offset: usersOffset.value,
    limit: usersLimit.value,
  })
);

const list = useResult(result, null, (data) => data.getUsers.list);

const usersCount = useResult(result, null, (data) => data.getUsers.count);

onMounted(async () => {});

watch(list, (newVal) => {
  tableList.value = newVal as [];
});

watch(usersCount, (newVal) => {
  count.value = newVal as any;
});

const { mutate: createUserMutate } = useMutation(
  gql`
    mutation createUser(
      $username: String!
      $password: String!
      $email: String!
      $user_level: String
    ) {
      createUser(
        newUserInput: {
          email: $email
          password: $password
          username: $username
          user_level: $user_level
        }
      ) {
        email
        username
      }
    }
  `,
  () => ({
    variables: {
      username: username.value,
      password: password.value,
      email: email.value,
      user_level: userLevel.value,
    },
  })
);

const UserLevel = [
  {
    value: "manager",
    label: "管理员",
  },
  {
    value: "normal",
    label: "普通用户",
  },
  {
    value: "visitor",
    label: "游客",
  },
];

const handleAddUser = async () => {
  const result = await createUserMutate();
  refetch();
  dialogVisible.value = false;
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const handleDeleteUser = (row: any) => {
  deleteUserMutate({
    email: row.email
  }).then(() => {
    refetch()
  })

};
</script>

<style scoped>
.dialog-field {
  display: flex;
  margin-bottom: 1rem;
}

.dialog-field-label {
  white-space: no-wrap;
}
</style>
