import React from 'react'

interface NavCardProps {
    title: string;
}

export const NavCard: React.FC<NavCardProps> = (props) => {
        return (
            <div className='NavCard'>
                {props.title}
            </div>
        );
}