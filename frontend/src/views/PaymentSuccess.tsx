export const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 md:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-orange-100 bg-orange-50 px-6 py-6 md:px-8">
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                  Payment complete
                </p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Your points are on the way
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <p className="text-base leading-7 text-slate-600">
              Thank you. Your payment was completed successfully and your
              Marketplace points should be added to your account shortly.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Confirmed
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Account
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Points updating
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Next step
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Promote listings
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
              <a
                href="/listings"
                className="rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400 active:scale-[0.98]"
              >
                Browse listings
              </a>
              <a
                href="/createlisting"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Create listing
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
