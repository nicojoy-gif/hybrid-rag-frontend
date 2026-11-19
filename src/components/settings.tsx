import { PageHeading } from "./page-heading";


export function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[850px]">
        <PageHeading
          eyebrow="Workspace"
          title="Settings"
          description="Manage your Knowbase workspace preferences."
        />
        <section className="mt-8 overflow-hidden rounded-2xl border border-[#e4e8e1] bg-white">
          <div className="border-b border-[#eceee9] px-5 py-4">
            <h2 className="text-[13px] font-semibold text-[#3d443d]">
              Workspace
            </h2>
            <p className="mt-1 text-[11px] text-[#8b928a]">
              Basic information about this environment.
            </p>
          </div>
          <dl className="divide-y divide-[#eff0ed]">
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
              <dt className="text-[12px] font-medium text-[#555c55]">Workspace name</dt>
              <dd className="text-[12px] text-[#818880]">Acme Company</dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
              <dt className="text-[12px] font-medium text-[#555c55]">Appearance</dt>
              <dd className="text-[12px] text-[#818880]">Light</dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
              <dt className="text-[12px] font-medium text-[#555c55]">Chat service</dt>
              <dd className="flex items-center gap-2 text-[12px] text-[#818880]">
                Configured through NEXT_PUBLIC_API_URL
                <span className="h-1.5 w-1.5 rounded-full bg-[#9eaa9f]" />
              </dd>
            </div>
          </dl>
        </section>
        <p className="mt-4 text-[11px] leading-5 text-[#979d95]">
          Workspace preferences and service availability checks will be configurable
          here in a future release.
        </p>
      </div>
    </div>
  );
}
