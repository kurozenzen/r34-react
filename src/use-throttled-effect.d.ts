declare module 'use-throttled-effect' {
  declare type useThrottledEffectHook = (callback: () => void, delay: number, deps: any[]) => () => void
  export const useThrottledEffect: useThrottledEffectHook
  export default useThrottledEffect
}
