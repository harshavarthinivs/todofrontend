import useCustomMediaQuery from "./useCustomMediaQuery";

const useSmallScreen = () => {
  return useCustomMediaQuery("(max-width:600px)");
};

export default useSmallScreen;
