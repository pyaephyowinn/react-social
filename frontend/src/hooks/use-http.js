import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "sending",
    };
  }
  if (action.type === "SUCCESS") {
    // console.log('success');
    return {
      data: action.data,
      error: null,
      status: "completed",
    };
  }
  if (action.type === "ERROR") {
    // console.log('error');
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }
  return {
    data: null,
    error: null,
    status: "completed",
  };
};

const useHttp = (requestFunction) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    status: "",
  });

  const sendRequest = useCallback( async (data, id, content) => {
    dispatch({ type: "SEND" });
    try {
      const responseData = await requestFunction(data, id, content);
      dispatch({ type: "SUCCESS", data: responseData });
    } catch (e) {
      dispatch({
        type: "ERROR",
        errorMessage: e.message || "Something went wrong",
      });
    }
  }, [requestFunction]);

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;