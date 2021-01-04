import atob from 'atob'

const parseJwt = (token: string) => {
  try {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.log('error: ', e)
    return null
  }
};

export {
  parseJwt
}
