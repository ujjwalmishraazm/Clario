import { NextRequest } from "next/server";

export function getAuthenticatedUser(request: NextRequest) {
  console.log('ebefefe')
  const id = request.headers.get("x-user-id");

  const email = request.headers.get("x-user-email");
    console.log(id,email)

  if (!id || !email) {
    throw new Error("Authenticated user not found");
  }


  return {
    id,
    email,
  };
}