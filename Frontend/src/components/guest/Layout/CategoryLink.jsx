import React from 'react';

const CategoryLink = ({ category }) => {

    return (
        <div className='category-link'>
            <Link to={`/product/${category}`}>{category}</Link>
        </div>
    )
}

export default CategoryLink;
