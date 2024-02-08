type propTypes = {
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  defaultValue?: string;
};
export default function Input({ name, label, type, placeholder, disabled, defaultValue }: propTypes) {
  return (
    <div className="flex flex-col gap-y-1 mt-5 disabled:">
      {label && (
        <label htmlFor={name} className="font-bold text-base">
          {label}
        </label>
      )}
      <input type={type} className="outline-none bg-slate-200 p-2 rounded-sm disabled:opacity-50" name={name} id={name} placeholder={placeholder} disabled={disabled} defaultValue={defaultValue} required />
    </div>
  );
}
