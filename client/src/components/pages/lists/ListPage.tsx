

import React from 'react'

import {NewList} from "./NewList"

interface ListPageProps {

}

const ListPage: React.FC<ListPageProps> = ({}) => {
        return(
        <div className='Page'>
            <NewList></NewList>
        </div>);
}

export {ListPage};