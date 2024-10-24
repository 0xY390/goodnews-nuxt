<script setup>
import { ref } from 'vue'
import { createFilters, getFiltersDetails } from '@/api/filters.js'
const { t } = useI18n()

const router = useRouter()

const options = [
  {
    value: 0,
    label: t('filter.addFilter.neverExpires')
  },
  {
    value: 1800,
    label: t('filter.addFilter.after30Minutes')
  },
  {
    value: 3600,
    label: t('filter.addFilter.afterHour', { count: 1 })
  },
  {
    value: 21600,
    label: t('filter.addFilter.afterHour', { count: 6 })
  },
  {
    value: 43200,
    label: t('filter.addFilter.afterHour', { count: 12 })
  },
  {
    value: 86400,
    label: t('admin.ipRules.theDay', { count: 1 })
  },
  {
    value: 604800,
    label: t('admin.ipRules.theWeeks', { count: 1 })
  }
]

const submitLoading = ref(false)
const ruleFormRef = ref(null)
const ruleForm = ref({
  title: '',
  expires_in: 0,
  context: [],
  act: 1,
  kw_attr: [{ key: 1, kw: '', whole_word: true, destroy: false }]
})

const rules = ref({
  title: [
    {
      required: true,
      message: t('filter.addFilter.pleaseEnterFilterTitle'),
      trigger: ['blur', 'change']
    }
  ],
  context: [
    {
      required: true,
      message: t('filter.addFilter.pleaseSelectFilterEnvironment'),
      trigger: ['blur', 'change']
    }
  ]
})

const addRules = () => {
  ruleForm.value.kw_attr.forEach((item, index) => {
    rules.value[`kw_attr.${index}.kw`] = [
      {
        required: true,
        message: t('public.pleaseEnterKeywords'),
        trigger: ['blur', 'change']
      }
    ]
  })
}
addRules()

const addKeyList = () => {
  if (ruleForm.value.kw_attr && ruleForm.value.kw_attr.length) {
    const key =
      ruleForm.value.kw_attr[ruleForm.value.kw_attr.length - 1].key + 1
    ruleForm.value.kw_attr.push({
      key,
      kw: '',
      whole_word: true,
      destroy: false
    })
  } else {
    ruleForm.value.kw_attr = [
      { key: 1, kw: '', whole_word: true, destroy: false }
    ]
  }

  addRules()
}

const handleDelete = index => {
  ruleForm.value.kw_attr.splice(index, 1)
}

const handleAddFilters = async () => {
  if (submitLoading.value) return
  try {
    submitLoading.value = true
    const res = await createFilters(ruleForm.value)
    console.log('handleAddFilters res :>> ', res)
    router.replace('/settings/adminFilters')
  } catch (err) {
    console.log(err)
  } finally {
    submitLoading.value = false
  }
}
const submitForm = () => {
  handleAddFilters()
}
</script>

<template>
  <div class="admin-roles-new">
    <PageHeader>{{ $t('filter.addFilter.addFilter') }}</PageHeader>
    <!-- <div>ruleForm {{ ruleForm }}</div> -->
    <a-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <a-form-item :label="$t('filter.addFilter.title')" prop="title">
        <a-input v-model="ruleForm.title" />
      </a-form-item>
      <a-form-item :label="$t('filter.addFilter.expiresIn')" prop="expires_in">
        <a-select
          v-model="ruleForm.expires_in"
          placeholder="Select"
          style="width: 100%"
        >
          <a-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </a-select>
      </a-form-item>

      <a-form-item
        :label="
          $t('filter.addFilter.context') +
          ' (' +
          $t('filter.addFilter.filterAppEnv') +
          ')'
        "
        prop="context"
      >
        <a-checkbox-group v-model="ruleForm.context">
          <a-checkbox :value="1">{{ t('filter.home') }}</a-checkbox>
          <a-checkbox :value="2">{{ t('layout.notification') }}</a-checkbox>
          <a-checkbox :value="3">{{ t('filter.public') }}</a-checkbox>
          <a-checkbox :value="4">{{ t('filter.conversation') }}</a-checkbox>
          <a-checkbox :value="5">{{ t('profile.title') }}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item
        :label="
          $t('filter.addFilter.act') +
          ' (' +
          $t('filter.addFilter.filterAction') +
          ')'
        "
        prop="radioList"
      >
        <a-radio-group v-model="ruleForm.act">
          <a-radio :value="1">
            <div>{{ t('filter.hideWarning') }}</div>
            <div>{{ t('filter.hideFilterContent') }}</div>
          </a-radio>
          <a-radio :value="2">
            <div>{{ t('filter.fullyHide') }}</div>
            <div>{{ t('filter.fullyHideDesc') }}</div>
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <div style="position: relative">
        <div
          class=""
          style="
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
          "
        >
          <span class="font-bold">{{ $t('filter.addFilter.keyword') }}</span>
          <span class="font-bold">{{ $t('filter.addFilter.wholeWord') }}</span>
        </div>
        <span
          style="position: absolute; top: 6px; left: 750px"
          class="text-[13px] font-bold"
        ></span>
        <a-form-item
          v-for="(item, index) in ruleForm.kw_attr"
          :key="index"
          label=""
          :prop="'kw_attr.' + index + '.kw'"
        >
          <div class="form-wrapper">
            <a-input v-model="item.kw" />
            <a-checkbox v-model="item.whole_word"></a-checkbox>
            <span
              class="min-w-[30px] ml-1"
              style="min-width: 30px; margin-left: 4px"
              @click="handleDelete(index)"
            >
              {{ $t('common.delete') }}
            </span>
          </div>
        </a-form-item>
        <a-button style="margin-bottom: 16px" @click="addKeyList" size="small">
          <Icon
            name="ic:baseline-plus"
            width="16"
            height="16"
            style="color: #666"
          />
          {{ $t('filter.addFilter.addkeyword') }}
        </a-button>
      </div>
    </a-form>
    <a-button
      type="primary"
      :disabled="submitLoading"
      :loading="submitLoading"
      @click="submitForm"
    >
      {{ $t('filter.addFilter.saveNew') }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped>
:deep(.arco-row) {
  display: flex;
  flex-flow: column nowrap;
}

:deep(.arco-form-item-label-col) {
  width: auto;
}

:deep(.arco-form-item) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

:deep(.arco-form-item-content-flex) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

:deep(.header) {
  padding: 4px 0;
}

.admin-roles-new {
  padding: 55px 25px 50px 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  .header {
    margin-bottom: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .form-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
