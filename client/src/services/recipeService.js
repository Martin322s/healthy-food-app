const baseUrl = "http://localhost:3030/recipes";

export const createRecipe = (token, data) => {
    return fetch(`${baseUrl}/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json());
};