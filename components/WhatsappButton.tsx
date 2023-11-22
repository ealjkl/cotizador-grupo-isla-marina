import React from "react";

type WhatsappButtonProps = {
  phoneNumber: string;
  message: string;
  children: React.ReactNode;
} & ExtraProps;

type ExtraProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
export default function WhatsappButton(props: WhatsappButtonProps) {
  const { phoneNumber, message, children, ..._props } = props;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  return (
    <a
      href={whatsappLink}
      {..._props}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
