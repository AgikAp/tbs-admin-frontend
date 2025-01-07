import { icon } from "@fortawesome/fontawesome-svg-core";
import { faBoxesStacked, faCreditCard, faGamepad, faHome, faListCheck, faRectangleAd, faStreetView, faUsersGear } from "@fortawesome/free-solid-svg-icons";

export const navigationList = [
  {
    group: 'Application Menu',
    allowed: ['GAME', 'BANNER', 'ITEM', 'PAYMENT'],
    list: [
      {
        display: 'Home',
        icon: faHome,
        link: '/',
        allowed: ['GAME', 'BANNER', 'ITEM', 'PAYMENT']
      },
      {
        display: 'Games',
        icon: faGamepad,
        link: '/game',
        allowed: ['GAME_LIST']
      },
      {
        display: 'Items',
        icon: faBoxesStacked,
        link: '/item',
        allowed: ['ITEM_LIST']
      },
      {
        display: "Banners",
        icon: faRectangleAd,
        link: '/banner',
        allowed: ['BANNER_LIST']
      },
      {
        display: "Payments",
        icon: faCreditCard,
        link: '/payment',
        allowed: ['PAYMENT_LIST']
      }
    ]
  },
  {
    group: 'Transaction Menu',
    allowed: ['TRANSACTION'],
    list: [
      {
        display: 'Transaction Guest',
        icon: faListCheck,
        link: '/transaction/guest',
        allowed: ['TRANSACTION_LIST']
      }
    ]
  },
  {
    group: 'Admin Menu',
    allowed: ['ADMIN'],
    list: [
      {
        display: 'Admin List',
        icon: faUsersGear,
        link: '/admin/list',
        allowed: ['ADMIN_LIST']
      },
      {
        display: 'Role Access',
        icon: faStreetView,
        link: '/admin/role',
        allowed: ['ROLE_EDITOR']
      }
    ]
  }
]