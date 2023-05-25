import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

const Profile = ({
    profileInfo,
    showProfileModal,
    userRole
}) => {
    return (
        <div className='border rounded-2xl mb-8'>
            <div className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 relative">
                <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                    <img src="/assets/avatar.png" alt="avatar" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700" />
                    <div className="flex flex-col">
                        <h4 className="text-lg font-semibold text-center md:text-left">{profileInfo.name}</h4>
                        <p className="dark:text-gray-400 text-center md:text-left">{profileInfo.phone}</p>
                        <p className="dark:text-gray-400">{profileInfo.description}</p>
                    </div>
                </div>
                {
                    userRole === 1 &&
                    <div className='absolute top-5 right-5'>
                        <FaRegEdit className='cursor-pointer' onClick={showProfileModal} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;