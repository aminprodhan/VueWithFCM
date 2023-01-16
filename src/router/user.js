
import Booking from '@/components/user/booking/Index';
import AuthLogin from '@/components/user/auth/Login';
import PageLayout from '@/components/user/Index';
import RoomIndex from '@/components/user/room/Index';

export default [
    {
        path: '/user',
        redirect: '/user/index'
    },
    {
        path:'/user/login',
        component:AuthLogin
    },
    {
        path:'/user',
        component: PageLayout,
        children:[
            {
                path: '',
                redirect: '/user/index'
            },
            {
                path:'index',
                component:Booking
            },
            {
                path:'room',
                component:RoomIndex
            },
            
        ]
    },
]