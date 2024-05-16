import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SideLink({active, display, icon, onClick}) {
  return (
    <>
      <li className={`px-10 py-3 my-2rounded-md cursor-pointer transition-all duration-150 ${active ? 'bg-primary-0' : 'text-dark-4 hover:text-dark-6'}`} onClick={onClick}>
        <div className='grid grid-cols-7 items-center'>
          <span className='col-span-2 text-[20px]'>
            <FontAwesomeIcon icon={icon} />
          </span>
          <span className='col-span-5'>
            {display}
          </span>
        </div>
      </li>
    </>
  )
}
