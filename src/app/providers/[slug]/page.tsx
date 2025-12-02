import { ProvidersInfo } from "../../data/providers";
import ProviderDetailsClient from "./providerdetailsclient";

export default function ProviderDetailsPage({ params }: { params: { slug: string } }) {
  const routeSlug = decodeURIComponent(params.slug);

  const provider = ProvidersInfo.find((p) => {
    const anyP = p as any;
    const i18n = anyP.slug_i18n || {};
    const values: string[] = Object.values(i18n);
    return p.slug === routeSlug || values.includes(routeSlug);
  });

  if (!provider) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-red-500">Provider not found.</p>
      </div>
    );
  }

  return (
    <ProviderDetailsClient
      provider={provider as any}
      routeSlug={routeSlug}
    />
  );
}
