import React, { useRef } from "react";
import { useButton, useFocusRing, mergeProps } from "react-aria";

type CalendarButtonProps = {
  children: React.ReactNode;
} & ExtraProps;

export function CalendarButton(props: CalendarButtonProps) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`p-2 rounded-full text-black ${
        props.isDisabled ? "text-gray-400" : ""
      } ${
        !props.isDisabled ? "hover:bg-sky-100 active:bg-sky-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-offset-2 ring-sky-800" : ""
      }`}
    >
      {props.children}
    </button>
  );
}

type FieldButtonProps = {
  isPressed: boolean;
  children: React.ReactNode;
} & ExtraProps;

type ExtraProps = Parameters<typeof useButton>[0];

export function FieldButton(props: FieldButtonProps) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps, isPressed } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`px-2 -ml-px  rounded-r-full outline-none absolute right-0 h-8 ${
        isPressed || props.isPressed
          ? "bg-gray-200 border-gray-400"
          : "bg-gray-50 border-gray-300 "
      }`}
    >
      {props.children}
    </button>
  );
}
