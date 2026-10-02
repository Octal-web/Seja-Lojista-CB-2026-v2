import React from 'react';

import DefaultLayout from '@/Layouts/DefaultLayout';
import { SecondStepForm } from '@/Components/SecondStepForm';

const Page = () => {
    return (
        <DefaultLayout>
            <section className="relative pt-20 pb-32">
                <div className="container max-w-small">
                    <SecondStepForm />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;