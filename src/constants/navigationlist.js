import { faGamepad, faHome } from "@fortawesome/free-solid-svg-icons";

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
        display: 'Payments',
        icon: faGamepad,
        link: '/payment'
      }
    ]
  }
]