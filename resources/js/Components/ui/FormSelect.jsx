import React from 'react';
import Select from 'react-select';

import { FormField } from './FormField';

const getSelectClassNames = (compact) => ({
    control: ({ isFocused }) => [
        'h-[44px] rounded-[10px] border bg-white px-1 text-sm shadow-none transition-colors',
        compact ? 'max-md:h-10' : '',
        isFocused ? 'border-primary/60' : 'border-[#e8ded3]',
    ].join(' '),
    valueContainer: () => 'px-4 py-0',
    placeholder: () => 'text-primary/30 focus:ring-0',
    singleValue: () => '!text-primary',
    input: () => 'text-primary [&_input]:ring-0',
    indicatorSeparator: () => 'hidden',
    dropdownIndicator: () => 'px-3 text-primary',
    menu: () => 'z-30 overflow-hidden rounded-[10px] border border-[#e8ded3] bg-white shadow-[0_18px_40px_rgba(78,54,41,.12)]',
    menuList: () => 'p-0',
    option: ({ isFocused, isSelected }) => [
        'cursor-pointer px-4 py-3 text-sm text-primary',
        isSelected ? 'bg-secondary' : isFocused ? 'bg-[#f5f5f5]' : 'bg-white',
    ].join(' '),
});

export const FormSelect = ({ id, name = id, label, options, value, errors, onChange, searchable = false, placeholder = 'Selecione', compact = false }) => {
    const selectedOption = options.find((option) => option.value === value) ?? null;

    return (
        <FormField id={id} name={name} label={label} errors={errors}>
            <div data-lenis-prevent>
                <Select
                    inputId={id}
                    instanceId={id}
                    name={name}
                    aria-invalid={Boolean(errors?.[name])}
                    aria-describedby={errors?.[name] ? `${id}-error` : undefined}
                    options={options}
                    value={selectedOption}
                    onChange={(option) => onChange(name, option)}
                    placeholder={placeholder}
                    classNames={getSelectClassNames(compact)}
                    unstyled
                    isSearchable={searchable}
                />
            </div>
        </FormField>
    );
};
