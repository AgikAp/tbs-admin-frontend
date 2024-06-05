import { faAlignRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigationList } from '../../constants/navigationlist'
import SideLink from './sideLink'
import { useNavigate } from 'react-router-dom'

export default function Sidenav() {
  const navigate = useNavigate()
  return (
    <>
      <div className='min-h-lvh py-5 px-8 hidden md:block col-span-2'>
        <div className='min-w-full min-h-full bg-dark-1 shadow-lg py-8'>
          <div className='text-center'>
            <span className='text-[28px] text-light-1 font-bold'>Dashboard.</span>
          </div>
          <ul className='px-5 py-10'>
            {navigationList.map((group, i) =>
              <div className='text-[14px] font-light' key={group + "dekstop"}>
                <span className='pl-8'>
                  {group.group}
                </span>
                <div className='my-5'>
                  {group.list.map((val, i) =>
                    <SideLink active={false} display={val.display} icon={val.icon} onClick={() => navigate(val.link)} key={val.display + i + "dekstop"} />
                  )}
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className='col-span-12 xl:hidden px-3 py-3'>
        <div className='min-w-full min-h-full bg-dark-1 px-5 py-3 rounded-md flex justify-between drawer-content'>
          <span className='text-[22px] text-light-1  font-bold'>Dashboard.</span>
          <label htmlFor="my-drawer-2" className='text-[22px] text-light-1  font-bold hover:cursor-pointer'>
            <FontAwesomeIcon icon={faAlignRight} />
          </label>
        </div>
      </div>
      <div className="xl:hidden drawer z-[999]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full text-base-content bg-dark-1">
            <div className='text-left px-5 my-5'>
              <span className='text-[28px] text-light-1 font-bold'>Dashboard.</span>
            </div>
            {navigationList.map((group, i) =>
              <div className='text-[14px] font-light' key={group + "mobile"}>
                <span className='pl-8'>
                  {group.group}
                </span>
                <div className='my-5'>
                  {group.list.map((val, i) =>
                    <label htmlFor="my-drawer-2" key={val.display + i + "dekstop"} >
                      <SideLink active={false} display={val.display} icon={val.icon} onClick={() => navigate(val.link)} />
                    </label>
                  )}
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
