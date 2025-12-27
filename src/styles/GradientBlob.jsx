export default function HeroSection({ title }) {
  const GradientBlob = ({ positionStyles }) => (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 transform-gpu overflow-hidden blur-3xl -z-10 ${positionStyles}`}
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-orange-200 via-amber-100 to-orange-100 opacity-40 sm:w-[72.1875rem]"
      />
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white pb-12 pt-20">
      <div className="relative isolate mx-auto max-w-7xl px-6 lg:px-8">
        <GradientBlob positionStyles="-top-24 -right-24 sm:-top-32 sm:-right-32" />
        <GradientBlob positionStyles="-bottom-24 -left-24 sm:-bottom-32 sm:-left-32" />
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl font-messiri">
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto font-messiri">
            اختر الامتحان الذي تريد البچاريت عليه وابدأ رحلتك نحو النجاح
          </p>
        </div>
      </div>
    </div>
  );
}
