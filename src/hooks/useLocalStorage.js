export default function useLocalStorage(initialState) {
  const stateString = localStorage.getItem("state");
  const state =
    stateString !== null && stateString !== "undefined"
      ? JSON.parse(stateString)
      : initialState;
  const setState = newState =>
    localStorage.setItem("state", JSON.stringify(newState));

  return [state, setState];
}
