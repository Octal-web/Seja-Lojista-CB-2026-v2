import React from 'react';

import { Text } from './Text';

export const FormError = ({ errors, field, id }) => {
    if (!errors?.[field]) return null;

    return (
        <Text id={id} as="p" variant="none" weight="normal" className="mt-1.5 bg-red-900 px-3 py-1.5 text-xs leading-snug text-white">
            {errors[field]}
        </Text>
    );
};

export const FormField = ({ id, name = id, label, errors, children }) => {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="mb-2 block text-sm font-normal text-primary">
                    {label}
                </label>
            )}

            {children}

            <FormError id={`${id}-error`} errors={errors} field={name} />
        </div>
    );
};
