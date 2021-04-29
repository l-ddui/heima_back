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
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="25"
        style="margin-top: 20px"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getpostList } from "@/api/post.js";
export default {
  data() {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 4,
    };
  },
  async mounted() {
    // 页面一加载请求文章数据
    this.init();
  },
  methods: {
    // 请求文章数据
    async init() {
      let res = await getpostList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.postList = res.data.data;
    },
    // 编辑
    handleEdit(scope) {
      // console.log(scope);
    },
    // 删除
    handleDelete(scope) {
      // console.log(scope);
    },
    //  页面显示数据条数改变时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    // 当前页面页码改变时触发
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
  },
};
</script>

<style>
</style>