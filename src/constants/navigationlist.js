import { faBoxesStacked, faGamepad, faHome } from "@fortawesome/free-solid-svg-icons";

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
      }
    ]
  }
]