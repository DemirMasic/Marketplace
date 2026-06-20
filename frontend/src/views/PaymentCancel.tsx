export const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-6 md:px-8">
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
                !
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Checkout cancelled
                </p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  No payment was taken
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <p className="text-base leading-7 text-slate-600">
              You cancelled the payment before it was completed. Your account
              has not been charged, and you can return whenever you are ready.
            </p>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Still want to boost a listing?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Buy points from your profile and use them to highlight listings
                across the marketplace.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
              <a
                href="/listings"
                className="rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400 active:scale-[0.98]"
              >
                Browse listings
              </a>
              <a
                href="/"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back home
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
