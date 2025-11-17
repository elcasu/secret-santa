import cx from "classnames";

interface EmptyViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function EmptyView({ children, className }: EmptyViewProps) {
  return (
    <div
      className={cx(
        "w-full h-24 flex items-center justify-center border border-gray-400 rounded-2xl",
        className ?? ""
      )}
    >
      {children}
    </div>
  );
}
