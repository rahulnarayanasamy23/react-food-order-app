import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const [btnIsHighlighted, setBtnIshighlighted] = useState(false);

    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ""}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIshighlighted(true);

        const timer = setTimeout(() => {
            setBtnIshighlighted(false);
        }, (300));
        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span> Your Cart </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;