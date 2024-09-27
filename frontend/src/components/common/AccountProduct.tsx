import React from 'react'
import { useNavigate } from 'react-router';

type AccountProductProps = {
    name: string;
    description: string;
    moveTo: string;
};

const AccountProduct: React.FC<AccountProductProps> = ({ name, description, moveTo }) => {
    const navigate = useNavigate();

    return(
        <div 
            className='w-[320px] h-[128px] bg-[#FFAF2A] rounded-xl mt-[20px] text-center'
            onClick={() => navigate(moveTo)}
            >
                <div className='mt-6 mb-[5px] font-bold'>
                    <div className='text-[24px] text-[#5A6A59]'>{ name }</div>
                    <div className='mt-6 text-[18px]'>{ description }</div>
                </div>
        </div>
    );
};

export default AccountProduct;