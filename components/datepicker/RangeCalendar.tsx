import { useRef } from "react";
import { useRangeCalendarState } from "react-stately";
import {
  useRangeCalendar,
  useLocale,
  CalendarProps,
  useDateFormatter,
} from "react-aria";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { locale } from "./myLocale";

type RangeCalendarProps = {} & ExtraProps;
type ExtraProps = Parameters<typeof useRangeCalendar>[0];
const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "long",
  // dateStyle: "short",
});

export function RangeCalendar(props: RangeCalendarProps) {
  // let { locale } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    locale,
    // locale: "es-MX",
    createCalendar,
  });

  let ref = useRef<HTMLDivElement>(null);
  let { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  const year = state.visibleRange.start.year;
  const month = state.visibleRange.start.month;
  const dummyDate = new Date(year, month - 1);
  const fDate = dateFormatter.format(dummyDate).replaceAll(" de ", " ");

  return (
    <div {...calendarProps} ref={ref} className="inline-block">
      <div className="flex items-center pb-4">
        <h2 className="flex-1 font-bold text-xl ml-2 text-black">
          {`${fDate[0].toUpperCase() + fDate.slice(1)}`}
          {/* {title} */}
        </h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-6 w-6" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
