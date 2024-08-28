import { useState, useLayoutEffect } from "react"

export const useTruncatedElement = ({
  ref,
}: {
  ref: React.MutableRefObject<any>
}) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const [isShowingMore, setIsShowingMore] = useState(false)

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {}

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true)
    } else {
      setIsTruncated(false)
    }
  }, [ref])

  const toggleIsShowingMore: React.MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault()
    setIsShowingMore((prev) => !prev)
  }

  return {
    isTruncated,
    isShowingMore,
    toggleIsShowingMore,
  }
}
