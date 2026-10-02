import React from 'react';
import { usePage } from '@inertiajs/react'

import DefaultLayout from '@/Layouts/DefaultLayout';
import { PolicyContent } from '@/Components/PolicyContent';

const Page = () => {
    const { texto } = usePage().props;

    return (
        <DefaultLayout>
            <section className="relative pt-20 pb-32">
                <div className="container max-w-small">
                    <PolicyContent content={{titulo: 'Política de Cookies', texto: texto}} />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;