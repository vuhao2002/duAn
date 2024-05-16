const Message = ({ variant, children }) => {
  return <div className={`alert ${variant} text-red-800`}>{children}</div>;
};

Message.defaultProps = {
  variant: "alert-info",
};
export default Message;
