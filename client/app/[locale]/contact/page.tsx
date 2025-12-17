
import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('Contact');

    return (
        <div className="min-h-screen pt-20 pb-16">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-secondary mb-4">{t('title')}</h1>
                    <p className="text-text-muted">{t('subtitle')}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-surface p-8 rounded-lg shadow-sm border border-border">
                            <h3 className="font-bold text-lg mb-4 text-secondary">Information</h3>
                            <div className="space-y-4 text-text-muted">
                                <p className="flex items-center gap-3">
                                    <span className="text-2xl">📍</span>
                                    {t('address')}
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-2xl">📧</span>
                                    {t('email')}
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-2xl">📞</span>
                                    {t('phone')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form className="bg-surface p-8 rounded-lg shadow-sm border border-border space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary">{t('form.name')}</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary">{t('form.email')}</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary">{t('form.message')}</label>
                                <textarea rows={6} className="w-full px-4 py-3 rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-full md:w-auto">
                                {t('form.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
