import { createContext } from "react";

interface IGlobalUISetting {
  showLoading: (show: boolean) => void;
}

const context = createContext<IGlobalUISetting>({
  showLoading: () => {},
});

export default context;
