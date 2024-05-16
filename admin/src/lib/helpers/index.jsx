export function getOrderStatus(status) {
  switch (status) {
    case "Processing":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Transferred to delivery partner":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Delivered":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Refund":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Refund Success":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}
