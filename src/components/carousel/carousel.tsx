import React, {
  ComponentPropsWithRef,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { Button, IconButton, clx } from "../ui"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselContextValue {
  emblaApi: EmblaCarouselType | undefined
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

const useCarouselContext = () => {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error(
      "useCarouselContext must be used within a Carousel component"
    )
  }

  return context
}

interface UsePrevNextButtonsType {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

interface UseDotButtonType {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

type CarouselProps = PropsWithChildren<{
  slides: React.ReactNode[]
  options?: EmblaOptionsType
}>

const Root = ({ slides, options, children }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  return (
    <CarouselContext.Provider value={{ emblaApi }}>
      <section className="relative mx-auto w-full max-w-6xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-2 flex touch-pan-y py-1 sm:-ml-3 lg:-ml-4">
            {slides.map((slide, index) => (
              <div
                className="lg:min-w-calc(100%/3) flex-[0_0_100%] pl-2 sm:flex-[0_0_50%] sm:pl-3 lg:flex-[0_0_calc((100%-2px)/3)] lg:pl-[17px] lg:pr-[1px]"
                key={index}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
        {children}
      </section>
    </CarouselContext.Provider>
  )
}

const ArrowButtons = ({ className }: ComponentPropsWithRef<"div">) => {
  const { emblaApi } = useCarouselContext()

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className={clx("grid grid-cols-2 items-center gap-2", className)}>
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  )
}

const PrevButton = (props: ComponentPropsWithRef<"button">) => {
  return (
    <IconButton rounded size="2xsmall" {...props}>
      <ChevronLeft size={12} />
    </IconButton>
  )
}

const NextButton = (props: ComponentPropsWithRef<"button">) => {
  return (
    <IconButton rounded size="2xsmall" {...props}>
      <ChevronRight size={12} />
    </IconButton>
  )
}

const Dots = ({ className }: ComponentPropsWithRef<"div">) => {
  const { emblaApi } = useCarouselContext()

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {scrollSnaps.map((_, index) => (
        <Button
          variant={index === selectedIndex ? "primary" : "secondary"}
          key={index}
          type="button"
          onClick={() => onDotButtonClick(index)}
          className={clx("h-2 w-2 touch-manipulation rounded-full p-0", {
            className,
          })}
        />
      ))}
    </div>
  )
}

export const Carousel = Object.assign(Root, { ArrowButtons, Dots })
