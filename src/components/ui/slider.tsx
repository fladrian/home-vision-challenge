import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50",
        className
      )}
      style={{ height: '20px' }}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative w-full overflow-hidden rounded-full bg-zinc-300 dark:bg-zinc-600"
        style={{ height: '6px', flexShrink: 0 }}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          style={{ position: 'absolute', height: '100%' }}
          className="bg-primary"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full border-2 border-primary bg-white shadow-md ring-primary/30 transition-[box-shadow] select-none hover:ring-4 focus-visible:ring-4 focus-visible:outline-none active:ring-4 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
