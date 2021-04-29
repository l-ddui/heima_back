<template>
  <div class="postList">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">文章管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card" style="margin-top: 20px">
      <!-- 表格 -->
      <el-table border :data="postList" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="类型" width="180">
          <template slot-scope="scope">
            {{ scope.row.type == 1 ? "文章" : "视频" }}
          </template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="作者" width="220">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getpostList } from "@/api/post.js";
export default {
  data() {
    return {
      postList: [],
    };
  },
  async mounted() {
    let res = await getpostList();
    this.postList = res.data.data;
  },
  methods: {
    handleEdit(scope) {
      console.log(scope);
    },
    handleDelete(scope) {
      console.log(scope);
    },
  },
};
</script>

<style>
</style>