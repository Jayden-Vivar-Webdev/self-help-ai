import { admin } from "../../../(firebaseAuth)/firebaseAdmin";
import { NextRequest } from "next/server";

/**
 * This helper function recieved the request from the api
 * it then verifes the users token and returns the UID
 * for application use.
 * @param request 
 * @returns 
 */
export async function verifyUserUid(request: NextRequest) {

    //Recieve headers and get the Authorisation or return none
    const authHeader = request.headers.get('Authorization') || '';
    //Get in array and extract token
    const idToken = authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null;

    //Check a for token
    if (!idToken){
        throw new Error('No token provided.')
    }

    //Get decoded token using admin authentication and verify it.
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    //returns decodedToken with user UID.
    return decodedToken.uid;
    
}