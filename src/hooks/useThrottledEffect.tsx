import { useEffect } from "react"

export default function useThrottledEffect(effect: (...arg: any) => void, timeout: number, deps: any[]) {
  useEffect(() => {
    const handle = setTimeout(effect, timeout)

    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout, ...deps])
}
