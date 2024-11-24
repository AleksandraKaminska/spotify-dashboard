import * as React from "react"
import { Image } from "lucide-react"

import { clx } from "@/utils/clx"
import { Hint } from "../hint"
import { Text } from "../text"
import { useTruncatedElement } from "@/hooks/use-truncated-element"
import { useTranslation } from "react-i18next"

interface InfoBoxProps {
  /** The main label or title for the InfoBox */
  label: string | React.ReactNode
  /** Optional description text to provide more information */
  description?: string
  /** Optional image URL to display at the top of the InfoBox */
  image?: string
  /** Additional custom class names to apply to the InfoBox */
  className?: string
  /** Any additional React nodes (elements) to be displayed within the InfoBox */
  children?: React.ReactNode
}

const InfoBox = React.forwardRef<HTMLDivElement, InfoBoxProps>(
  (
    { className, label, description, image = null, children, ...props },
    ref
  ) => {
    const { t } = useTranslation()
    const hintRef = React.useRef(null)
    const { isTruncated, isShowingMore, toggleIsShowingMore } =
      useTruncatedElement({
        ref: hintRef,
      })
    const withImage = image !== null

    return (
      <div
        ref={ref}
        className={clx(
          "group flex items-start gap-x-2 rounded-lg bg-ui-bg-base shadow-borders-base transition-fg focus-visible:shadow-borders-interactive-with-focus disabled:cursor-not-allowed disabled:bg-ui-bg-disabled",
          { "relative flex-col": withImage },
          { "p-3": !withImage },
          className
        )}
        {...props}
      >
        {children}
        {image && (
          <img
            src={image}
            alt=""
            className="aspect-[640/640] h-auto w-full rounded-t-lg object-cover"
          />
        )}
        {withImage && !image && (
          <div className="flex aspect-[640/640] h-auto w-full items-center justify-center bg-ui-bg-subtle">
            <Image className="text-ui-fg-subtle" />
          </div>
        )}
        <div className={clx("flex flex-col items-start", { "p-3": withImage })}>
          <Text
            size="small"
            weight="plus"
            className="cursor-pointer group-disabled:cursor-not-allowed group-disabled:text-ui-fg-disabled"
          >
            {label}
          </Text>
          <Hint
            ref={hintRef}
            className={clx(
              "txt-compact-medium break-words text-left text-ui-fg-subtle group-disabled:text-ui-fg-disabled",
              { "line-clamp-3": !isShowingMore }
            )}
          >
            {description}
          </Hint>
          {isTruncated && (
            <div role="button" onClick={toggleIsShowingMore} className="mt-2">
              {isShowingMore ? t("general.showLess") : t("general.showMore")}
            </div>
          )}
        </div>
      </div>
    )
  }
)

export { InfoBox }
