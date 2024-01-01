const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className={`px-3 py-2 outline-none rounded-md bg-gray-800/50 ${props.className}`}
    />
  );
};

export const Textarea: React.FC<
  React.InputHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
  return (
    <textarea
      {...props}
      className={`px-3 py-2 outline-none rounded-md bg-gray-800/50 resize-none h-[200px] ${props.className}`}
    />
  );
};

export default Input;
