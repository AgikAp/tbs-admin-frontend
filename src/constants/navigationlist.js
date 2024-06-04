import { icon } from "@fortawesome/fontawesome-svg-core";
import { faBoxesStacked, faCreditCard, faGamepad, faHome, faListCheck, faRectangleAd } from "@fortawesome/free-solid-svg-icons";

export const navigationList = [
  {
    group: 'Application Menu',
    list: [
      {
        display: 'Home',
        icon: faHome,
        link: '/'
      },
      {
        display: 'Games',
        icon: faGamepad,
        link: '/game'
      },
      {
        display: 'Items',
        icon: faBoxesStacked,
        link: '/item'
      },
      {
        display: "Banners",
        icon: faRectangleAd,
        link: '/banner'
      },
      {
        display: "Payments",
        icon: faCreditCard,
        link: '/payment'
      }
    ]
  },
  {
    group: 'Transaction Menu',
    list: [
      {
        display: 'Transaction Guest',
        icon: faListCheck,
        link: '/transaction/guest'
      }
    ]
  }
]