<template>
  <div class="postPublish">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">文章管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card" style="margin-top: 20px">
      <el-form ref="form" :model="post" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="post.title"></el-input>
        </el-form-item>

        <!-- 单选框 -->
        <el-form-item label="类型">
          <el-radio-group v-model="post.type">
            <!-- label 就是这个按钮的value值，当选中按钮时，value会赋值给 v-model 所绑定的属性 -->
            <el-radio :label="1"> 文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容">
          <!-- 富文本框 -->
          <VueEditor
            ref="myeditor"
            v-if="post.type == 1"
            :config="config"
          ></VueEditor>

          <!-- 上传视频组件 -->
          <el-upload
            :on-success="successUpload"
            :headers="getToken()"
            :action="axios.defaults.baseURL + '/upload'"
            v-else
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>

        <!-- 栏目 -->
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <!-- v-model="checkedCategory" 将复选框的:label="item.id" 值添加到这个数组中存储 -->
          <el-checkbox-group
            v-model="checkedCategory"
            @change="handleCheckedCategoryChange"
          >
            <!-- :label="item.id" 当前复选框的实际值，会添加到  v-model="checkedCategory" 中  -->
            <el-checkbox
              v-for="item in categoryList"
              :label="item.id"
              :key="item.id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

        <!-- 封面 -->
        <el-form-item label="封面">
          <el-upload
            :headers="getToken()"
            :on-success="picUpload"
            :action="axios.defaults.baseURL + '/upload'"
            list-type="picture-card"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
        </el-form-item>

        <!-- 发布按钮 -->
        <el-form-item>
          <el-button @click="getPost" type="primary" plain>发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCategory, postArticle } from "@/api/post";
import axios from "@/utils/request";
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      token: "",
      axios,
      // 数据
      post: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      // 富文本框配置
      config: {
        // 上传图片的配置
        uploadImage: {
          url: axios.defaults.baseURL + "/upload",
          name: "file",
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);

            insert(axios.defaults.baseURL + res.data.data.url);
          },
        },

        // 上传视频的配置
        uploadVideo: {
          url: axios.defaults.baseURL + "/upload",
          headers: this.getToken(),
          name: "file",
          uploadSuccess(res, insert) {
            // console.log(res);
            insert(axios.defaults.baseURL + res.data.data.url);
          },
        },
      },
      // 复选框
      checkAll: false, // 全选栏目的选中状态
      checkedCategory: [], // 选中栏目的 id
      categoryList: [], // 栏目列表
      isIndeterminate: false, // checkbox 的不确定状态
    };
  },
  async mounted() {
    this.categoryList = (await getCategory()).data.data;
    this.categoryList.splice(0, 2);
    // console.log(this.categoryList);
  },
  methods: {
    // 封面上传成功
    picUpload(res) {
      // 将封面id以对象的形式存到cover里
      this.post.cover.push({ id: res.data.id });
      // console.log(this.post.cover);
    },
    // 封面移除
    handleRemove(file) {
      // 将移出的文件从 cover 数组中移除
      this.post.cover = this.post.cover.filter((v) => {
        return v.id != file.response.data.id;
      });
    },

    // 复选框
    // 全选按钮改变时触发
    handleCheckAllChange(val) {
      // 全选打勾时，val为 true，获取所有栏目id存在 checkedCategory 中，不打勾时，checkedCategory 是一个空数组
      this.checkedCategory = val
        ? this.categoryList.map((v) => {
            return v.id;
          })
        : [];
      // 全选打勾或者不打勾时，isIndeterminate 都是确定的
      this.isIndeterminate = false;
    },
    // 选中项改变时触发
    handleCheckedCategoryChange(value) {
      // 选中的个数
      let checkedCount = value.length;
      // 如果选中的个数和栏目数量相同吗，则全选框打勾，否则不打勾
      this.checkAll = checkedCount === this.categoryList.length;
      // 当有选中且选中的个数少于总个数时，isIndeterminate 为 true
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.categoryList.length;
    },

    //取 token
    getToken() {
      this.token = localStorage.getItem("heimaback_token");
      return { Authorization: this.token };
    },
    // 上传视频
    successUpload(response) {
      this.post.content = response.data.url;
      // console.log(this.post);
    },
    // 点击发布按钮 取数据
    async getPost() {
      // 单独收集文章内容数据:因为只有用户选择了文章类型，才需要收集富文本框的内容
      if (this.post.type == 1) {
        this.post.content = this.$refs.myeditor.editor.root.innerHTML;
      }
      // console.log(this.checkedCategory);
      // 点击发布按钮，将选中的栏目的 id 以对象的形式存到 post.categories 中
      this.post.categories = this.checkedCategory.map((v) => {
        return { id: v };
      });
      let res = await postArticle(this.post);
      console.log(res);
      if (res.data.message == "文章发布成功") {
        this.$message.success("文章发布成功");
        this.$router.push({ name: "postList" });
      }
    },
  },
};
</script>

<style>
</style>