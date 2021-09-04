<template lang="pug">
  .cursor
    .cursor-move-inner
      .cursor-inner
    .cursor-move-outer
      .cursor-outer
</template>
<script>
import Stats from 'stats.js'

export default {
  mounted: () => {
    // const stats = new Stats(); stats.showPanel(0); document.body.appendChild(stats.dom);

    const cursor = document.querySelector('.cursor')
    const cursorInner = document.querySelector('.cursor-move-inner')
    const cursorOuter = document.querySelector('.cursor-move-outer')

    const triggers = document.querySelectorAll('button, a')

    let mouseX = 0
    let mouseY = 0

    let innerX = 0
    let innerY = 0

    let outerX = 0
    let outerY = 0

    let loop = null

    const lerp = (s, e, t) => (1 - t) * s + t * e

    const render = () => {
      // stats.begin();
      loop = null

      innerX = lerp(innerX, mouseX, 0.15) // eslint-disable-line no-magic-numbers
      innerY = lerp(innerY, mouseY, 0.15) // eslint-disable-line no-magic-numbers

      outerX = lerp(outerX, mouseX, 0.13) // eslint-disable-line no-magic-numbers
      outerY = lerp(outerY, mouseY, 0.13) // eslint-disable-line no-magic-numbers

      const angle = Math.atan2(mouseY - outerY, mouseX - outerX) * 180 / Math.PI

      const normalX = Math.min(Math.floor((Math.abs(mouseX - outerX) / outerX) * 1000) / 1000, 1) // eslint-disable-line no-magic-numbers
      const normalY = Math.min(Math.floor((Math.abs(mouseY - outerY) / outerY) * 1000) / 1000, 1) // eslint-disable-line no-magic-numbers
      const normal = normalX + normalY * 0.5 // eslint-disable-line no-magic-numbers
      const skwish = normal * 0.7 // eslint-disable-line no-magic-numbers

      cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`
      cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) rotate(${angle}deg) scale(${1 + skwish}, ${1 - skwish})`
      // stats.end();
      // Stop loop if interpolation is done.
      if (normal !== 0) {
        loop = window.requestAnimationFrame(render)
      }
    }

    window.requestAnimationFrame(render)

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!loop) {
        loop = window.requestAnimationFrame(render)
      }
    })

    triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor--hover')
      })

      trigger.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--hover')
      })
    })

  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables/colors.scss';
$ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
$ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);

.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 50px;
  height: 50px;
  margin: -25px 0 0 -25px;
  opacity: 0;
  transition: opacity 0.2s $ease-out-quart;
  pointer-events: none;

  &--hover {
    .cursor-inner {
      transform: scale(0.5);
      opacity: 0;
    }

    .cursor-outer {
      transform: scale(1.4);
      border-color: $SKOLZ-light-purple;
      opacity: 1;
    }
  }
}

.cursor-move-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  margin-top: -3px;
  margin-left: -3px;
}

.cursor-move-outer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cursor-inner {
  display: block;
  width: 100%;
  height: 100%;
  background: $SKOLZ-white;
  border-radius: 50%;
  transition: transform 0.4s $ease-out-quint, opacity 0.4s $ease-out-quart;
}

.cursor-outer {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid rgba($SKOLZ-purple, 0.75);
  border-radius: 50%;
  box-sizing: border-box;
  transition: border 0.4s $ease-out-quart, transform 0.4s $ease-out-quint, opacity 0.4s $ease-out-quart;
}
</style>
