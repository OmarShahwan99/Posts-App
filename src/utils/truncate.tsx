const Truncate = ({ children }: { children: string }) => {
  return (
    <>{children.length > 170 ? children.slice(0, 170) + "..." : children}</>
  );
};

export default Truncate;
