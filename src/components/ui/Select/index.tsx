type option = {
  label: string;
  value: string;
};

type propTypes = {
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
  options: option[];
};
export default function Select({ name, label, disabled, defaultValue, options }: propTypes) {
  return (
    <div className="flex flex-col gap-y-1 mt-5 disabled:">
      {label && (
        <label htmlFor={name} className="font-bold text-base">
          {label}
        </label>
      )}
      <select className="outline-none bg-slate-200 p-2 rounded-sm disabled:opacity-50" name={name} id={name} defaultValue={defaultValue} disabled={disabled}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
