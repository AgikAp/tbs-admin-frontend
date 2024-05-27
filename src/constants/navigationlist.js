import { faBoxesStacked, faGamepad, faHome, faRectangleAd } from "@fortawesome/free-solid-svg-icons";

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
      }
    ]
  }
]