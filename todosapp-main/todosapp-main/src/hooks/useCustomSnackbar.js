import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { dequeue } from "../redux/slices/snackbarSlice";

/**
 * An example on how to use it
 *
 * dispatch(enqueue({ message: "Your message", variant: "variant" }));
 */

const useCustomSnackbar = () => {
  const message = useSelector((state) => state.snackbar.message);
  const variant = useSelector((state) => state.snackbar.variant);
  const open = useSelector((state) => state.snackbar.open);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      enqueueSnackbar(message, { variant });
      dispatch(dequeue());
    }
  }, [message, variant, open, dispatch]);
};

export default useCustomSnackbar;
