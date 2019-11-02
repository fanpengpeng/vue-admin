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
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          status-icon
          size="medium"
        >
          <el-form-item prop="username" class="form-item">
            <label>邮箱</label>
            <el-input
              type="text"
              placeholder="请输入邮箱"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-item">
            <label>密码</label>
            <el-input
              type="password"
              maxlength="20"
              placeholder="请输入密码"
              v-model="loginForm.password"
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
              v-model="loginForm.rePassword"
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
                  v-model="loginForm.code"
                  @input.native="filterCharacter"
                ></el-input>
              </el-col>
              <el-col :span="9">
                <el-button
                  type="success"
                  class="block-btn"
                  size="mini"
                  :disabled="codeBtnStatus.status"
                  @click="getCode()"
                >
                  {{ codeBtnStatus.text }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              class="btn-group block-btn"
              :disabled="isPreservable"
              @click="submitForm('loginForm')"
            >
              {{ model === "register" ? "注册" : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSMS, Register } from "@/api/login";
import { ref, reactive, onMounted } from "@vue/composition-api";
import {
  filterSpecilCharacter,
  validateEmail,
  validatePassword as validatePass,
  validateCode as validateVerification
} from "@/utils/validate";
export default {
  name: "login",
  setup(props, { refs, root }) {
    // 表单验证规则
    let validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else if (validateEmail(value)) {
        return callback(new Error("邮箱格式不正确"));
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
        if (loginForm.rePassword && value !== loginForm.rePassword) {
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
        if (loginForm.password && value !== loginForm.password) {
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
    // 数据初始化
    const model = ref("login");
    const timer = ref(null); // null 也是基本数据类型
    const isPreservable = ref(true);
    const menuTabs = reactive([
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
    ]);
    const loginForm = reactive({
      username: "",
      password: "",
      rePassword: "",
      code: ""
    });
    const codeBtnStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    const rules = reactive({
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
    });
    // 生命周期函数
    onMounted(() => {
      console.log(props);
    });
    // 声明函数
    const toggleTabs = data => {
      refs.loginForm.resetFields();
      menuTabs.forEach((item, index) => {
        menuTabs[index].current = false;
      });
      data.current = true;
      model.value = data.model;
      clearInterval(timer.value);
    };
    const getCode = () => {
      if (!loginForm.username) {
        root.$message.error("邮箱不能为空！");
        return false;
      }
      if (validateEmail(loginForm.username)) {
        root.$message.error("邮箱格式不正确！");
        return false;
      }
      // 保证校验格式统一
      // let flag = false;
      // let validateFields =
      //   model.value === "login"
      //   ? ["username", "password"] : ["username", "password", "rePassword"];
      // refs.loginForm.validateField(validateFields, errorMsg => {
      //   if (errorMsg !== "") {
      //     flag = true;
      //   }
      // });
      // if (flag) {
      //   return false;
      // }
      let requstParams = {
        username: loginForm.username,
        module: model.value
      };
      codeBtnStatus.status = true;
      codeBtnStatus.text = "发送中...";
      GetSMS(requstParams)
        .then(res => {
          root.$message.success(res.message);
          isPreservable.value = false;
          countDown(60);
        })
        .catch(res => {
          console.log(res);
        });
    };
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let requstParams = Object.assign({}, loginForm, {
            module: model.value
          });
          Register(requstParams)
            .then(res => {
              root.$message.success(res.message);
            })
            .catch(res => {
              console.log(res.message);
            });
        } else {
          console.log("submit error");
        }
      });
    };
    const filterCharacter = event => {
      loginForm.code = filterSpecilCharacter(event.target.value);
    };
    const countDown = number => {
      timer.value = setInterval(() => {
        if (number > 0) {
          codeBtnStatus.text = `倒计时${number}秒`;
          number--;
        } else {
          codeBtnStatus.status = false;
          codeBtnStatus.text = "重新获取";
          clearInterval(timer.value);
        }
      }, 1000);
    };
    // 将所有声明的数据及函数返回
    return {
      model,
      isPreservable,
      menuTabs,
      loginForm,
      codeBtnStatus,
      rules,
      toggleTabs,
      getCode,
      submitForm,
      filterCharacter,
      countDown
    };
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
