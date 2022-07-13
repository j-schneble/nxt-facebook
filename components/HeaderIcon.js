function HeaderIcon({ Icon, active }) {
    return (
        <div className='cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-zl active:border-b-2 active:border-blue-500'>
            <Icon className='h-5 mx-auto text-center text-gray-500 sm:h-7 hover:text-blue-500 active:bg-blue-500'/>
        </div>
    );
}

export default HeaderIcon;