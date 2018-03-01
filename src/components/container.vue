<template>
  <div class="container">
    <div class="main-cont">
      <div v-if="loading" class="loading">
        <div class="folding-cube">
          <div class="cube"></div>
          <div class="cube2 cube"></div>
          <div class="cube4 cube"></div>
          <div class="cube3 cube"></div>
        </div>
      </div>
      <router-view v-else></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'container',
  data() {
    return {
      loading: false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../theme/variable';

.container {
  position: absolute;
  top: $topbar-height;
  left: $sidebar-width;
  right: 0;
  bottom: 0;
  .main-cont {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    .loading {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      .folding-cube {
        position: relative;
        width: 60px;
        height: 60px;
        transform: rotateZ(45deg);
        .cube {
          position: relative;
          float: left;
          width: 50%;
          height: 50%;
          transform: scale(1.1);
          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #33b5e5;
            animation: foldCubeAngle 2.4s infinite linear both;
            transform-origin: 100% 100%;
          }
        }
        .cube2 {
          transform: scale(1.1) rotateZ(90deg);
          &:before {
            animation-delay: 0.3s;
          }
        }
        .cube3 {
          transform: scale(1.1) rotateZ(180deg);
          &:before {
            animation-delay: 0.6s;
          }
        }
        .cube4 {
          transform: scale(1.1) rotateZ(270deg);
          &:before {
            animation-delay: 0.9s;
          }
        }
      }
    }
  }
}

@keyframes foldCubeAngle {
  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
<style lang="scss">
@import '../theme/index';
</style>
