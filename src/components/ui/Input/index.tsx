type propTypes = {
  name: string;
  label?: string;
  type: string;
  placeholder: string;
};
export default function Input({ name, label, type, placeholder }: propTypes) {
  return (
    <div className="flex flex-col gap-y-1 mt-5">
      {label && (
        <label htmlFor={name} className="font-bold text-base">
          {label}
        </label>
      )}
      <input type={type} className="outline-none bg-slate-200 p-2 rounded-sm" name={name} id={name} placeholder={placeholder} required />
    </div>
  );
}
