
import { Outlet } from 'react-router';
import ProfileNav from "../components/profile/ProfileNav";
import ProfileTopSection from "../components/profile/ProfileTopSection";

export default function ProfileLayout() {


    return (
        <div className='min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50'>

            <main className='container mx-auto py-8 px-4'>
                <ProfileTopSection />
                <ProfileNav />
                <Outlet />
            </main>
        </div>
    )
}
