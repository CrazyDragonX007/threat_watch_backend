const axios = require("axios").default;
const {newscatcher_api_key} = require("./config");

const sources =  [
    "globalsecurity.org",
    "techradar.com",
    "hackernoon.com",
    "siliconangle.com",
    "medium.com",
    "techreport.com",
    "techxplore.com",
    "engadget.com",
    "firstpost.com",
    "techtimes.com",
    "thefastmode.com",
    "securityweek.com",
    "itpro.com",
    "darkreading.com",
    "helpnetsecurity.com",
    "techcrunch.com",
    "bleepingcomputer.com",
    "computerweekly.com",
    "cpapracticeadvisor.com",
    "nextgov.com",
    "siliconcanals.com",
    "allaboutcircuits.com",
    "blocksandfiles.com",
    "itbrief.asia",
    "securityaffairs.com",
    "securityintelligence.com",
    "thehackernews.com",
    "krebsonsecurity.com",
    "threatpost.com",
    "securitymagazine.com",
    "infosecurity-magazine.com",
    "cyberscoop.com",
    "schneier.com",
    "packetstormsecurity.com",
    "sophos.com",
    "cyberdefensemagazine.com",
    "securityboulevard.com",
    "welivesecurity.com",
    "helpnetsecurity.com",
    "thecyberwire.com",
    "tripwire.com",
    "secureworld.io",
    "sentinelone.com",
    "cybersecurity-insiders.com",
    "securityaffairs.com",
    "proofpoint.com",
    "checkpoint.com",
    "qualys.com",
    "grahamcluley.com",
    "gbhackers.com",
    "hackread.com",
    "linuxsecurity.com",
]

const getArticles = async (page,pageSize,from,to,sortBy) => {
    const options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {
            q: 'Cybersecurity OR Information Security OR Data Privacy OR Malware OR Phishing OR Ransomware OR Data Breach OR Encryption OR Network Security OR Hacking',
            lang: 'en',
            sort_by: 'relevancy',
            page: page,
            page_size:pageSize,
            sources: sources.toString()
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
            // console.log(response?.data);
            return response?.data?.articles;
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getArticles};