import { FC, InputHTMLAttributes } from 'react';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ checked, onCheckedChange, className = '', ...props }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
        {...props}
      />
      <div
        className={`w-10 h-6 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out ${
          checked ? 'bg-indigo-600' : 'bg-gray-400'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </div>
    </label>
  );
};
