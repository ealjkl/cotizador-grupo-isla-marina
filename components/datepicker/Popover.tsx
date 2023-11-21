import * as React from "react";
import { ReactNode } from "react";
import {
  usePopover,
  AriaPopoverProps,
  Overlay,
  DismissButton,
} from "@react-aria/overlays";

type State = Parameters<typeof usePopover>[1];
type UsePopOverProps = Parameters<typeof usePopover>[0];

type PopoverProps = {
  children: ReactNode;
  state: State;
} & Omit<UsePopOverProps, "popoverRef">;

export function Popover(props: PopoverProps) {
  let ref = React.useRef(null);
  let { state, children } = props;

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state
  );

  return (
    <React.Fragment>
      <Overlay>
        <div {...underlayProps} className="fixed inset-0" />
        <div
          {...popoverProps}
          ref={ref}
          className="absolute top-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 p-8 z-10"
        >
          <DismissButton onDismiss={state.close} />
          {children}
          <DismissButton onDismiss={state.close} />
        </div>
      </Overlay>
    </React.Fragment>
  );
}
