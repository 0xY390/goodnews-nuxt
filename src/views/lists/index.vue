<script setup>
const { t } = useI18n()
const newListsName = ref('')
import { getlistsData, createList } from '@/api/lists'
import { watchEffect } from 'vue'
const state = reactive({
  lists: [],
  loading: false,
  addLoading: false
})
const getData = async () => {
  state.loading = true
  const res = await getlistsData().finally(() => {
    state.loading = false
  })
  state.lists.push(...res.data)
}
watchEffect(() => {
  getData()
})
const addLists = async () => {
  if (!newListsName.value) {
    return
  }
  if (newListsName.value.length < 3) {
    return
  }
  state.addLoading = true
  try {
    await createList({ title: newListsName.value })
    state.lists = []
    const res = await getlistsData()
    state.lists.push(...res.data)
    newListsName.value = ''
  } finally {
    state.addLoading = false
  }
}

const router = useRouter()
const goDetails = e => {
  router.push({ name: 'lists-id', params: { id: e.id } })
  sessionStorage.setItem('lists', JSON.stringify(e))
}

const disabledTitle = computed(() => {
  let str = ''
  if (!newListsName.value) {
    str = t('list.pleaseEnterTitle')
  } else if (newListsName.value.length < 3) {
    str = t('list.titleLengthCannotBeLessThan', { length: 3 })
  }
  return str
})
</script>

<template>
  <div class="pages">
    <PageHeader> {{ t('list.title') }} </PageHeader>
    <div class="container">
      <div class="handle">
        <a-input
          :placeholder="t('list.newListsTitle')"
          v-model="newListsName"
        ></a-input>
        <a-button
          type="primary"
          :disabled="!newListsName || newListsName.length < 3"
          @click="addLists"
          :loading="state.addLoading"
          :title="disabledTitle"
        >
          {{ t('list.createNewList') }}
        </a-button>
      </div>
      <div class="mylists">
        <div class="mylists-title">
          {{ t('list.yourLists') }}
        </div>
        <div class="mylists-list">
          <a-link
            class="mylists-item"
            v-for="item in state.lists"
            @click="goDetails(item)"
          >
            <div class="icon">
              <Icon icon="material-symbols-light:lists-rounded" />
            </div>
            <div class="title">{{ item.title }}</div>
          </a-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.handle {
  padding: 10px;
  display: flex;
  gap: 10px;
}
.mylists {
  padding: 10px 0;
  &-title {
    padding: 10px;
    border-top: 1px solid var(--color-neutral-3);
    border-bottom: 1px solid var(--color-neutral-3);
    background: var(--color-neutral-2);
  }
  &-list {
    .mylists-item {
      padding: 10px;
      border-bottom: 1px solid var(--color-neutral-3);
      cursor: pointer;
      display: flex;
      gap: 6px;
      align-items: center;
      color: var(--color-neutral-10);
      .icon {
        display: flex;
        align-items: center;
      }
      .title {
        font-size: 16px;
        flex: 1;
      }
      .icon {
        font-size: 18px;
      }

      &:hover {
        background: var(--color-neutral-2);
      }
    }
  }
}
</style>
