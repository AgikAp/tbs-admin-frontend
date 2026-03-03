import { useState } from "react";

const FloatingLabelInput = ({ label, value, onChange, ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mt-6">
      <input
        className={`block w-full px-4 py-2 text-lg border-b-2 appearance-none focus:outline-none bg-transparent transition-all duration-300 ${
          focused || value ? 'border-blue-500' : 'border-gray-300'
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        {...props}
      />
      <label
        className={`absolute top-0 left-0 px-4 text-lg text-gray-600 transition-all duration-300 transform ${
          focused || value
            ? '-translate-y-6 text-blue-500 text-sm -ml-4 py-2'
            : 'translate-y-2.5'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;