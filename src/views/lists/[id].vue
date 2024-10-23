<script setup>
import loadingIcon from '~/components/loadingIcon/index.vue'
import { getlistTweets } from '~/api/lists'
const { t } = useI18n()
const route = useRoute()
import {
  getlistUsers,
  updateList,
  deleteList,
  addListUser,
  getlistDetail,
  deleteListUser
} from '@/api/lists'

const listsInfo = ref(null)
const listsName = computed(() => {
  return listsInfo.value?.title
})
const showHandle = ref(false)
const openHandle = () => {
  showHandle.value = !showHandle.value
}

const state = reactive({
  data: [],
  loading: false,
  maxId: '',
  finished: false,
  limit: 30,
  accountList: [],
  listData: null
})
const getData = async () => {
  state.loading = true
  const getParams = () => {
    if (state.maxId) {
      return {
        max_id: state.maxId,
        limit: state.limit
      }
    }
    return { limit: state.limit }
  }
  const res = await getlistTweets(route.params.id, getParams()).finally(() => {
    state.loading = false
  })
  state.finished = res.data.length < state.limit
  state.data.push(...res.data)
}
const getAccountList = async () => {
  const res = await getlistUsers(route.params.id)
  state.accountList = res.data
}
const getListData = async () => {
  const res = await getlistDetail(route.params.id)
  listsInfo.value = res
  listsName.value = res.title
}
watchEffect(() => {
  state.maxId
  getData()
})
watchEffect(() => {
  getAccountList()
  getListData()
})
const tweetList = computed(() => {
  return state.data || []
})
const getList = () => {
  if (tweetList.value.length > 0) {
    state.maxId = tweetList.value[tweetList.value.length - 1].id
  }
}
const tweetMessagesRef = ref(null)
const onRefresh = async () => {
  // 刷新
  state.maxId = ''
  state.data = []
}

const editSaveLoading = ref(false)
const submitListsName = async () => {
  editSaveLoading.value = true
  await updateList(route.params.id, { title: listsName.value }).finally(() => {
    editSaveLoading.value = false
  })
  listsInfo.value.title = listsName.value
}

import { Message } from '@arco-design/web-vue'
const router = useRouter()
const removeLists = async e => {
  await deleteList(route.params.id)
  Message.success(t('common.deleteSuccess'))
  router.push({ name: 'lists' })
}

const showEditListModal = ref(false)
const editListSearch = ref('')
const editList = e => {
  showEditListModal.value = true
}
import { getHashTagData } from '@/api/search'
import { watchEffect } from 'vue'
const searchUserList = ref([])
const searchBtnLoading = ref(false)
const showSearchDrawer = ref(false)
const onEditListSearch = async () => {
  const query = {
    resolve: true,
    q: editListSearch.value,
    type: 'accounts'
  }
  searchBtnLoading.value = true
  const { data: searchList } = await getHashTagData(query).finally(() => {
    searchBtnLoading.value = false
  })
  showSearchDrawer.value = true
  searchUserList.value = searchList
}

const addUser = async e => {
  const parmas = {
    account_id: e.id
  }
  e._loading = true
  await addListUser(route.params.id, parmas).finally(() => {
    e._loading = false
  })
  state.accountList.push({ account: e })
}
const delUser = async e => {
  e._loading = true
  await deleteListUser(route.params.id, e.account.id).finally(() => {
    e._loading = false
  })
  Message.success(t('common.deleteSuccess'))
  state.accountList = state.accountList.filter(
    item => item.account.id !== e.account.id
  )
}
</script>

<template>
  <div>
    <PageHeader v-if="listsInfo">
      {{ listsInfo.title }}
      <template #right>
        <a-button type="text" @click="openHandle" class="page-btn">
          <Icon icon="fa:sliders" />
        </a-button>
      </template>
    </PageHeader>

    <div class="handle-lists" v-show="showHandle">
      <a-row :gutter="10">
        <a-col :span="24">
          <a-link type="text" @click="editList">
            {{ t('common.edit') }}{{ t('list.title') }}
          </a-link>
          <a-popconfirm
            type="warning"
            :content="t('list.deleteList')"
            @ok="removeLists"
          >
            <a-link type="text" status="danger">
              {{ t('common.delete') }}{{ t('list.title') }}
            </a-link>
          </a-popconfirm>
        </a-col>
      </a-row>
      <a-modal
        v-model:visible="showEditListModal"
        :footer="false"
        hide-title=""
        modal-class="editList-modal"
        width="min(500px, 90%)"
      >
        <a-row :gutter="10">
          <a-col :span="20">
            <a-input
              :placeholder="t('search.searchUser')"
              v-model="editListSearch"
            ></a-input>
          </a-col>
          <a-col :span="4">
            <a-button
              type="primary"
              @click="onEditListSearch"
              :loading="searchBtnLoading"
              long
              >{{ t('common.search') }}</a-button
            >
            <a-drawer
              :width="340"
              v-model:visible="showSearchDrawer"
              unmountOnClose
              placement="left"
              :footer="false"
              :header="false"
            >
              <UserItem
                v-for="item in searchUserList"
                :data="item"
                :is-show-follow="false"
                :is-show-note="false"
                :isShowUserCard="false"
              >
                <template #right>
                  <template
                    v-if="
                      state.accountList.some(
                        user => user.account.id === item.id
                      )
                    "
                  >
                    <a-button @click="delUser(item)" :loading="item._loading">
                      <Icon icon="material-symbols:close-rounded" />
                    </a-button>
                  </template>
                  <template v-else>
                    <a-button @click="addUser(item)" :loading="item._loading">
                      <Icon icon="material-symbols:add-rounded" />
                    </a-button>
                  </template>
                </template>
              </UserItem>
            </a-drawer>
          </a-col>
        </a-row>
        <div
          style="
            height: 300px;
            overflow-y: auto;
            margin-top: 20px;
            position: relative;
          "
        >
          <a-list>
            <a-list-item v-for="item in state.accountList">
              <UserItem
                :data="item.account"
                :is-show-follow="false"
                :is-show-note="false"
              >
                <template #right>
                  <a-button @click="delUser(item)" :loading="item._loading">
                    <Icon icon="line-md:remove" />
                  </a-button>
                </template>
              </UserItem>
            </a-list-item>
          </a-list>
        </div>
      </a-modal>
      <a-row :gutter="10">
        <a-col :span="20">
          <a-input
            class="editSaveInput"
            v-model="listsName"
            :placeholder="t('list.listTitle')"
          ></a-input>
        </a-col>
        <a-col :span="4">
          <a-button
            long
            type="primary"
            @click="submitListsName"
            :loading="editSaveLoading"
            >{{ t('common.save') }}</a-button
          >
        </a-col>
      </a-row>
    </div>

    <van-pull-refresh
      v-model="state.loading"
      @refresh="onRefresh"
      head-height="75"
    >
      <TweetMessages
        ref="tweetMessagesRef"
        :tweetList="tweetList"
        :loading="state.loading"
        @load="getList"
        @onRefresh="onRefresh"
        :finished="state.finished"
      >
        <template #nullText>
          <div class="null-text">
            <p>{{ t('list.noContentInThisList') }}</p>
          </div>
        </template>
      </TweetMessages>
      <template #loading>
        <loadingIcon></loadingIcon>
      </template>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
.editSaveInput {
  border: 1px solid rgb(var(--primary-6));
}
.null-text {
  padding: 20px;
  text-align: center;
}
.page-btn {
  // @extend %btn-text-color;
}
.handle-lists {
  padding: 10px;
  background: var(--color-neutral-2);
  --color-fill-3: transparent;
}
:deep(.arco-drawer) {
  box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.1);
}
</style>
