<template>
<div>
  <div>
    <ul>
      <li>
        <div>
          <span>提交评论</span>
          <span>返回</span>
        </div>
      </li>
      <li>
        <textarea
          v-model="newComment"
        ></textarea>
      </li>
      <li>
        <mt-button 
          size="large" 
          type="primary" 
          @click.native="sendMsg">
          发表评论按钮
        </mt-button>
      </li>
      <li>
        <div>
          <span>
            评论列表
          </span>
          <span>
            44条评论
          </span>      
        </div>
      </li>
    </ul>
    <ul>
      <li v-for="(msg, index) in msgs" :key="index">
        {{msg.user_name}}
        {{msg.content}}
        {{msg.add_time | relativeTime}}
      </li>
    </ul>
      <mt-button 
        size="large" 
        plain
        type="danger" 
        @click.native="loadMore">
        加载更多
      </mt-button>
  </div>
</div>

</template>
<script>
  export default {
    name: 'comment',
    props: ['cid'], //评论需要的id
    data() {
      return {
        msgs: [],
        page: 1,
        newComment: '', // 新的消息
      }
    },
    methods: {
      // 发表评论
      sendMsg() {
        if (this.newComment.trim() == '') {
          this.$toast('评论信息不能为空')
        }
        this.$axios.post(`postcomment/${this.cid}`, `content=${this.newComment}`)
        .then(res => {
          this.newComment = ''
          this.page = 1
          this.msgs = []
          this.loadComments()
        })
        .catch(err => {
          console.log('提交评论失败', err)
        })
      },
      loadMore() {
        this.page += 1
        this.loadComments()
      },
      loadComments() {
        console.log(this.page)
        this.$axios(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          if (res.data.message.length === 0) {
            this.$toast('没数据')
          }
          this.msgs = this.msgs.concat(res.data.message)
        })
        .catch(err => {
          console.log('获取评论列表失败', err)
        })
      },
    },
    created() {
      // 使用这个api时，判断是否有页码
      this.page = this.$route.query.page || 1
      this.loadComments()
    }
  }
</script>
<style scoped>

</style>