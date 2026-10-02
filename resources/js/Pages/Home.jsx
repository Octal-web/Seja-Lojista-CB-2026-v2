import { BrandAdvantages } from "@/Components/BrandAdvantages";
import { BusinessModelComparison } from "@/Components/BusinessModelComparison";
import { FaqDoubts } from "@/Components/FaqDoubts";
import { HeroBanner } from "@/Components/HeroBanner";
import { StoreForm } from "@/Components/StoreForm";
import { Stores } from "@/Components/Stores";
import { UnicasaAbout } from "@/Components/UnicasaAbout";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useSectionTracking } from "@/Hooks/useSectionTracking";

const Page = () => {
    useSectionTracking();

    return (
        <DefaultLayout>
            <HeroBanner />
            <Stores />
            <BusinessModelComparison />
            <BrandAdvantages />
            <UnicasaAbout />
            <StoreForm />
            <FaqDoubts />
        </DefaultLayout>
    );
};

export default Page;
