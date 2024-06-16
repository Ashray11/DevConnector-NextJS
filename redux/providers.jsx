"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

export function Providers({ children }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
