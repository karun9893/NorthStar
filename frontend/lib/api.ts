// lib/api.ts
// Ye file backend APIs call karegi

const BASE_URL = "http://localhost:8081/api";

// Register function
export async function registerUser(
    email: string,
    password: string) {

    const response = await fetch(
        `${BASE_URL}/auth/register?email=${email}&password=${password}`,
        { method: "POST" }
    );

    return response.text();
}

// Login function
export async function loginUser(
    email: string,
    password: string) {

    const response = await fetch(
        `${BASE_URL}/auth/login?email=${email}&password=${password}`,
        { method: "POST" }
    );

    return response.json();
}