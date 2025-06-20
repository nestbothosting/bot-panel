import React from 'react'
import style from './PremiumMenu.module.css'

function BuyNow(price){
    if(!price) alert('Done!')
}

export default function PremiumMenu({ price, items }) {
    return (
        <div className={style.PremiumMenu} >
            <h1>{price ? `$${price}` : "Free"}</h1>
            {items.map((item, key) => {
                return(
                    <div key={key} className={ style.item }>
                        <p className={ style.title }>{item.icon} {item.title}</p>
                        <span>{item.description}</span>
                    </div>
                )
            })}
            <button className={ style.btn } onClick={() => BuyNow(price)}>Buy Now</button>
        </div>
    )
}
