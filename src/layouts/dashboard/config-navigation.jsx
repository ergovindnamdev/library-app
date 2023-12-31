import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);


const navConfig = [
  {
    title: 'profile',
    path: '/profile',
    icon: icon('ic_profile_1'),
    auth: ["admin","user"],
  },
  {
    title: 'user',
    path: '/users-list',
    icon: icon('ic_users'),
    auth: ["admin"],
  },
  {
    title: 'books',
    path: '/books-list',
    icon: icon('ic_books'),
    auth: ["admin"],
  },
  {
    title: 'Library Trans',
    path: '/library-trans',
    icon: icon('ic_analytics'),
    auth: ["admin", 'user'],
  },
];

export default navConfig;
