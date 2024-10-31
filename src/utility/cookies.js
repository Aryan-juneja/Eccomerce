'use server'
import { cookies } from 'next/headers'
 
export async function getCookie(name) {
    cookies().delete(name)
    return true;
}
export default getCookie;