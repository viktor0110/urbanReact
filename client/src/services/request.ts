import { User } from "../types/User";

const apiUrl = process.env.REACT_APP_API_URL;

//edit data type
async function request(method: string, url: string, data?: any, user?: User) {
    const options: {
        method: string;
        headers: Record<string, string>;
        body?: string | FormData;
      } = {
        method,
        headers: {},
      };
  
  if(user) {
    options.headers['Urban-Authorization'] = JSON.stringify(user.accessToken);
    options.headers.user = JSON.stringify(user);
  }
  
  if (data && !data.files) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  if(data && data.files) {
    options.body = data.files;
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, options);

    if(response.status === 204 ) {
      return response;
    }

    if(!response.ok) {
      const error = await response.json();
      error.status = response.status;
      throw error;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

 const get = request.bind(null, 'get');
 const post = request.bind(null, 'post');
 const put = request.bind(null, 'put');
 const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del
}
