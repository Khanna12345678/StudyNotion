import { apiConnector } from "../apiconnector";
import { categories } from "../apis";
import toast from "react-hot-toast";
const { CREATE_CATEGORY_API, DELETE_CATEGORY_API, EDIT_CATEGORY_API } =
  categories;

async function createCategory(data, token) {
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Category Created Successfully");
    return response;
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

async function editCategory(data, token) {
  try {
    console.log("In edit category operation", data);
    const response = await apiConnector("PUT", EDIT_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("In edit category operation", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Category Edited Successfully");
    return response;
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

async function deleteCategory(categoryId, token) {
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_CATEGORY_API,
      { categoryId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Category Deleted Successfully");
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
export { createCategory, deleteCategory, editCategory };
