import {client} from '../../../store/api'

export default {
    methods: {
        sendRequest(url, method, data) {
            let jsonObj = {url: url, method: method};
            if(data) {
                if(method.toLowerCase() == "get"){
                    jsonObj.params = data;
                }else{
                    jsonObj.data = data;
                }
                jsonObj.headers = {'Content-Type': 'application/json'};
            }
            return client(jsonObj);
        },
    },
};