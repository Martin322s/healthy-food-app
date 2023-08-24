import requester from "./requester";

// const baseUrl = "https://healthy-food-api.onrender.com/products";
const baseUrl = 'http://localhost:3030/products';

export const getAll = () => requester.get(`${baseUrl}/all`);
export const getOne = (id) => requester.get(`${baseUrl}/${id}`);
export const getOwned = (userId) => requester.get(`${baseUrl}/profile/${userId}`);

export const createProduct = (productData, token, userId) => requester.post(
    `${baseUrl}/create`,
    { ...productData, _ownerId: userId },
    { 'X-Authorization': token }
);

export const deleteProduct = (id, token) => requester.delete(
    `${baseUrl}/delete/${id}`,
    { 'X-Authorization': token }
);

export const editProduct = (productData, token, id) => requester.put(
    `${baseUrl}/edit/${id}`,
    { 'X-Authorization': token },
    productData
);