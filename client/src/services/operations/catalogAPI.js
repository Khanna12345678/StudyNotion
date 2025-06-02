import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
const { CATEGORY_PAGE_DETAILS_API } = courseEndpoints;

export async function getCatalogPageData(categoryId) {
  let result = null;
  const toastId = toast.loading("loading...");
  try {
    const response = await apiConnector("POST", CATEGORY_PAGE_DETAILS_API, {
      categoryId,
    });

    if (!response?.data?.success) {
      throw new Error("Could Not get Category page Details");
    }
    result = response?.data?.data;
  } catch (err) {}
  toast.dismiss(toastId);
  return result;
}
