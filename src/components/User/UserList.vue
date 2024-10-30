<template>
  <RealList @reach-bottom="getMaxId" :scrollbar="scrollbar" class="user-list">
    <div
      v-for="account in dataList"
      :key="account.id"
      class="user-item"
      @click="goRouter(`/user/${account.acct}`)"
    >
      <UserCard :account="account">
        <div class="avatar">
          <avatar :account="account"></avatar>
        </div>
      </UserCard>
      <UserCard :account="account">
        <div class="userinfo">
          <router-link class="user-name" :to="`/user/${account.acct}`">
            {{ account.display_name }}
          </router-link>
          <router-link class="user-acct" :to="`/user/${account.acct}`">
            {{ account.acct }}
          </router-link>
        </div>
      </UserCard>

      <div class="btn-block">
        <FollowButton
          v-model="account.follower"
          :accountId="account.id"
        ></FollowButton>
      </div>
    </div>
  </RealList>
</template>
<script setup>
import FollowButton from '@/components/Account/FollowButton.vue'
import request from '~/utils/request'
const router = useRouter()
const route = useRoute()
const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})
const dataList = ref([])
const scrollbar = ref(true)
const maxId = ref('')
const getListData = async () => {
  const res = await request(props.url, {
    method: 'get',
    params: maxId.value ? { max_id: maxId.value } : {}
  })
  dataList.value.push(...res.data)
  console.log(`output->res.data`, res.data)
  scrollbar.value = res.data.length >= 30
}
const getMaxId = () => {
  if (dataList.value.length === 0) return
  maxId.value = dataList.value[dataList.value.length - 1].id
}
watch(
  maxId,
  () => {
    console.log(`output->1`, dataList.value.length)
    getListData()
  },
  {
    immediate: true
  }
)

const goRouter = path => {
  router.push(path)
}
</script>
<style lang="scss" scoped>
.user-list {
  .user-item {
    padding: 14px;
    cursor: pointer;
    height: 80px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    &:hover {
      background: var(--color-neutral-2);
      .user-name {
        text-decoration: underline;
      }
    }
    .avatar {
      flex-shrink: 0;
    }
    .user-text {
      display: flex;
      font-weight: bold;
    }
    .btn-block {
      margin-left: auto;
      flex-shrink: 0;
    }
    .userinfo {
      display: flex;
      flex-direction: column;
      flex-shrink: 1;
      min-width: 0;
      .user-name {
        width: 100%;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .user-name,
      .user-acct {
        color: var(--color-neutral-10);
      }
      .user-acct {
        line-height: 1;
      }
    }
  }
}
</style>
