<template>
  <div>
    <header-bar></header-bar>
    <div id="" class="wid-1200">
      <div class="">
        <div class="outer">
          <div class="box-frame">
            <div class="select-sender-title" id="org"></div>
            <div class="select-sender-kv">
              <div class="select-sender-info">
                <span>红十字会上链信息：</span>
              </div>
              <div class="select-sender-info">
                <span>捐赠区块高度：{{ height }}</span>
                <span id="height"></span>
              </div>
              <div class="select-sender-info">
                <span>捐赠区块哈希：<span class="hash">{{ blockHash }}</span></span>
                <span
                  id="blockHash"
                ></span>
              </div>
              <div class="select-sender-info">
                <span>捐赠事务哈希：<span class="hash">{{ hash }}</span></span>
                <span
                  id="txHash"
                  style="
                    font-size: 0.7em;
                    position: relative;
                    display: block;
                    top: 0.5em;
                  "
                ></span>
              </div>
            </div>
            <div class="box-donate">
              <div class="cross-donate donate-info">
                <span>捐赠信息：{{ info }}</span>
              </div>
              <div class="cross-donate">
                <span>捐赠姓名：{{ name }}</span>
                <span id="name"></span>
              </div>
              <div class="cross-donate">
                <span>捐赠内容：{{ content }} </span>
                <div class="donated-content">
                  <div class="countersign" id="content"></div>
                </div>
              </div>
              <div class="cross-donate">
                <span id="confirm-description">{{ description }}</span>
              </div>
              <div class="cross-donate">
                <span>捐赠地址：{{ address }}</span>
                <span id="address"></span>
              </div>
              <div class="cross-donate">
                <span>受益人：{{ get }}</span>
                <span id="get"></span>
              </div>
              <div class="cross-donate">
                <span>捐赠机构：{{ donor }} </span>
                <span id="donor"></span>
              </div>
            </div>
            <div class="text-center">
              <button
                class="box-but"
                id="but-select-sender"
                :disabled="disabled"
              >
                {{ disabled ? '已完成存证' : '存证上链' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import HeaderBar from '@/components/HeaderBar.vue'
import { getConfirm, getDonor, getHashByHeight } from '@/api'

@Options({
  components: {
    HeaderBar
  }
})
export default class Cross extends Vue {
  name = ''
  content = ''
  quantity = null
  info = ''
  address = ''
  get = ''
  donor = ''
  confirmed = false
  hash = ''
  tm = []
  height: number = null
  hasDonor = false

  blockHash = ''
  get disabled(): boolean {
    return !this.hasDonor || this.confirmed
  }

  get description(): string{
    if(!this.content)
      return ''
    return '捐赠说明：' + (this.content === '口罩' ?
                `医用口罩${this.quantity}个，按照一名医护人员20个口罩的形式安排分发${this.donor}` : `防毒面具${this.content}个，按照一名医护人员一个的形式安排分发${this.donor}`)
  }

  created() {
    this.refresh()
    this.tm.push(setInterval(() => this.refresh(), 500))
  }

  beforeDestroy() {
    this.tm.forEach((id) => clearInterval(id))
  }

  refresh() {
    getDonor().then((r) => {
      if (!r) return
      this.hasDonor = true
      for (let k of Object.keys(r)) {
        if (k in this) this[k] = r[k]
      }
      getHashByHeight(r.height).then(h => this.blockHash = h)
    })
  }

  confirm() {
    
  }
}
</script>

<style scoped lang="css">
@import url('@/css/cross.css');

.hash {
  font-family: 'monospace';
  font-size: 0.7em;
  /* position: relative; */
  /* display: block; */
  /* top: 0.5em; */
  vertical-align: middle;
}
</style>
