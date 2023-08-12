type Props = {
  label: string;
  background?: string;
  filled: boolean;
  focused: boolean;
  error: boolean;
  helperText?: string | null;
  children: React.ReactNode;
};

const Field = ({
  label,
  background,
  filled,
  focused,
  error,
  helperText,
  children,
}: Props) => (
  <>
    <div
      className="rounded-3xl bg-neutral-600 transition hover:bg-neutral-500"
      style={background ? { backgroundColor: background } : {}}
    >
      <p
        className={`
    ${filled || focused ? 'translate-y-0 text-s' : 'translate-y-m text-l'} ${
      error ? 'text-red-600/70' : ''
    } ${
      focused ? 'text-primary-100' : ''
    } absolute translate-x-4 font-normal text-gray-300  transition-all`}
      >
        {label}
      </p>
      {children}
    </div>
    <p
      className={`${
        !helperText ? 'hidden' : ''
      } absolute translate-y-[-10px] pl-5 text-s font-normal text-red-600/70`}
    >
      {helperText}
    </p>
  </>
);

export default Field;
