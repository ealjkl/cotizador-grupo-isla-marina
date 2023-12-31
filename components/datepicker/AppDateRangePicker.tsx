"use client";

import { useRef } from "react";
import { DateRangePickerState, useDateRangePickerState } from "react-stately";
import { useDateRangePicker } from "react-aria";
import { FieldButton } from "./Button";
import { RangeCalendar } from "./RangeCalendar";
import { DateField } from "./DateField";
// import { Popover } from "./Popover";
// import { Dialog } from "./Dialog";
import { CalendarIcon, ExclamationIcon } from "@heroicons/react/outline";
import { Popover, Dialog } from "react-aria-components";

type AppDateRangeState = {};
type AppDateRangePickerProps = {
  state: DateRangePickerState;
} & ExtraProps;

type ExtraProps = Parameters<typeof useDateRangePicker>[0];

export function AppDateRangePicker(props: AppDateRangePickerProps) {
  let ref = useRef<HTMLDivElement>(null);
  const { state } = props;
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
    <div className="relative inline-flex flex-col text-left w-full">
      <label {...labelProps} className="text-lg ">
        {props.label}
      </label>
      <div {...groupProps} ref={ref} className="flex group text-black">
        <div
          className="flex bg-white border border-gray-300 group-hover:border-gray-400  rounded-full group-focus-within:border-sky-600 group-focus-within:group-hover:border-sky-600 px-3 relative -mx-3 w-[120%]
          h-10
          items-center
          "
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            buttonProps.onPress && buttonProps.onPress(ev as any);
          }}
        >
          <DateField {...startFieldProps} />
          <span aria-hidden="true" className="px-2 ml-2">
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
      {
        <Popover
          placement="bottom end"
          isOpen={state.isOpen}
          triggerRef={ref}
          onOpenChange={(open: boolean) => state.setOpen(open)}
          className="bg-white border border-gray-300 rounded-md shadow-lg mt-2 p-8 overflow-auto"
          style={{
            overflow: "auto",
          }}
        >
          <Dialog {...dialogProps} aria-label="datepicker">
            <RangeCalendar {...calendarProps} />
          </Dialog>
        </Popover>
      }
    </div>
  );
}
