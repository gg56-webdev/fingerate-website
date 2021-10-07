import Head from 'next/head';
import {
    Hero,
    Header,
    About,
    Feed,
    Contact,
    Footer,
    Social,
    Promo,
} from '../components';
import { useRouter } from 'next/router';

import en from '../locales/en/index.json';
import ko from '../locales/ko/index.json';

export default function Home() {
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : ko;

    return (
        <>
            <Head>
                <title>{t.title}</title>
                <meta name='description' content={t.description} />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Header />
            <main>
                <Hero text={t.sections.hero} />
                <Promo text={t.sections.promo} />
                <About text={t.sections.about} />
                <Feed text={t.sections.feed} />
                {/* <Social text={t.sections.social} /> */}
                <Contact text={t.sections.contact} />
            </main>
            <Footer />
        </>
    );
}
