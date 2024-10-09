import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', name: '메인' },
  { path: '/education', name: '교육' },
] as const;

export const BottomTab = () => {
  return (
    <nav className='fixed bottom-0 left-1/2 flex h-20 w-full max-w-[430px] -translate-x-1/2 transform items-center justify-around border-t border-gray-200 bg-white px-8 py-3 shadow-xl'>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-primary' : 'text-black'}`
          }
        >
          {item.path === '/' ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='size-7'
            >
              <path
                fillRule='evenodd'
                d='M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path d='M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z' />
            </svg>
          )}
          <span className='text-center'>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};
