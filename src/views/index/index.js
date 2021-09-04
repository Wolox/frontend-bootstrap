import Vue from 'vue'
import { gsap } from 'gsap'

import { installServiceWorker } from '../../serviceWorkerInstaller'
import ProfileImage from '../../assets/profile_image.svg'
import GithubIcon from '../../assets/github_icon.svg'
import LinkedinIcon from '../../assets/linkedin_icon.svg'
import TwitterIcon from '../../assets/twitter_icon.svg'
import LogoImage from '../../assets/logo.svg'
import WoloxLogo from '../../assets/wolox_logo.svg'

const CustomCursor = () => import(/* webpackChunkName: "example" */ '../../components/CustomCursor')

import './index.pug'
import './index.scss'

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  components: {
    CustomCursor,
    ProfileImage,
    GithubIcon,
    LinkedinIcon,
    TwitterIcon,
    LogoImage,
    WoloxLogo
  },
  data: {
    title: 'Gabriel Zanzotti'
  },
  mounted: () => {
    // eslint-disable-line no-magic-numbers
    const infoTimeline = gsap.timeline()
    infoTimeline.fromTo('.border, .logo', { opacity: 0 }, { opacity: 1, ease: 'power4.out', duration: 5 })
    infoTimeline.fromTo('.first-name', { opacity: 0 }, { opacity: 1, ease: 'power4.out', duration: 3 }, 0.5) // eslint-disable-line no-magic-numbers
    infoTimeline.fromTo('.last-name', { opacity: 0 }, { opacity: 1, ease: 'power4.out', duration: 5 }, 0.8) // eslint-disable-line no-magic-numbers
    infoTimeline.fromTo('.description', { opacity: 0 }, { opacity: 1, ease: 'power4.out', duration: 3 }, 1.2) // eslint-disable-line no-magic-numbers
    infoTimeline.fromTo(
      '.social-linkedin',
      { opacity: 0 },
      { opacity: 1, ease: 'power4.out', duration: 3 },
      1.4 // eslint-disable-line no-magic-numbers
    )
    infoTimeline.fromTo(
      '.social-github',
      { opacity: 0 },
      { opacity: 1, ease: 'power4.out', duration: 3 },
      1.6 // eslint-disable-line no-magic-numbers
    )
    infoTimeline.fromTo(
      '.social-twitter',
      { opacity: 0 },
      { opacity: 1, ease: 'power4.out', duration: 3 },
      1.8 // eslint-disable-line no-magic-numbers
    )

    const profileImageTimeline = gsap.timeline()
    const maskSquares = document.getElementsByClassName('mask-square')
    let delay = 0.5 // eslint-disable-line no-magic-numbers
    for (const maskSquare of maskSquares) {
      profileImageTimeline.fromTo(
        maskSquare,
        { fill: '#000' },
        { fill: '#FFF', ease: 'power4.out', duration: 8 },
        delay
      )
      delay += 0.1 // eslint-disable-line no-magic-numbers
    }
  }
})

if (process.env.NODE_ENV === 'production') {
  installServiceWorker()
}
