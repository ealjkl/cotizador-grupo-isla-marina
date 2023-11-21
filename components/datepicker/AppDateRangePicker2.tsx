"use client";

import { useRef } from "react";
import { useDateRangePickerState } from "react-stately";
import { useDateRangePicker } from "react-aria";
import { FieldButton } from "./Button";
import { RangeCalendar } from "./RangeCalendar";
import { DateField } from "./DateField";
import { Popover } from "./Popover";
import { Dialog } from "./Dialog";
import { CalendarIcon, ExclamationIcon } from "@heroicons/react/outline";

type AppDateRangePickerProps = {} & ExtraProps;

type ExtraProps = Parameters<typeof useDateRangePicker>[0];

export function AppDateRangePicker(props: AppDateRangePickerProps) {
  let state = useDateRangePickerState(props);
  let ref = useRef<HTMLDivElement>(null);
  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left w-96 ">
      <label {...labelProps} className="text-lg ">
        {props.label}
      </label>
      <div {...groupProps} ref={ref} className="flex group text-black">
        <div
          className="flex bg-white border border-gray-300 group-hover:border-gray-400  rounded-full group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 px-3 relative -mx-3 w-[120%]
        h-10
        items-center
        "
        >
          <DateField {...startFieldProps} />
          <span aria-hidden="true" className="px-2">
            –
          </span>
          <DateField {...endFieldProps} />
          {state.isInvalid && (
            <ExclamationIcon className="w-6 h-6  text-red-500 absolute right-10" />
          )}
          <FieldButton {...buttonProps} isPressed={state.isOpen}>
            <CalendarIcon className="w-6 h-6 text-gray-700" />
          </FieldButton>
        </div>
      </div>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog {...dialogProps} title="Date">
            <RangeCalendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
}
