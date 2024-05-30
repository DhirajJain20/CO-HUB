
const getBearerToken=()=>{
    const bearerToken=sessionStorage.getItem('idToken');
    return bearerToken;
}

export default getBearerToken;