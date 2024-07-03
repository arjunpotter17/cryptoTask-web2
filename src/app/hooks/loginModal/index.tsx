import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";

const PopupContext = createContext<Record<string, any>>({});

export const PopupProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [permissionModal, setPermissionModal] = useState<boolean>(false);
  const contextValue = useMemo(() => {
    return {
      permissionModal,
      setPermissionModal,
    };
  }, [permissionModal, setPermissionModal]);

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePermissionModal = (): Record<string, any> =>
  useContext(PopupContext);
