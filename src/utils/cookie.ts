// 定义一个函数来获取指定名称的Cookie值
export const getCookie = (name:string) => {
    const cookies = document.cookie;
    const cookieArray = cookies.split("; ");
    for (let i = 0; i < cookieArray.length; i++) {
        const cookiePair = cookieArray[i].split("=");
        if (name === cookiePair[0]) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
  }