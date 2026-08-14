import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, CartItem } from '../shared/context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalCount,
  } = useCart();
  const navigate = useNavigate();

  return (
    <div className={styles.cartPage}>
      <button
        type="button"
        className={styles.cartPage__backBtn}
        onClick={() => navigate(-1)}
      >
        &lt; Back
      </button>

      <h1 className={styles.cartPage__title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.cartPage__empty}>Your cart is empty</div>
      ) : (
        <div className={styles.cartPage__content}>
          <div className={styles.cartPage__list}>
            {cart.map(({ product, quantity }: CartItem) => {
              const productId = product.itemId || product.id;

              return (
                <div key={productId} className={styles.cartItem}>
                  <div className={styles.cartItem__top}>
                    <button
                      type="button"
                      className={styles.cartItem__remove}
                      onClick={() => removeFromCart(productId)}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.cartItem__image}
                    />
                    <span className={styles.cartItem__title}>
                      {product.name}
                    </span>
                  </div>

                  <div className={styles.cartItem__bottom}>
                    <div className={styles.cartItem__quantity}>
                      <button
                        type="button"
                        className={styles.cartItem__qtyBtn}
                        disabled={quantity <= 1}
                        onClick={() => decreaseQuantity(productId)}
                      >
                        −
                      </button>
                      <span className={styles.cartItem__count}>{quantity}</span>
                      <button
                        type="button"
                        className={styles.cartItem__qtyBtn}
                        onClick={() => increaseQuantity(productId)}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.cartItem__price}>
                      ${product.price * quantity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cartPage__summary}>
            <div className={styles.cartPage__totalPrice}>${totalPrice}</div>
            <div className={styles.cartPage__totalCount}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </div>
            <div className={styles.cartPage__divider} />
            <button
              type="button"
              className={styles.cartPage__checkoutBtn}
              onClick={() => alert('Checkout is not implemented yet')}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};