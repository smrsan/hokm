import { useState, useRef, useMemo, useCallback } from "react";

/**
 * useStateRef
 * @template T
 * @param {T} initState
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>]}
 */
const useStateRef = (initState) => {
    const [state, _setState] = useState(initState),
        stateRef = useRef(state),
        immutableStateRef = useMemo(
            () =>
                Object.freeze({
                    set current(value) {},
                    // prettier-ignore
                    get current() { return stateRef.current },
                }),
            []
        ),
        /**
         * @type {React.Dispatch<React.SetStateAction<T>>}
         */
        setState = useCallback(
            (newState) =>
                typeof newState === "function"
                    ? _setState(
                          (prevState) =>
                              (stateRef.current = newState(prevState))
                      )
                    : _setState((stateRef.current = newState)),
            []
        );

    return [state, setState, immutableStateRef];
};

export default useStateRef;
