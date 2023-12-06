export type ShowIfProps = {
  condition: boolean;
  children: React.ReactNode;
};
export default function ShowIf({ children, condition }: ShowIfProps) {
  return condition ? children : null;
}
