<template>
  <div class="login-wrapper">
    <div class="login-wrap">
      <ul class="menu-wrap">
        <li
          v-for="(item, index) in menuTabs"
          :key="index"
          class="menu-tab"
          :class="{ current: item.current }"
          @click="toggleTabs(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <div class="form-wrap">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          status-icon
          size="medium"
        >
          <el-form-item prop="username" class="form-item">
            <label>邮箱</label>
            <el-input
              type="text"
              placeholder="请输入邮箱"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-item">
            <label>密码</label>
            <el-input
              type="password"
              maxlength="20"
              placeholder="请输入密码"
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="rePassword"
            class="form-item"
            v-if="model === 'register'"
          >
            <label>重复密码</label>
            <el-input
              type="password"
              maxlength="20"
              placeholder="请再次输入密码"
              v-model="ruleForm.rePassword"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="form-item">
            <label>验证码</label>
            <el-row :gutter="11">
              <el-col :span="15">
                <el-input
                  type="text"
                  maxlength="6"
                  placeholder="请输入验证码"
                  v-model="ruleForm.code"
                  @input.native="filterCharacter"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block-btn" size="mini">
                  获取验证码
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              class="btn-group block-btn"
              @click="submitForm('ruleForm')"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  filterSpecilCharacter,
  validateEmail,
  validatePassword as validatePass,
  validateCode as validateVerification
} from "@/utils/validate";
export default {
  name: "login",
  data() {
    let validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        return callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        return callback(new Error("密码为6至20位字母和数字"));
      } else {
        if (this.ruleForm.rePassword && value !== this.ruleForm.rePassword) {
          return callback(new Error("当前密码与重复密码不一致"));
        }
        callback();
      }
    };
    let validateRePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (validatePass(value)) {
        return callback(new Error("密码为6至20位字母和数字"));
      } else {
        if (this.ruleForm.password && value !== this.ruleForm.password) {
          return callback(new Error("两次输入密码不一致"));
        }
        callback();
      }
    };
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVerification(value)) {
        return callback(new Error("验证码为6位字母或数字"));
      } else {
        callback();
      }
    };
    return {
      model: "login",
      menuTabs: [
        {
          text: "登录",
          current: true,
          model: "login"
        },
        {
          text: "注册",
          current: false,
          model: "register"
        }
      ],
      ruleForm: {
        username: "",
        password: "",
        rePassword: "",
        code: ""
      },
      rules: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        rePassword: [
          {
            validator: validateRePassword,
            trigger: "blur"
          }
        ],
        code: [
          {
            validator: validateCode,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    toggleTabs(data) {
      this.menuTabs.forEach((item, index) => {
        this.menuTabs[index].current = false;
      });
      data.current = true;
      this.model = data.model;
    },
    filterCharacter(event) {
      this.ruleForm.code = filterSpecilCharacter(event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: 0 auto;
}
.menu-wrap {
  text-align: center;
  .menu-tab {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    border-radius: 2px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    &.current {
      background: #2f4255;
    }
  }
}
.form-wrap {
  color: #fff;
  .form-item {
    margin-bottom: 13px;
  }
  .btn-group {
    margin-top: 19px;
  }
  .block-btn {
    display: block;
    width: 100%;
    color: #fff;
  }
}
</style>
