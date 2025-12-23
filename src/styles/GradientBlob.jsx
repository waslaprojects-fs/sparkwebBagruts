export default function HeroSection({ title }) {
  const GradientBlob = ({ positionStyles }) => (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 transform-gpu overflow-hidden blur-3xl -z-10 ${positionStyles} animate-flyIn`}
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#FFA500] to-[#ffdb99] opacity-30 sm:w-[72.1875rem]"
      />
    </div>
  );

  return (
    <div className="bg-white pb-0">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Top Gradient Blob */}
        <GradientBlob positionStyles="-top-40 sm:-top-80 left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] rotate-[30deg] animate-flyIn" />

        <h2 className="relative z-10 mt-4 text-3xl sm:text-xl md:text-2xl lg:text-4xl font-semibold flex justify-center items-center bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent text-center select-auto font-messiri mb-4 h-auto">
          {title}
        </h2>

        {/* Bottom Gradient Blob */}
        <GradientBlob positionStyles="-top-40 sm:-top-80 left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] rotate-[30deg] animate-flyIn" />
      </div>
    </div>
  );
}
