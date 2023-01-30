import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-http-a1bf1-default-rtdb.firebaseio.com/cartItems.json"
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      // Send sate as Sending Request

      const res = await fetch(
        "https://redux-http-a1bf1-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // Send state as Request is scuccessful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request to database successfully",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request failed",
          type: "error",
        })
      );
    }
  };
};
