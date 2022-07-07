function HeaderIcon({ Icon }) {
    return (
        <div className='cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-zl active:border-b-2 active:border-blue-500'>
            <Icon className='h-5 text-center sm:h-7 mx-auto hover:text-blue-500 '/>
        </div>
    );
}

export default HeaderIcon;