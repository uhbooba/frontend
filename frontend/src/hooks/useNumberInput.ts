import { useState, useCallback } from 'react';

interface UseNumberInputOptions {
  maxLength?: number;
  initialValue?: string;
}

export const useNumberInput = ({
  maxLength,
  initialValue = '',
}: UseNumberInputOptions = {}) => {
  const [value, setValue] = useState(initialValue);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, '');
      setValue(newValue);

      if (maxLength) {
        setIsComplete(newValue.length === maxLength);
      }
    },
    [maxLength],
  );

  return {
    value,
    isComplete,
    onChange: handleChange,
    setValue,
  };
};
