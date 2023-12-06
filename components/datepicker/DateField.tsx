import { useRef, ReactNode } from "react";
import { useDateFieldState, DateFieldState } from "react-stately";
import { useDateField, useDateSegment, useLocale } from "react-aria";
import { createCalendar } from "@internationalized/date";
import useMyLocale from "@/utils/useMyLocale";

interface DateFieldProps {}

interface DateSegmentProps {
  segment: any; // Replace with the appropriate type for the segment
  state: DateFieldState;
}

export function DateField(props: DateFieldProps): JSX.Element {
  // let { locale } = useLocale();
  const locale = useMyLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  // let ref = useRef<HTMLDivElement>(null);
  // let { fieldProps } = useDateField(props, state, ref);

  return (
    // <div {...fieldProps} ref={ref} className="flex">
    <div className="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

function DateSegment({ segment, state }: DateSegmentProps): JSX.Element {
  // let ref = useRef<HTMLDivElement>(null);
  // let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      // {...segmentProps}
      // ref={ref}
      style={{
        // ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? String(segment.maxValue).length + "ch"
            : undefined,
      }}
      className={`px-[0.05rem] md:px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-sky-600 focus:text-white group ${
        !segment.isEditable ? "text-gray-500" : "text-gray-800"
      }
      text-base`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white text-sm md:text-base"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}
