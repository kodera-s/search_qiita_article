<template>
  <div class="search-article">
    <p class="input-block">
      <input type="text" v-model="keyword" class="input-box">
    </p>
    <p class="message-block">
      {{ message }}
    </p>
    <ul class="article-list">
      <li v-for="(item, index) in getQiitaDataSet" :key="index" class="article-item">
        <a :href="item.url" target="_blank" class="article-title">{{ item.title}}</a>
        <span class="article-like"> likes: {{ item.likes_count }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
export default Vue.extend({
  name: 'SearchArticle',
  data () {
    return {
      items: null,
      keyword: '',
      message: 'Input search text'
    }
  },
  watch: {
    keyword(){
      this.message = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  computed: {
    getQiitaDataSet(){
      return this.getQiitaDataSet
    },
    ...mapGetters([
      'getQiitaDataSet'
    ])
  },
  created () {
    this.debouncedGetAnswer = _.debounce(this.commitApi, 1000)
  },
  methods: {
    commitApi () {
      if (this.keyword === '') {
        this.items = null
        this.message = 'Input search text'
        return
      }
      this.message = 'Loading...'
      const params = { page: 1, query: this.keyword }
      this.commitQiitaApi({params})
      this.message = ''
    },
    ...mapActions([
      'commitQiitaApi'
    ]),
  }
})
</script>

<style lang="scss" scoped>
.search-article {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .input-block,
  .message-block {
    width: 60%;
    height: 1em;
    .input-box {
      width: 100%;
    }
  }
  .article-list {
    width: 100%;
    list-style: none;
    .article-item {
      text-align: left;
      padding: 10px;
      &:hover {
        background: rgb(178, 218, 255)
      }
      .article-title {
        margin-right: 20px;
      }
    }
  }
}
</style> 