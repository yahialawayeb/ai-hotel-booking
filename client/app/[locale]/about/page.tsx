
import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('About');

    return (
        <div className="min-h-screen pt-20 pb-16">
            <div className="container-custom">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-secondary mb-6">{t('title')}</h1>
                    <p className="text-lg text-text-muted leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative h-[400px] rounded-lg overflow-hidden shadow-premium">
                        <img
                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                            alt="Hotel Lobby"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-secondary">{t('mission')}</h2>
                        <p className="text-text-muted">
                            {t('missionText')}
                        </p>
                        <div className="h-px bg-border my-6"></div>
                        <h2 className="text-2xl font-bold text-secondary">{t('values')}</h2>
                        <p className="text-text-muted">
                            {t('valuesText')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
