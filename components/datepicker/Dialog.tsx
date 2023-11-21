import { AriaDialogProps, useDialog } from "react-aria";
import React from "react";

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type Props = {
  title: string;
  children: React.ReactNode;
} & ExtraPops;

type ExtraPops = Parameters<typeof useDialog>[0];

export function Dialog({ title, children, ...props }: Props) {
  let ref = React.useRef<HTMLDivElement>(null);
  let { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
}
