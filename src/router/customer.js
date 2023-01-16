
import PageLayout from '@/components/customer/Index';
import AuthLogin from '@/components/customer/auth/Login';
import LandingPage from '@/components/customer/LandingPage';
import Booking from '@/components/customer/booking/Index';
import BookingList from '@/components/customer/booking/List';

export default [
    {
        path: '/',
        redirect: '/customer/index'
    },
    {
        path:'/customer/login',
        component:AuthLogin
    },
    {
        path:'/customer',
        component: PageLayout,
        children:[
            {
                path: '',
                redirect: '/customer/index'
            },
            {
                path:'index',
                component:LandingPage
            },
            
            {
                path:'booking',
                component:Booking
            },
            {
                path:'booking-list',
                component:BookingList
            },
        ]
    },
]