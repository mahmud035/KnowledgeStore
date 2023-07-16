const Spinner = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-7xl font-thin">L</p>
      <div className="mt-5 h-10 w-10 animate-spin rounded-full border-8 border-dashed border-[#DA9323]"></div>
      <p className="text-7xl font-thin">ading....</p>
    </div>
  );
};

export default Spinner;
