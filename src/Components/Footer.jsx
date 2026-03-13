function Footer() {
  return (
    <footer className="mt-8 md:mt-12 px-3 sm:px-4 md:px-6 pb-4 md:pb-6">
      <div className="mx-auto max-w-7xl rounded-[24px] md:rounded-[28px] border border-white/15 bg-white/10 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-5 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:text-left md:flex-row">
          <div>
            <p className="text-sm sm:text-base font-medium text-white">
              Weather Outfit Advisor
            </p>
            <p className="mt-1 text-xs sm:text-sm text-white/60">
              Vérifiez la météo et adaptez votre tenue facilement.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-white/70">
            by <span className="font-semibold text-white">Franz Julien</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;