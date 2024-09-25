const axios = require("axios").default;
const {newscatcher_api_key} = require("./config");

const getArticles = async (page,pageSize,from,to,sortBy) => {
    const options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {
            q: 'Cybersecurity OR Information Security OR Data Privacy OR Malware OR Phishing OR Ransomware OR Data Breach OR Encryption OR Network Security OR Hacking OR Cyber Attack OR Cyber Crime OR Penetration Testing',
            lang: 'en',
            topic: 'tech',
            page: page,
            page_size:pageSize,
            // sources: sources.toString()
        },
        headers: {
            'x-api-key': newscatcher_api_key
        }
    };
    if(from){
        options.params['from'] = from;
        options.params['to'] = to;
    }
    if(sortBy){
        options.params['sort_by'] = sortBy;
    }
    try {
        return await axios.request(options).then(function (response) {
            console.log(response?.data);
            return response?.data;
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getArticles};