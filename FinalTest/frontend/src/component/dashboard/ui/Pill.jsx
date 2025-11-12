const Pill = ({ title }) =>{
    const pillBgMap = {
      delivered: "#00B69B",
      processing: "#6226EF",
      returned: "#EF3826",
    };
    const backgroundColor = pillBgMap[title] || "#d1d5db";
  
    return (
      <>
        <span
          style={{ backgroundColor }}
          className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-white capitalize"
        >
          {title}
        </span>
      </>
    );
  }
  export default Pill;