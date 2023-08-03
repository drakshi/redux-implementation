import MockData from './data.json';

const getApi = (data) => {
    return new Promise ((resolve) => {
        resolve(data);
    });

};
export const API = {
    TODO: {
        async get(payload){
            return getApi (MockData["api/v1/todo"]);
        }
    },
    USER: {
        async get(payload){
            return getApi(MockData["api/v1/users"]);
        }
    }
};