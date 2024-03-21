import Cookies from "js-cookie";
export const setCookie = (key: string, value: string): void => {
    Cookies.set(key, value);
  };
  export  const removeCookie = (key: string): void => {
    Cookies.remove(key);
};
interface Ciastki {
  token: string;
  user_ID: number;
  position: string;
  company_ID:number|null;
}

const getCookie = (key: string): Ciastki | undefined => {
  const storedValue = Cookies.get(key);
  if (storedValue) {
    try {
      const parsedValue = JSON.parse(storedValue) as Ciastki;
      return parsedValue;
    } catch (error) {
      console.error('Error parsing cookie value:', error);
    }
  }
  return undefined;
};
export const cookieData = getCookie("userData")