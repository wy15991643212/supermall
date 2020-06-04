<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="privateImage left">
          <i class="iconfont icon-dengluyonghu"></i>
        </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <i class="iconfont icon-shouji"></i>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="arrow right">
        <i class="iconfont icon-jiantou"></i>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
    };
  }
}

</script>
<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}

#user-info .privateImage {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  position: relative;
}

.left {
  float: left;
}

#user-info .arrow {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}

#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  position: relative;
  font-size: 18px;
  line-height: 18px;
  margin-top: 5px;
  font-weight: 300;
  margin-left: 15px;
}

#user-info .login-info .phone .icon-shouji {
  position: absolute;
  width: 12px;
  height: 18px;
  left: -17px;
  top: 0px;
}

#user-info .icon-jiantou {
  color: #FFF;
}

.icon-dengluyonghu {
  font-size: 44px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -26px;
  margin-left: -22px;
  color: #ccc;
}
</style>