import React from 'react';

import { Text } from './Text';
import { FormError } from './FormField';

const options = [
    { value: '1', label: 'Sim' },
    { value: '0', label: 'Não' },
];

export const FormRadioGroup = ({ name, label, value, errors, onChange }) => {
    return (
        <div>
            <Text as="p" variant="none" weight="medium" className="mb-3 text-sm leading-snug text-primary">
                {label}
            </Text>

            <div className="flex flex-wrap gap-4">
                {options.map((option) => (
                    <label key={`${name}-${option.value}`} className="flex cursor-pointer items-center gap-2 text-sm text-primary">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            className="size-4 border-primary text-primary focus:ring-primary/20"
                        />

                        <span>{option.label}</span>
                    </label>
                ))}
            </div>

            <FormError errors={errors} field={name} />
        </div>
    );
};